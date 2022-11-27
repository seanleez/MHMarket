import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CLASS_RENTAL_AMOUNT,
  MARKET_TYPE,
  STATE_VALUES,
} from '../../const/const';
import marketApis from '../../services/marketApis';
import ProgressCirle from '../common/progress-circle/ProgressCircle';

const marketId = localStorage.getItem('marketId') ?? '';

const MarketFormStep1 = (props: any) => {
  const { currentEditMarket, onSubmit } = props;
  const isAtEditPage = location.pathname.includes('/market/edit');

  const [listProvinces, setListProvinces] = useState<any>([]);
  const [provinceValue, setProvinceValue] = useState<string>('');
  const [listCities, setListCities] = useState<any>([]);
  const [cityValue, setCityValue] = useState<string>('');
  const [listWards, setListWards] = useState<any>([]);
  const [wardValue, setWardValue] = useState<string>('');

  const [zipcode, setZipcode] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        if (marketId && currentEditMarket) {
          const res = await Promise.all([
            marketApis.getProvinces(),
            marketApis.getCities({
              province: currentEditMarket?.location?.province,
            }),
            marketApis.getWards({
              province: currentEditMarket?.location?.province,
              city: currentEditMarket?.location?.city,
            }),
          ]);
          setListProvinces((res[0] as any).provinces);
          setListCities((res[1] as any).cities);
          setListWards((res[2] as any).wards);

          setProvinceValue(currentEditMarket?.location?.province ?? '');
          setCityValue(currentEditMarket?.location?.city ?? '');
          setWardValue(currentEditMarket?.location?.ward ?? '');
        } else {
          const res = await marketApis.getProvinces();
          setListProvinces((res as any).provinces);
        }
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }, []);

  useEffect(() => {
    if ((marketId && currentEditMarket) || listWards.length > 0) {
      getLocation(
        currentEditMarket?.location?.province ?? '',
        currentEditMarket?.location?.city ?? '',
        currentEditMarket?.location?.ward ?? ''
      );
    }
  }, []);

  const handleChangeProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvinceValue(e.target.value);
    (async () => {
      try {
        const res = await marketApis.getCities({
          province: e.target.value,
        });
        setListCities((res as any).cities ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityValue(e.target.value);
    (async () => {
      try {
        const res = await marketApis.getWards({
          province: provinceValue,
          city: e.target.value,
        });
        setListWards((res as any).wards ?? []);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  };

  const handleChangeWard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWardValue(e.target.value);
    getLocation(provinceValue, cityValue, e.target.value);
  };

  function getLocation(pVal: string, cVal: string, wVal: string) {
    (async () => {
      try {
        const res = await marketApis.getLocation({
          province: pVal,
          city: cVal,
          ward: wVal,
        });
        if (!(res as any).location) return;
        setZipcode((res as any).location.zipcode);
        setDistrict((res as any).location.district);
      } catch (error) {
        enqueueSnackbar(error as string);
      }
    })();
  }

  return (
    <>
      <span className="title">
        {isAtEditPage ? 'EDIT MARKET' : 'ADD NEW MARKET'}
      </span>
      <ProgressCirle step={1} />
      <form onSubmit={onSubmit}>
        <div className="section-title mt-50">BASIC</div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
          <TextField
            required
            name="name"
            label="Market Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
            style={{ width: '33%' }}
          />
          <TextField
            required
            select
            name="status"
            label="Status"
            defaultValue={currentEditMarket?.status ?? ''}
            style={{ width: '33%' }}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <div className="section-title">ADDRESS</div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextField
            required
            name="address"
            label="Street"
            variant="outlined"
            defaultValue={currentEditMarket?.location?.address ?? ''}
          />
          <TextField
            required
            select
            name="province"
            label="Province"
            value={provinceValue}
            onChange={handleChangeProvince}>
            {listProvinces.map((province: string, index: number) => (
              <MenuItem key={index} value={province}>
                {province}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            disabled={!!!provinceValue}
            name="city"
            label="City"
            value={cityValue}
            onChange={handleChangeCity}>
            {listCities.map((city: string, index: number) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            disabled={!!!cityValue}
            name="ward"
            label="Ward"
            value={wardValue}
            onChange={handleChangeWard}>
            {listWards.map((ward: string, index: number) => (
              <MenuItem key={index} value={ward}>
                {ward}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '16px 0',
          }}>
          <TextField
            disabled
            label="Zipcode"
            variant="outlined"
            value={zipcode}
            onChange={(e: any) => {
              setZipcode(e.target.value);
            }}
          />
          <TextField
            disabled
            label="District"
            variant="outlined"
            value={district}
            onChange={(e: any) => {
              setDistrict(e.target.value);
            }}
          />
          <Box sx={{ width: '49%' }} />
        </Box>
        <TextField
          fullWidth
          name="google_map"
          label="Map Location"
          variant="outlined"
          defaultValue={currentEditMarket?.google_map ?? ''}
          style={{ width: '100%' }}
        />
        <div className="section-title">CONTACT PERSON</div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '16px 0',
          }}>
          <TextField
            required
            name="first_name"
            label="First Name"
            variant="outlined"
            defaultValue={currentEditMarket?.supervisor?.first_name ?? ''}
          />
          <TextField
            name="middle_name"
            label="Middle Name"
            variant="outlined"
            defaultValue={currentEditMarket?.supervisor?.middle_name ?? ''}
          />
          <TextField
            required
            name="last_name"
            label="Last Name"
            variant="outlined"
            defaultValue={currentEditMarket?.supervisor?.last_name ?? ''}
          />
          <TextField
            required
            name="email"
            label="Email Address"
            variant="outlined"
            defaultValue={currentEditMarket?.supervisor?.email ?? ''}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '16px 0',
          }}>
          <TextField
            name="position"
            label="Position"
            variant="outlined"
            defaultValue={currentEditMarket?.supervisor?.position ?? ''}
          />
          <TextField
            name="telephone"
            label="Telephone No."
            variant="outlined"
            defaultValue={currentEditMarket?.supervisor?.telephone ?? ''}
          />
          <TextField
            name="mobile_phone"
            label="Mobile No."
            variant="outlined"
            defaultValue={currentEditMarket?.supervisor?.mobile_phone ?? ''}
          />
          <Box sx={{ width: '24%' }} />
        </Box>

        <div className="section-title">MARKET INFORMATION</div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '16px 0',
            mb: 10,
          }}>
          <TextField
            required
            disabled
            name="type"
            label="Market Type"
            variant="outlined"
            defaultValue={
              MARKET_TYPE.find(
                (item: any) => item.type === currentEditMarket?.type
              )?.value ?? MARKET_TYPE[0].value
            }
          />
          <TextField
            required
            select
            name="clazz"
            label="MarketClass"
            defaultValue={currentEditMarket?.clazz ?? ''}>
            {CLASS_RENTAL_AMOUNT.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ width: '49%' }} />
        </Box>
        <Divider sx={{ my: '30px' }} />
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}>
          <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Container>
      </form>
    </>
  );
};

export default MarketFormStep1;
