import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CIVIL_STATUS, rootURL, SEX } from '../../const/const';
import leaseApis from '../../services/leaseApis';
import ErrorDialog from '../common/dialog/ErrorDialog';
import SuccessDialog from '../common/dialog/SuccessDialog';
import ChildrenTable from './ChildrenTable';
import ImagePopupPreview from './ImagePopupPreview';
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

const field = (pair: TPair, i: number) => {
  return (
    <Box sx={{ display: 'flex' }} key={i}>
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
  const [existTermination, setExistTermination] = useState(false);

  const reasonInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const errMess = useRef('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await leaseApis.getLease(params.id);
        setLeaseInfor(res ?? {});
      } catch (err) {
        enqueueSnackbar((err as any).message, { variant: 'error' });
      }
    })();
  }, []);

  useLayoutEffect(() => {
    getTermination();
  }, []);

  function getTermination() {
    (async () => {
      try {
        const res = await leaseApis.getTermination(params.id);
        localStorage.setItem(
          'terminationId',
          (res as any)?.termination?.termination_id ?? ''
        );
        setExistTermination((res as any)?.exist ?? false);
      } catch (err) {
        enqueueSnackbar((err as any).message, { variant: 'error' });
      }
    })();
  }

  const handleChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  const handleTerminate = () => {
    const payload = {
      application_id: params.id,
      end_date: dayjs(dateValue).format('YYYY-MM-DDTHH:mm:ssZ'),
      reason: reasonInputRef.current?.value,
    };

    (async () => {
      try {
        const res = await leaseApis.postTermination(params.id, payload);
        setOpenSuccessDialog(true);
      } catch (err) {
        enqueueSnackbar((err as any).message, { variant: 'error' });
      }
    })();
  };

  const handleCancelTermination = () => {
    const terminationId = localStorage.getItem('terminationId');
    fetch(`${rootURL}/applications/${params.id}/termination/${terminationId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        termination_id: terminationId,
      }),
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

  const labelValuePair: TPair[] = useMemo(() => {
    return [
      { label: 'Search Id', value: leaseInfor?.lease_code },
      { label: 'Stallholder Name', value: leaseInfor?.owner?.full_name },
      { label: 'Market Name', value: leaseInfor?.market_name },
      {
        label: 'Lease Start Date',
        value: leaseInfor?.lease_start_date,
        isDateField: true,
      },
      { label: 'Stall Number', value: leaseInfor?.stall_name },
      {
        label: 'Lease End Date',
        value: leaseInfor?.lease_end_date,
        isDateField: true,
      },
      { label: 'Email', value: leaseInfor?.owner?.email },
      { label: 'Full Name', value: leaseInfor?.owner?.full_name },
      {
        label: 'Status',
        value: CIVIL_STATUS.find(
          (item: any) => item.value === leaseInfor?.owner?.sex
        )?.label,
      },
      {
        label: 'Date of Birth',
        value: leaseInfor?.owner?.date_of_birth,
        isDateField: true,
      },
      { label: 'Age', value: leaseInfor?.owner?.age },
      { label: 'Place of Birth', value: leaseInfor?.owner?.place_of_birth },
      { label: "Father's Name", value: leaseInfor?.owner?.farther_name },
      { label: "Mother's Name", value: leaseInfor?.owner?.mother_name },
      {
        label: 'Sex',
        value: SEX.find(
          (item: any) => item.value === leaseInfor?.owner?.marital_status
        )?.label,
      },
      { label: 'Telephone', value: leaseInfor?.owner?.telephone },
      { label: 'House Number', value: leaseInfor?.owner?.house_number },
      { label: 'Street', value: leaseInfor?.owner?.street },
      { label: 'Province', value: leaseInfor?.owner?.province },
      { label: 'Zipcode', value: leaseInfor?.owner?.zipcode },
      { label: 'City', value: leaseInfor?.owner?.city },
      { label: 'District', value: leaseInfor?.owner?.district },
      { label: 'Ward', value: leaseInfor?.owner?.ward },
      { label: 'Appication Fee Paid', value: leaseInfor?.initial_fee },
    ];
  }, [leaseInfor]);

  return (
    <div className="container">
      <span className="title">VIEW MARKET LEASE</span>

      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ width: '33%' }}>
          {labelValuePair
            .slice(0, 2)
            .map((pair: TPair, i: number) => field(pair, i))}
        </Box>
        <Box sx={{ width: '33%' }}>
          {labelValuePair
            .slice(2, 4)
            .map((pair: TPair, i: number) => field(pair, i))}
        </Box>
        <Box sx={{ width: '33%' }}>
          {labelValuePair
            .slice(4, 6)
            .map((pair: TPair, i: number) => field(pair, i))}
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
                {labelValuePair
                  .slice(6, 12)
                  .map((pair: TPair, i: number) => field(pair, i))}
              </Box>
              <Box sx={{ width: '50%' }}>
                {labelValuePair
                  .slice(12, 16)
                  .map((pair: TPair, i: number) => field(pair, i))}
              </Box>
              <div className="section-subtitle" style={{ width: '100%' }}>
                Address
              </div>
              <Box sx={{ width: '50%' }}>
                {labelValuePair
                  .slice(16, 20)
                  .map((pair: TPair, i: number) => field(pair, i))}
              </Box>
              <Box sx={{ width: '50%' }}>
                {labelValuePair
                  .slice(20, 23)
                  .map((pair: TPair, i: number) => field(pair, i))}
              </Box>

              <div className="section-subtitle" style={{ width: '100%' }}>
                Children and/or dependents
              </div>
              <ChildrenTable members={leaseInfor?.members ?? []} />

              <div className="section-subtitle" style={{ width: '100%' }}>
                Payment details
              </div>
              <Box sx={{ width: '100%' }}>
                {labelValuePair
                  .slice(23, 24)
                  .map((pair: TPair, i: number) => field(pair, i))}
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
                disabled={existTermination}
                inputRef={reasonInputRef}
                sx={{ width: '45%' }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="End Day"
                  inputFormat="MM/DD/YYYY"
                  value={dateValue}
                  disabled={existTermination}
                  onChange={handleChange}
                  renderInput={(params: any) => (
                    <TextField {...params} sx={{ width: '45%' }} />
                  )}
                />
              </LocalizationProvider>

              {![3, 4].includes(leaseInfor?.lease_status) && (
                <Box sx={{ width: '45%' }}>
                  {existTermination ? (
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={handleCancelTermination}>
                      Cancel Termination
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      sx={{ marginRight: '20px' }}
                      onClick={handleTerminate}>
                      Terminate
                    </Button>
                  )}
                </Box>
              )}
              <Box sx={{ width: '45%' }}></Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Button
        size="large"
        color="primary"
        variant="outlined"
        sx={{ display: 'block', margin: '20px auto 0' }}
        onClick={() => navigate('/lease-management')}>
        Close
      </Button>

      <SuccessDialog
        openProp={openSuccesDialog}
        message={`${
          existTermination ? 'Cancel Termination' : 'Terminate'
        } Successfully`}
        onCloseDialog={() => {
          if (reasonInputRef.current) {
            reasonInputRef.current.value = '';
          }
          setDateValue(dayjs(new Date()));
          getTermination();
          setOpenSuccessDialog(false);
        }}
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
