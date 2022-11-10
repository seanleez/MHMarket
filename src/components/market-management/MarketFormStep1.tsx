import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CLASS_RENTAL_AMOUNT,
  MARKET_TYPE,
  rootURL,
  STATE_VALUES,
} from '../../const/const';
import ProgressCirle from '../common/progress-circle/ProgressCircle';

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
  const token = JSON.parse(
    localStorage.getItem('currentUser') ?? ''
  )?.access_token;

  useEffect(() => {
    if (isAtEditPage && currentEditMarket) {
      Promise.all([
        fetch(`${rootURL}/locations/provinces`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(
          `${rootURL}/locations/cities?` +
            new URLSearchParams({
              province: currentEditMarket?.location?.province,
            }),
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        fetch(
          `${rootURL}/locations/wards?` +
            new URLSearchParams({
              province: currentEditMarket?.location?.province,
              city: currentEditMarket?.location?.city,
            }),
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ])
        .then((resList) => resList.map((res) => res.json()))
        .then((promises) => {
          const getData = async (prms: any) => {
            const result = [];
            for (const promise of prms) {
              result.push(await promise);
            }
            return result;
          };
          return getData(promises);
        })
        .then((datas) => {
          const [{ provinces }, { cities }, { wards }] = datas;
          setListProvinces(provinces);
          setProvinceValue(currentEditMarket?.location?.province ?? '');
          setListCities(cities);
          setCityValue(currentEditMarket?.location?.city ?? '');
          setListWards(wards);
          setWardValue(currentEditMarket?.location?.ward ?? '');
          return { provinces, cities, wards };
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    if (isAtEditPage && currentEditMarket) {
      fetch(
        `${rootURL}/locations/query?` +
          new URLSearchParams({
            province: currentEditMarket?.location?.province ?? '',
            city: currentEditMarket?.location?.city ?? '',
            ward: currentEditMarket?.location?.ward ?? '',
          }),
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data && data.location) {
            setZipcode(data.location.zipcode);
            setDistrict(data.location.district);
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleChangeProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvinceValue(e.target.value);
    fetch(
      `${rootURL}/locations/cities?` +
        new URLSearchParams({
          province: e.target.value,
        }),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.cities) {
          setListCities(data.cities);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityValue(e.target.value);
    fetch(
      `${rootURL}/locations/wards?` +
        new URLSearchParams({
          province: provinceValue,
          city: e.target.value,
        }),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.wards) {
          setListWards(data.wards);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleChangeWard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWardValue(e.target.value);
    fetch(
      `${rootURL}/locations/query?` +
        new URLSearchParams({
          province: provinceValue,
          city: cityValue,
          ward: e.target.value,
        }),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.location) {
          setZipcode(data.location.zipcode);
          setDistrict(data.location.district);
        }
      })
      .catch((err) => console.error(err));
  };

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
              )?.value ?? ''
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
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/market-management')}>
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
