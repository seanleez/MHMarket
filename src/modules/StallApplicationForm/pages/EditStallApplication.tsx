import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APPLICATION_STATUS } from '../../../const/const';
import applicationApis from '../../../services/applicationsApis';
import BlankInfomationStallForm from './BlankInfomationStallForm';
import ClientIdentifyForm from './ClientIdentifyForm';

const EditStallApplication = () => {

  const [step, changeStep] = useState(0);
  const [commonData, setCommonData] = useState({
    status: 0,
    date: '',
    number: ''
  })

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      try {
        const res = await applicationApis.getApplication(id) as any;
        setCommonData({
          status: res.status,
          date: res.created_at as string,
          number: res.stall_name as string
        });
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })()
  }, []);

  const handleBack = () => {
    if(step === 0){
      navigate(-1) //go back
    } else {
      changeStep(prev => prev - 1)
    }
  }

  const handleNext = () => {
    changeStep(prev => prev + 1)
  }

  return (
    <>
      {step === 0 && 
        <BlankInfomationStallForm 
          step={step}
          status={APPLICATION_STATUS[commonData.status]?.label}
          dateSubmitted={commonData.date}
          formNumber={commonData.number}
        />
      }
      {step === 1 && 
        <ClientIdentifyForm 
          step={step}
          status={APPLICATION_STATUS[commonData.status]?.label}
          dateSubmitted={commonData.date}
          formNumber={commonData.number}
        />
      }

    </>
  );
};

export default EditStallApplication;