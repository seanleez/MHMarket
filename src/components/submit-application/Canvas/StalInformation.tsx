import CircleIcon from '@mui/icons-material/Circle';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { STALL_CLASS, STALL_TYPE } from '../../../const/const';
import { ContainerContext } from '../../../context/ContainerRefContext';

type TPosition = {
  x: number;
  y: number;
};

interface IStallInformation {
  position: TPosition;
  stall: any;
}

const StallInformation: React.FC<IStallInformation> = ({ position, stall }) => {
  const containerContext = useContext(ContainerContext);
  const clientRect =
    containerContext.containerRef.current?.getBoundingClientRect();
  return (
    <Paper
      elevation={15}
      sx={{
        minWidth: 300,
        position: 'absolute',
        top: position.y - (clientRect?.y ?? 0),
        left: position.x - (clientRect?.x ?? 0),
      }}>
      {stall?.is_updated_detail === true && <Card variant="outlined" sx={{padding: 1.5}}>
        <CardContent sx={{padding: 0}}>
          <Typography variant="h6" fontWeight="bold">
            Stall No. {stall?.code}
          </Typography>
          <Divider sx={{ margin: '10px 0' }} />
          <Typography variant="subtitle1" component="span" fontWeight="bold">
            Stall Availability:
          </Typography>
          <Typography variant="subtitle1" component="span">
            <CircleIcon
              color={stall?.lease_status === 0 ? 'success' : 'error'}
              sx={{
                width: 20,
                height: 20,
                marginLeft: '5px',
                verticalAlign: 'sub',
              }}
            />
            {stall?.lease_status === 0 ? 'Available' : 'Occupied'}
          </Typography>
          <br />
          <Typography variant="subtitle1" component="span" fontWeight="bold">
            Type:
          </Typography>
          <Typography variant="subtitle1" component="span">
            {
              STALL_TYPE.find(
                (option: any) => option.value === stall?.stall_type
              )?.label
            }
          </Typography>
          <br />
          <Typography variant="subtitle1" component="span" fontWeight="bold">
            Area:
          </Typography>
          <Typography variant="subtitle1" component="span">
            {stall.area}
          </Typography>
          <br />
          <Typography variant="subtitle1" component="span" fontWeight="bold">
            Local Classification:
          </Typography>
          <Typography variant="subtitle1" component="span">
            {
              STALL_CLASS.find(
                (option: any) => option.value === stall?.stall_class
              )?.label
            }
          </Typography>
          <br />
          <Typography variant="subtitle1" component="span" fontWeight="bold">
            Rental Fee (per month ):
          </Typography>
          <Typography variant="subtitle1" component="span">
            {stall.monthly_fee}
          </Typography>
        </CardContent>
        {stall?.lease_status === 0 && <CardActions sx={{justifyContent: 'flex-end', padding: '10px 0 0'}}>
          <Button variant="contained">Apply now</Button>
        </CardActions>}
      </Card>}
    </Paper>
  );
};

export default StallInformation;
