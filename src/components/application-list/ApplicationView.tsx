import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {APPLICATION_STATUS, APPLICATION_TYPE, CIVIL_STATUS, rootURL, SEX} from '../../const/const';
import { TPair } from '../../const/interface';
import ChildrenTable from '../common/lease-and-application/ChildrenTable';
import CustomField from '../common/lease-and-application/CustomField';
import ImagePopupPreview from '../common/lease-and-application/ImagePopupPreview';
import Questionaire from './Questionaire';

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') as string)
  : null;
const token = currentUser?.access_token;

const ApplicationView: React.FC = () => {
  const [infor, setInfor] = useState<any>([]);

  const params = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    fetch(`${rootURL}/applications/${params.id}`, {
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
          setInfor(response ?? {});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const labelValuePair: TPair[] = useMemo(() => {
    return [
      { label: 'Application Type',
        value: APPLICATION_TYPE.find(
            (item: any) => item.value === infor?.type
        )?.label,},
      {
        label: 'Application Status',
        value: APPLICATION_STATUS.find(
            (item: any) => item.value === infor?.status
        )?.label,
      },
      { label: 'Date Submitted',
        value: infor?.created_at,
        isDateField: true,
      },
      {
        label: 'Application Form Number',
        value: infor?.code,
      },
      { label: 'Market Name', value: infor?.market_name },
      {
        label: 'Stall Number',
        value: infor?.stall_name,
      },
      { label: 'Stall Size', value: infor?.stall_area },
      { label: 'Email', value: infor?.owner?.email },
      {
        label: 'Full Name',
        value: infor?.owner?.full_name
      },
      {
        label: 'Status',
        value: CIVIL_STATUS.find(
            (item: any) => item.value === infor?.owner?.marital_status
        )?.label,
      },
      {
        label: 'Date of Birth',
        value: infor?.owner?.date_of_birth,
        isDateField: true,
      },
      {
        label: 'Age',
        value: infor?.owner?.age,
      },
      { label: 'Place of Birth', value: infor?.owner?.place_of_birth },
      { label: "Father's Name", value: infor?.owner?.farther_name },
      { label: "Mother's Name", value: infor?.owner?.mother_name },
      {
        label: 'Sex',
        value: SEX.find(
          (item: any) => item.value === infor?.owner?.sex
        )?.label,
      },
      { label: 'Telephone', value: infor?.owner?.telephone },
      { label: 'House Number', value: infor?.owner?.house_number },
      { label: 'Street', value: infor?.owner?.street },
      { label: 'Province', value: infor?.owner?.province },
      { label: 'Zipcode', value: infor?.owner?.zipcode },
      { label: 'City', value: infor?.owner?.city },
      { label: 'District', value: infor?.owner?.district },
      { label: 'Ward', value: infor?.owner?.ward },
      { label: 'Date', value: infor?.approved_date,
        isDateField: true,
      },
      { label: 'Market Name', value: infor?.market_name },
      { label: 'Stall Number', value: infor?.stall_name },
      { label: 'Name', value: infor?.owner?.full_name },
      { label: 'Total Amount Due', value: infor?.initial_fee },
    ];
  }, [infor]);

  const questions = useMemo(() => {
    return [
      {
        question: 'Did you own a stall in any City-owned Market previously?',
        answer: infor?.owned_any_stall ? 'Yes' : 'No',
        ...(infor?.owned_any_stall
          ? {
              subquestion: {
                question:
                  'If yes, please indicate the City-owned Market and the stall number/section.',
                answer: infor?.owned_stall_info,
              },
            }
          : {}),
      },
      {
        question: 'Were you able to pay tax in your previous stall?',
        answer: infor?.pay_tax_previous ? 'Yes' : 'No',
        ...(infor?.pay_tax_previous
          ? {
              subquestion: {
                question: 'If not, please indicate the reason why?',
                answer: infor?.pay_tax_previous_reason,
              },
            }
          : {}),
      },
      {
        question: 'Were you forced to terminate your previous lease?',
        answer: infor?.forced_terminate_previous ? 'Yes' : 'No',
        ...(infor?.forced_terminate_previous
          ? {
              subquestion: {
                question: 'If yes, please explain.',
                answer: infor?.forced_terminate_reason,
              },
            }
          : {}),
      },
      {
        question:
          'Did you pay to someone in exchange for a chance to rent for a stall?',
        answer: infor?.exchange_rent_stall ? 'Yes' : 'No',
        ...(infor?.exchange_rent_stall
          ? {
              subquestion: {
                question: 'If yes, please indicate the name.',
                answer: infor?.exchange_rent_stall_name,
              },
            }
          : {}),
      },
      {
        question:
          'Have you been convicted of violating a law, ordinance or rule?',
        answer: infor?.convicted_violate_law ? 'Yes' : 'No',
        ...(infor?.convicted_violate_law
          ? {
              subquestion: {
                question: 'If yes, please explain.',
                answer: infor?.convicted_violate_law_reason,
              },
            }
          : {}),
      },
      {
        question: 'Do you have a current administrative or criminal case?',
        answer: infor?.administrative_criminal ? 'Yes' : 'No',
        ...(infor?.administrative_criminal
          ? {
              subquestion: {
                question: 'If yes, please explain.',
                answer: infor?.administrative_criminal_reason,
              },
            }
          : {}),
      },
      {
        question: 'How much is your capital?',
        answer: infor?.source_of_capital,
      },
      {
        question: 'What are you going to sell in your stall?',
        answer: infor?.capital,
      },
    ];
  }, [infor]);

  return (
    <div className="container">
      <span className="title">VIEW MARKET LEASE</span>

      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ width: '50%' }}>
          {labelValuePair.slice(0, 2).map((pair: TPair, i: number) => (
            <CustomField key={i} pair={pair} />
          ))}
        </Box>
        <Box sx={{ width: '50%' }}>
          {labelValuePair.slice(2, 4).map((pair: TPair, i: number) => (
            <CustomField key={i} pair={pair} />
          ))}
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
            <Typography variant="h6">INFORMATION AND REGISTRATION</Typography>
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
              <div className="section-subtitle first-subtitle">Overall</div>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(4, 6).map((pair: TPair, i: number) => (
                  <CustomField key={i} pair={pair} />
                ))}
              </Box>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(6, 7).map((pair: TPair, i: number) => (
                  <CustomField key={i} pair={pair} />
                ))}
              </Box>

              <div className="section-subtitle">Personal Information</div>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(7, 13).map((pair: TPair, i: number) => (
                  <CustomField key={i} pair={pair} />
                ))}
              </Box>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(13, 17).map((pair: TPair, i: number) => (
                  <CustomField key={i} pair={pair} />
                ))}
              </Box>

              <div className="section-subtitle">Address</div>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(17, 21).map((pair: TPair, i: number) => (
                  <CustomField key={i} pair={pair} />
                ))}
              </Box>
              <Box sx={{ width: '50%' }}>
                {labelValuePair.slice(21, 24).map((pair: TPair, i: number) => (
                  <CustomField key={i} pair={pair} />
                ))}
              </Box>

              <div className="section-subtitle">Children and/or dependents</div>
              <Box sx={{ width: '50%' }}>
                <ChildrenTable members={infor?.members ?? []} />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  marginTop: '20px',
                }}>
                <Questionaire questions={questions} />
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
            <Typography variant="h6">
              OTHER REQUIRED DOCUMENTS AND PAYMENT INFORMATION
            </Typography>
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
                  imgUrl={infor?.proof_of_residencies}
                  imgName={infor?.proof_of_residencies?.split('/mhmarket/')[1]}
                />
              </Box>
              <Box sx={{ width: '32%' }}>
                <ImagePopupPreview
                  title="Birth Certificate"
                  imgUrl={infor?.birth_certificate}
                  imgName={infor?.birth_certificate?.split('/mhmarket/')[1]}
                />
              </Box>
              <Box sx={{ width: '32%' }}>
                <ImagePopupPreview
                  title="2x2 Picture"
                  imgUrl={infor?.picture}
                  imgName={infor?.picture?.split('/mhmarket/')[1]}
                />
              </Box>
              <Box sx={{ width: '32%' }}>
                <ImagePopupPreview
                  title="Identification"
                  imgUrl={infor?.identification}
                  imgName={infor?.identification?.split('/mhmarket/')[1]}
                />
              </Box>
              <div className="section-subtitle">Payment Details</div>
              <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ width: '50%' }}>
                  {labelValuePair
                    .slice(24, 28)
                    .map((pair: TPair, i: number) => (
                      <CustomField key={i} pair={pair} />
                    ))}
                </Box>
                <Box sx={{ width: '50%' }}>
                  {labelValuePair.slice(28).map((pair: TPair, i: number) => (
                    <CustomField key={i} pair={pair} />
                  ))}
                </Box>
                <Box sx={{ width: '50%' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        minWidth: '200px',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid #F0F0F0',
                        padding: '0 5px',
                      }}>
                      Proof of transfer
                    </Typography>
                    <ImagePopupPreview imgUrl={infor?.proof_of_transfer} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Button
        size="large"
        color="primary"
        variant="outlined"
        sx={{ display: 'block', margin: '20px auto 0' }}
        onClick={() => navigate('/application-list')}>
        Back
      </Button>
    </div>
  );
};

export default ApplicationView;
