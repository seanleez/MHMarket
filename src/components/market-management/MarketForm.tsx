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
import { rootURL, STATE_VALUES } from '../../const/const';

const MarketForm = (props: any) => {
  const { currentEditMarket, onSubmit } = props;
  const [listProvinces, setListProvinces] = useState<any>([]);
  const [provinceValue, setProvinceValue] = useState<string>('');
  const [listCities, setListCities] = useState<any>([]);
  const [cityValue, setCityValue] = useState<string>('');
  const [listWards, setListWards] = useState<any>([]);
  const [wardValue, setWardValue] = useState<string>('');

  const [zipcode, setZipcode] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const navigate = useNavigate();
  const isAtEditPage = location.pathname.includes('/market/edit');
  const token = JSON.parse(
    localStorage.getItem('currentUser') ?? ''
  )?.access_token;

  useEffect(() => {
    fetch(`${rootURL}/locations/provinces`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.provinces) {
          setListProvinces(data.provinces);
        }
      })
      .catch((err) => console.error(err));
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
      <form onSubmit={onSubmit}>
        <div className="section-title">BASIC</div>
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
            name="street"
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
            name="zipcode"
            label="Zipcode"
            variant="outlined"
            value={zipcode}
            onChange={(e: any) => {
              setZipcode(e.target.value);
            }}
          />
          <TextField
            disabled
            name="district"
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
          name="location"
          label="Map Location"
          variant="outlined"
          defaultValue={currentEditMarket?.name ?? ''}
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
            name="firstName"
            label="First Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            name="middleName"
            label="Middle Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            required
            name="lastName"
            label="Last Name"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            required
            name="email"
            label="Email Address"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
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
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            name="telNum"
            label="Telephone No."
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
          />
          <TextField
            name="mobileNum"
            label="Mobile No."
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}
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
          }}>
          <TextField
            required
            select
            name="marketType"
            label="Market Type"
            variant="outlined"
            defaultValue={currentEditMarket?.name ?? ''}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            name="marketClass"
            label="MarketClass"
            defaultValue={currentEditMarket?.status ?? ''}>
            {STATE_VALUES.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ width: '49%' }} />
        </Box>
        <Divider sx={{ my: '30px' }} />
        <Container
          sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/role-management')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large">
            {isAtEditPage ? 'EDIT ROLE' : 'CREATE ROLE'}
          </Button>
        </Container>
      </form>
    </>
  );
};

export default MarketForm;
