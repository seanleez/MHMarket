import { useSnackbar } from 'notistack';
import React, { useEffect, useState, useContext, createContext } from 'react';
import { useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { APPLICATION_STATUS } from '../../../const/const';
import applicationApis from '../../../services/applicationsApis';
import stallApis from '../../../services/stallApis';
import BlankInfomationStallForm from './BlankInfomationStallForm';
import ClientIdentifyForm from './ClientIdentifyForm';
import Payment from './Payment';

const StallData = createContext<any>(undefined);

const useStallData = () => {
  return useContext<any>(StallData as any);
};

const EditStallApplication = () => {
  const [step, changeStep] = useState(0);
  const [commonData, setCommonData] = useImmer<any>({} as any);
  const [applicationInfor, setApplicationInfor] = useState<any>({});
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    if(id) {
      (async () => {
        try {
          const res = await applicationApis.getApplication(id) as any;
          const stallRes = await stallApis.getStallInfo({ 
            market_code: res.market_code,
            floor_code : res.floor_code,
            stall_code : res.stall_code,
          })
          //@ts-ignore
          const { code, ...rest } = stallRes
          setCommonData({ ...res, ...rest, stall_number: code });
        } catch (error) {
          enqueueSnackbar(error as string);
        }
      })()
    }
  }, []);

  useEffect(() => {
    (async () => {
      if(location?.pathname.includes('create')){
        const search = new URLSearchParams(location.search);
        
        // const res = await applicationApis.submitApplication({});
        // console.log(res)
        const initialData = {
          administrative_criminal: false,
          administrative_criminal_reason: "",
          application_id: "",
          approved_date: "",
          area: Number(search.get('stall_area')),
          birth_certificate: "",
          capital: "",
          code: "",
          convicted_violate_law: false,
          convicted_violate_law_reason: "",
          created_at: "",
          created_by: "",
          current_payment_status: 0,
          draft: false,
          exchange_rent_stall: false,
          exchange_rent_stall_name: "",
          floor_code: search.get('floor_code'),
          floor_name: '',
          forced_terminate_previous: false,
          forced_terminate_reason: "",
          identification: "",
          initial_fee: 0,
          item_type: '',
          lease_code: '',
          lease_end_date: '',
          lease_start_date: '',
          lease_status: 0,
          market_address: '',
          market_class: Number(search.get('market_class')),
          market_code: search.get('market_code'),
          market_id: '',
          market_name: '',
          market_type: Number(search.get('market_type')),
          members: [],
          other_occupation: '',
          owned_any_stall: false,
          owned_stall_info: "",
          owner: {
            age: 0,
            city: '',
            date_of_birth: '',
            district: '',
            email: '',
            farther_name: '',
            first_name: '',
            full_name: '',
            house_number: '',
            last_name: '',
            marital_status: 0,
            middle_name: '',
            mother_name: '',
            place_of_birth: '',
            province: '',
            sex: 0,
            street: '',
            telephone: '',
            user_id: '',
            ward: '',
            zipcode: ''
          },
          pay_tax_previous: true,
          pay_tax_previous_reason: '',
          payment_method: 0,
          picture: '',
          proof_of_residencies: '',
          proof_of_transfer: '',
          reminded_payment_date: '',
          source_of_capital: '',
          stall_area: 0,
          stall_class: Number(search.get('stall_class')),
          stall_code: search.get('stall_code'),
          stall_id: "",
          stall_name: '',
          stall_type: Number(search.get('stall_type')),
          status: 0,
          total_amount_due: 0,
          type: 0,
        };

        const stallRes = await stallApis.getStallInfo({ 
          market_code: initialData.market_code,
          floor_code : initialData.floor_code,
          stall_code : initialData.stall_code,
        })
        //@ts-ignore
        const { code, ...rest } = stallRes
        setCommonData({
          ...initialData,
          stall_number: code,
          ...rest
        })
      }
    })()
  }, [])

  useEffect(() => {
    console.log(commonData);
  }, [commonData]);

  const handleBack = () => {
    if (step === 0) {
      navigate(-1); //go back
    } else {
      changeStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    changeStep((prev) => prev + 1);
  };

  return (
    <StallData.Provider
      value={{
        commonData,
        applicationInfor,
        setCommonData,
        setApplicationInfor,
      }}>
      {step === 0 && (
        <BlankInfomationStallForm
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 1 && (
        <ClientIdentifyForm
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <Payment step={step} handleBack={handleBack} handleNext={handleNext} />
      )}
    </StallData.Provider>
  );
};

export default EditStallApplication;

export { useStallData };
