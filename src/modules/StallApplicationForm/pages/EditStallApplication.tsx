import { useSnackbar } from 'notistack';
import React, { useEffect, useState, useContext, createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { APPLICATION_STATUS } from '../../../const/const';
import applicationApis from '../../../services/applicationsApis';
import stallApis from '../../../services/stallApis';
import BlankInfomationStallForm from './BlankInfomationStallForm';
import ClientIdentifyForm from './ClientIdentifyForm';

const StallData = createContext<any>(undefined);

const useStallData = () => {
  return useContext<any>(StallData as any)
}

const EditStallApplication = () => {

  const [step, changeStep] = useState(0);
  const [commonData, setCommonData] = useImmer<any>({} as any)

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const res = await applicationApis.getApplication(id) as any;
        const stallRes = await stallApis.getStallInfo({ 
          market_code: res.market_code,
          floor_code : res.floor_code,
          stall_code : res.stall_code,
        })
        setCommonData({ ...res, ...stallRes });
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })()
  }, []);

  useEffect(() => {
    console.log(commonData)
  }, [commonData])

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
    <StallData.Provider value={{ commonData, setCommonData }} >
      {step === 0 && 
        <BlankInfomationStallForm 
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      }
      {step === 1 && 
        <ClientIdentifyForm 
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      }

    </StallData.Provider>
  );
};

export default EditStallApplication;

export { useStallData }