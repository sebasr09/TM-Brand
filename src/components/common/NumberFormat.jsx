import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import React from 'react';

function whatDecimalSeparator() {
  var n = 1.1;
  n = n.toLocaleString().substring(1, 2);
  return n;
}

const Format = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        console.log(values);
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator={whatDecimalSeparator()== '.' ? ',' : '.'}
      decimalSeparator={whatDecimalSeparator()}
      isNumericString
      allowNegative={false}
    />
  );
};

Format.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Format;
