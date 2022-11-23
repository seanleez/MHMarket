import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CIVIL_STATUS, rootURL, SEX } from '../../const/const';
import ChildrenTable from './ChildrenTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImagePopupPreview from './ImagePopupPreview';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import SuccessDialog from '../common/dialog/SuccessDialog';
import ErrorDialog from '../common/dialog/ErrorDialog';
type TPair = {
  label: string;
  value: string | number;
  isDateField?: boolean;
};

const convertDateFormat = (originDate: string | number) => {
  const date = new Date(originDate);
  const d =
    date.getDate() < 10 ? '0' + String(date.getDate()) : String(date.getDate());
  const m =
    date.getMonth() + 1 < 10
      ? '0' + String(date.getMonth() + 1)
      : String(date.getMonth() + 1);
  const y = String(date.getFullYear());
  return `${m}/${d}/${y}`;
};

const field = (pair: TPair) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle1" sx={{ minWidth: '200px' }}>
        {pair.label}
      </Typography>
      <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 'bold' }}>
        {pair.isDateField ? convertDateFormat(pair.value) : pair.value}
      </Typography>
    </Box>
  );
};

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const ViewMarketLease: React.FC = () => {
  const [leaseInfor, setLeaseInfor] = useState<any>([]);
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(new Date()));
  const [openSuccesDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const reasonInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const errMess = useRef('');

  useLayoutEffect(() => {
    console.log();
    fetch(`${rootURL}/applications/in-lease/${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          throw new Error(response.error_description);
        } else {
          console.log(response);
          setLeaseInfor(response ?? {});
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (newValue: Dayjs | null) => {
    console.log(reasonInputRef.current?.value);
    console.log(newValue);
    console.log(dayjs(newValue).format('YYYY-MM-DDTHH:mm:ssZ'));
    setDateValue(newValue);
  };

  const handleTerminate = () => {
    const payload = {
      application_id: params.id,
      end_date: dayjs(dateValue).format('YYYY-MM-DDTHH:mm:ssZ'),
      reason: reasonInputRef.current?.value,
    };
    console.log(payload);
    fetch(`${rootURL}/applications/${params.id}/termination`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error_code) {
          throw new Error(response.error_description);
        } else {
          setOpenSuccessDialog(true);
        }
      })
      .catch((err) => {
        errMess.current = err.message;
        setOpenErrorDialog(true);
      });
  };

  const handleCancelTermination = () => {};

  const labelValuePair: TPair[] = useMemo(() => {
    return [
      { label: 'Search Id', value: leaseInfor?.lease_code },
      { label: 'Stallholder Name', value: 1 },
      { label: 'Market Name', value: 1 },
      {
        label: 'Lease Start Date',
        value: leaseInfor?.lease_start_date,
        isDateField: true,
      },
      { label: 'Stall Number', value: 1 },
      {
        label: 'Lease End Date',
        value: leaseInfor?.lease_end_date,
        isDateField: true,
      },
      { label: 'Email', value: 1 },
      { label: 'Full Name', value: 1 },
      {
        label: 'Status',
        value: CIVIL_STATUS.find(
          (item: any) => item.value === leaseInfor?.owner?.marital_status
        )?.label,
      },
      { label: 'Date of Birth', value: 1 },
      { label: 'Age', value: 1 },
      { label: 'Place of Birth', value: 1 },
      { label: "Father's Name", value: 1 },
      { label: "Mother's Name", value: 1 },
      {
        label: 'Sex',
        value: SEX.find(
          (item: any) => item.value === leaseInfor?.owner?.marital_status
        )?.label,
      },
      { label: 'Telephone', value: 1 },
      { label: 'House Number', value: 1 },
      { label: 'Street', value: 1 },
      { label: 'Province', value: 1 },
      { label: 'Zipcode', value: 1 },
      { label: 'City', value: 1 },
      { label: 'District', value: 1 },
      { label: 'Ward', value: 1 },
      { label: 'Appication Fee Paid', value: 1 },
    ];
  }, [leaseInfor]);

  return (
    <div className="container">
      <span className="title">VIEW MARKET LEASE</span>

      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ width: '33%' }}>
          {labelValuePair.slice(0, 2).map((pair: TPair) => field(pair))}
        </Box>
        <Box sx={{ width: '33%' }}>
          {labelValuePair.slice(2, 4).map((pair: TPair) => field(pair))}
        </Box>
        <Box sx={{ width: '33%' }}>
          {labelValuePair.slice(4, 6).map((pair: TPair) => field(pair))}
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          padding: '30px',
          marginTop: '30px',
          backgroundColor: '#E9EBF5',
          boxSizing: 'border-box',
          borderRadius: '20px',
        }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: '#c6d9ee' }}>
            <Typography variant="h6">INFORMATION</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                padding: '15px 20px',
                boxSizing: 'border-box',
              }}>
              <div
                className="section-subtitle first-subtitle"
                style={{ width: '100%' }}>
                Overall
              </div>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(6, 12).map((pair: TPair) => field(pair))}
              </Box>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(12, 16).map((pair: TPair) => field(pair))}
              </Box>
              <div className="section-subtitle" style={{ width: '100%' }}>
                Address
              </div>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(16, 20).map((pair: TPair) => field(pair))}
              </Box>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(20, 23).map((pair: TPair) => field(pair))}
              </Box>

              <div className="section-subtitle" style={{ width: '100%' }}>
                Children and/or dependents
              </div>
              <ChildrenTable members={leaseInfor?.members ?? []} />

              <div className="section-subtitle" style={{ width: '100%' }}>
                Payment details
              </div>
              <Box sx={{ width: '100%' }}>
                {labelValuePair.slice(23, 24).map((pair: TPair) => field(pair))}
              </Box>
              <Box sx={{ width: '32%', marginTop: '10px' }}>
                <ImagePopupPreview
                  title="Application Fee Or Proof"
                  imgUrl={leaseInfor?.proof_of_transfer}
                  imgName={
                    leaseInfor?.proof_of_transfer?.split('/mhmarket/')[1]
                  }
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#c6d9ee',
              marginTop: '10px',
            }}>
            <Typography variant="h6">SUPPORTING DOCUMENTS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: 'auto',
                padding: '15px 20px',
                boxSizing: 'border-box',
                gap: '20px',
                justifyContent: 'space-around',
              }}>
              <Box sx={{ width: '32%' }}>
                <ImagePopupPreview
                  title="Proof of Residency"
                  imgUrl={leaseInfor?.proof_of_residencies}
                  imgName={
                    leaseInfor?.proof_of_residencies?.split('/mhmarket/')[1]
                  }
                />
              </Box>
              <Box sx={{ width: '32%' }}>
                <ImagePopupPreview
                  title="Birth Certificate"
                  imgUrl={leaseInfor?.birth_certificate}
                  imgName={
                    leaseInfor?.birth_certificate?.split('/mhmarket/')[1]
                  }
                />
              </Box>
              <Box sx={{ width: '32%' }}>
                <ImagePopupPreview
                  title="2x2 Picture"
                  imgUrl={leaseInfor?.picture}
                  imgName={leaseInfor?.picture?.split('/mhmarket/')[1]}
                />
              </Box>
              <Box sx={{ width: '32%' }}>
                <ImagePopupPreview
                  title="Identification"
                  imgUrl={leaseInfor?.identification}
                  imgName={leaseInfor?.identification?.split('/mhmarket/')[1]}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#c6d9ee',
              marginTop: '10px',
            }}>
            <Typography variant="h6">TERMINATE LEASE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                margin: 'auto',
                padding: '15px 20px',
                boxSizing: 'border-box',
                gap: '20px',
              }}>
              <TextField
                label="Reason"
                name="area"
                variant="outlined"
                inputRef={reasonInputRef}
                sx={{ width: '45%' }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="End Day"
                  inputFormat="MM/DD/YYYY"
                  value={dateValue}
                  onChange={handleChange}
                  renderInput={(params: any) => (
                    <TextField {...params} sx={{ width: '45%' }} />
                  )}
                />
              </LocalizationProvider>

              <Box sx={{ width: '45%' }}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  sx={{ marginRight: '20px' }}
                  onClick={handleTerminate}>
                  Terminate
                </Button>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleCancelTermination}>
                  Cancel Termination
                </Button>
              </Box>
              <Box sx={{ width: '45%' }}></Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Button
        size="large"
        color="primary"
        variant="outlined"
        sx={{ display: 'block', margin: '20px auto 0' }}>
        Close
      </Button>

      <SuccessDialog
        openProp={openSuccesDialog}
        message="Terminate Successfully"
        onCloseDialog={() => setOpenSuccessDialog(false)}
      />
      <ErrorDialog
        openProp={openErrorDialog}
        message={errMess.current}
        onCloseDialog={() => setOpenErrorDialog(false)}
      />
    </div>
  );
};

export default ViewMarketLease;
