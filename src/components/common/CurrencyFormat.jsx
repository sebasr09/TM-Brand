import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import React from 'react';

function whatDecimalSeparator() {
  var n = 1.1;
  n = n.toLocaleString().substring(1, 2);
  return n;
}

const CurrencyFormat = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator={whatDecimalSeparator()== '.' ? ',' : '.'}
      decimalSeparator={whatDecimalSeparator()}
      isNumericString
      prefix="$"
      allowNegative={false}
    />
  );
};

CurrencyFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CurrencyFormat;
