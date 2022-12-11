import { Box, Divider, Grid, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { Draft } from 'immer';
import React, { ReactNode, useState, ChangeEvent, useEffect } from 'react';
import { useStallData } from '../pages/EditStallApplication';
import DatePickerWithLabel from './DatePickerWithLabel';
import InputWithLabel from './InputWithLabel';
import SelectWithLabel from './SelectWithLabel';
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import marketApis from '../../../services/marketApis';

dayjs.extend(utc)
dayjs.extend(duration)

const sexOptions = {
  '0': 'Male',
  '1': 'Female',
}

const statusOption = {
  '0': 'Single',
  '1': 'Married',
  '2': 'Separated',
  '3': 'Widow',
}

const FormOwnerGeneralInfor = () => {
  
  const { commonData, setCommonData } = useStallData();

  const [status, setStatus] = useState('-1');
  const [dob, setDob] = useState<Dayjs | null>(null)

  const [provinceList, setProvinceList] = useState<any[]>([])
  const [cityList, setCityList] = useState<any[]>([])
  const [wardList, setWardList] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const res = await marketApis.getProvinces();
      //@ts-ignore
      setProvinceList(res.provinces);
      setCommonData(drf => {
        if(drf.owner) {
          drf.owner.city = '';
          drf.owner.ward = '';
        }
      })
    })()
  }, []);

  useEffect(() => {
    if(commonData.owner?.province) {

      (async () => {
        const res = await marketApis.getCities({
          province: commonData.owner?.province
        });
        //@ts-ignore
        setCityList(res.cities || []);
        setCommonData(drf => {
          if(drf.owner){
            drf.owner.ward = '';
          }
        })
      })()
    }
  }, [commonData.owner?.province])

  useEffect(() => {
    if(commonData.owner?.province && commonData.owner?.city) {

      (async () => {
        const res = await marketApis.getWards({
          province: commonData.owner?.province,
          city: commonData.owner?.city,
        });
        //@ts-ignore
        setWardList(res.wards || []);
      })()
    }
  }, [commonData.owner?.province, commonData.owner?.city])
  
  useEffect(() => {
    if(commonData.owner?.province && commonData.owner?.city && commonData.owner?.ward) {

      (async () => {
        const res = await marketApis.getLocation({
          province: commonData.owner?.province,
          city: commonData.owner?.city,
          ward: commonData.owner?.ward,
        });
        if(res && res.location) {

          setCommonData(draft => {
            //@ts-ignore
            draft.owner.zipcode = res.location.zipcode;
            //@ts-ignore
            draft.owner.district = res.location.district;
          });
        }
      })()
    }
  }, [commonData.owner?.province, commonData.owner?.city, commonData.owner?.ward])

  


  const handleChange = (name: string, cast?: (v: any) => any) => (e: ChangeEvent<HTMLInputElement>) => {
    setCommonData((draft: Draft<any>) => {
      const vector = name.split(".");
      const propName = vector.pop();

      if (propName) {
        draft = vector.reduce((it, prop) => it[prop], draft);
        draft[propName] = cast ? cast(e.target.value) : e.target.value;
      }
    })
  }

  return (
    <Box>
      {/* Stall infor */}
      <Grid container spacing={2} sx={{ margin: '20px 0 20px 0' }}>
        <Grid item xs={4}>
          <InputWithLabel label='Market Name:' disabled={true} id='market-name' value={commonData.market_name} />
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Stall Number:' disabled={true} id='stall-number' value={commonData.code} />
        </Grid>
        <Grid item xs={2}>
          <InputWithLabel label='Stall Size:' disabled={true} id='stall-size' value={commonData.area} />
        </Grid>
      </Grid>
      <Divider />

      {/* owner infor */}
      <Typography sx={{ fontWeight: 'bold', margin: '10px 0 20px 0' }}>
        Information:
      </Typography>
      {/* 1st row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <InputWithLabel label='Last Name:*' id='last-name' value={commonData.owner?.last_name} onChange={handleChange('owner.last_name')}/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='First Name:*' id='first-name'value={commonData.owner?.first_name} onChange={handleChange('owner.first_name')} />
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Middle Name:*' id='middle-name' value={commonData.owner?.middle_name} onChange={handleChange('owner.middle_name')} />
        </Grid>
        <Grid item xs={3}>
          <SelectWithLabel label='Sex:*' id='sex' 
            options={sexOptions} placeHolder='-- Select --' 
            value={'' + commonData.owner?.sex || "-1"}
            // @ts-ignore
            onChange={handleChange('owner.sex', (v: string) => Number(v))}
          />
        </Grid>
      </Grid>

      {/* 2nd row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SelectWithLabel label='Status:*' id='status' 
            options={statusOption} placeHolder='-- Select --' 
            value={'' + commonData.owner?.marital_status || "-1"}
            // @ts-ignore
            onChange={handleChange('owner.marital_status', (v: string) => Number(v))}
          />
        </Grid>
        <Grid item xs={3}>
          <DatePickerWithLabel label='Date of Birth:*' 
            id='dob' value={dayjs.utc(commonData.owner?.date_of_birth)} onChange={v => {
              //@ts-ignore
              handleChange('owner.date_of_birth')({ target: { value: v?.format() } })
            }} 
          />
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={4}>
              <InputWithLabel label='Age:' id='age' disabled={true} value={
                dayjs.duration(dayjs().diff(dayjs(commonData.owner?.date_of_birth))).years()
              } />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Telephone:*' id='tel' value={commonData.owner?.telephone} onChange={handleChange('owner.telephone')} />
        </Grid>
      </Grid>

      {/* 3rd row */}
      <Grid container spacing={2} sx={{ paddingBottom: '100px' }}>
        <Grid item xs={3}>
          <InputWithLabel label='Place of Birth:*' id='pob' value={commonData.owner?.place_of_birth} onChange={handleChange('owner.place_of_birth')}/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Email Address:*' id='mail' value={commonData.owner?.email} onChange={handleChange('owner.email')}/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label="Mother's Name:*" id='mother-name'value={commonData.owner?.mother_name} onChange={handleChange('owner.mother_name')}/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label="Father's Name:*" id='father-name'value={commonData.owner?.farther_name} onChange={handleChange('owner.farther_name')}/>
        </Grid>
      </Grid>

      <Divider />

      <Typography sx={{ fontWeight: 'bold', margin: '10px 0 20px 0' }}>
        Address:
      </Typography>
      {/* 1st row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <InputWithLabel label='House Number:' id='house-number' value={commonData.owner?.house_number} onChange={handleChange('owner.house_number')}/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Street:' id='street' value={commonData.owner?.street} onChange={handleChange('owner.street')}/>
        </Grid>
        <Grid item xs={3}>
          <SelectWithLabel label='Province:' id='province' 
            options={provinceList} placeHolder='-- Select --' 
            value={provinceList.indexOf(commonData.owner?.province)} 
            onChange={handleChange('owner.province', (v: any) => provinceList[v])}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectWithLabel label='City/Municipality:' id='city' 
            options={cityList} placeHolder='-- Select --' 
            value={cityList.indexOf(commonData.owner?.city)} 
            onChange={handleChange('owner.city', (v: any) => cityList[v])}
            disabled={!commonData.owner?.province}
          />
        </Grid>
      </Grid>

      {/* 2nd row */}
      <Grid container spacing={2} sx={{ marginBottom: '50px' }}>
        <Grid item xs={3}>
          <SelectWithLabel label='Ward:*' id='ward' 
            options={wardList} placeHolder='-- Select --' 
            value={wardList.indexOf(commonData.owner?.ward)} 
            onChange={handleChange('owner.ward', (v: any) => wardList[v])}
          />
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='Zip Code:' id='zip-code' disabled value={commonData.owner?.zipcode}/>
        </Grid>
        <Grid item xs={3}>
          <InputWithLabel label='District:' id='district' disabled value={commonData.owner?.district}/>
        </Grid>
        
      </Grid>

      <Divider />
    </Box>
  );
};

export default FormOwnerGeneralInfor;