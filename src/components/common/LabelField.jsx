import Colors from '../../constants/Colors';
import { TextField } from '@mui/material';
import { withStyles } from '@mui/styles';

const LabelField = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: Colors.bancoldexFontColor
    },
    '& .MuiInput-underline.Mui-disabled:before': {
      borderBottomColor: Colors.transparent,
      borderBottomStyle: 'double'
    },
    '& .MuiInputBase-input': {
      color: Colors.black
    }
  }
})(TextField);

export default LabelField;
