import { Box } from '@mui/material';

const ChildrenTable: React.FC<any> = ({ members }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          width: '50%',
          backgroundColor: '#cfd5ea',
          fontWeight: 'bold',
          padding: '15px 0',
        }}>
        <Box sx={{ width: '50%', textAlign: 'center' }}>NAME</Box>
        <Box sx={{ width: '50%', textAlign: 'center' }}>AGE</Box>
      </Box>
      {members.map((member: any, index: number) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            width: '50%',
            backgroundColor: '#E9EBF5',
            padding: '10px 0',
            borderTop: '2px solid white',
          }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>{member?.name}</Box>
          <Box sx={{ width: '50%', textAlign: 'center' }}>{member?.age}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default ChildrenTable;
