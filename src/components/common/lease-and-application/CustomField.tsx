import { Box, Typography } from '@mui/material';
import { convertDateFormat } from '../../../helper/helperFuncs';
import { TPair } from '../../../const/interface';

interface ICustomField {
  pair: TPair;
}

const CustomField: React.FC<ICustomField> = ({ pair }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        variant="subtitle1"
        sx={{
          minWidth: '200px',
          backgroundColor: '#FAFAFA',
          border: '1px solid #F0F0F0',
          padding: '0 5px',
        }}>
        {pair.label}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          flex: 1,
          fontWeight: 'bold',
          border: '1px solid #F0F0F0',
          padding: '0 5px',
        }}>
        {pair.isDateField ? convertDateFormat(pair.value) : pair.value}
      </Typography>
    </Box>
  );
};

export default CustomField;
