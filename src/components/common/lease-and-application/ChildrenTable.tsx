import { Box } from '@mui/material';

const ChildrenTable: React.FC<any> = ({ members }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#E9EBF5',
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
            backgroundColor: '#FAFAFA',
            padding: '10px 0',
            borderTop: '2px solid white',
          }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>{member?.name}</Box>
          <Box sx={{ width: '50%', textAlign: 'center' }}>{member?.age}</Box>
        </Box>
      ))}
    </>
  );
};

export default ChildrenTable;
