import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useStallData } from '../pages/EditStallApplication';
import EditableDependentTable from './EditableDependentTable';
import YesNoQuestion from './YesNoQuestion';

function FormOwnerDetailInfor({tableRef}: {tableRef: React.MutableRefObject<unknown>}) {

  const { commonData, setCommonData } = useStallData();
  
  return (
    <Box>
      <Box sx={{ marginBottom: '100px' }}>
        <Typography sx={{ fontWeight: 'bold', margin: '10px 0 0 0' }}>
          Child/ren and/or dependents:
        </Typography>
        <Typography sx={{  fontSize: '14px', color: '#6c6c6c', fontStyle: 'italic', margin: '0 0 20px 0' }}>
          If none, kindly indicate "none" in the textbox.
        </Typography>
        {/* 1st row */}
        <EditableDependentTable />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 'bold', margin: '10px 0 20px 0' }}>
          Other occupation or source of income:
        </Typography>
        {/*  */}
        <YesNoQuestion
          mainQuestion='Did you own a stall in any Public Market previously?'
          subQuestion='If yes, please indicate the public market and the stall number/section'
          whenEnableSub={true}
          mainAnswer={commonData.owned_any_stall}
          subAnswer={commonData.owned_stall_info}
          setMainAnswer={(ans: boolean) => setCommonData((dr: { owned_any_stall: boolean; }) => {dr.owned_any_stall = ans})}
          setSubAnswer={(ans: string) => setCommonData((dr: { owned_stall_info: string; }) => {dr.owned_stall_info = ans})}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Were you able to pay tax in your previous stall?'
          subQuestion='If not, please indicate the reason why?'
          whenEnableSub={false}
          mainAnswer={commonData.pay_tax_previous}
          subAnswer={commonData.pay_tax_previous_reason}
          setMainAnswer={(ans: boolean) => setCommonData((dr: { pay_tax_previous: boolean; }) => {dr.pay_tax_previous = ans})}
          setSubAnswer={(ans: string) => setCommonData((dr: { pay_tax_previous_reason: string; }) => {dr.pay_tax_previous_reason = ans})}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Were you forced to terminate your previous lease?'
          subQuestion='If yes, please explain.'
          whenEnableSub={true}
          mainAnswer={commonData.forced_terminate_previous}
          subAnswer={commonData.forced_terminate_reason}
          setMainAnswer={(ans: boolean) => setCommonData((dr: { forced_terminate_previous: boolean; }) => {dr.forced_terminate_previous = ans})}
          setSubAnswer={(ans: string) => setCommonData((dr: { forced_terminate_reason: string; }) => {dr.forced_terminate_reason = ans})}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Did you pay to someone in exchage for a chance to rent for a stall?'
          subQuestion='If yes, please indicate the name'
          whenEnableSub={true}
          mainAnswer={commonData.exchange_rent_stall}
          subAnswer={commonData.exchange_rent_stall_name}
          setMainAnswer={(ans: boolean) => setCommonData((dr: { exchange_rent_stall: boolean; }) => {dr.exchange_rent_stall = ans})}
          setSubAnswer={(ans: string) => setCommonData((dr: { exchange_rent_stall_name: string; }) => {dr.exchange_rent_stall_name = ans})}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Have you been convicted of violating a law, ordinance or rule?'
          subQuestion='If so, please explain'
          whenEnableSub={true}
          mainAnswer={commonData.convicted_violate_law}
          subAnswer={commonData.convicted_violate_law_reason}
          setMainAnswer={(ans: boolean) => setCommonData((dr: { convicted_violate_law: boolean; }) => {dr.convicted_violate_law = ans})}
          setSubAnswer={(ans: string) => setCommonData((dr: { convicted_violate_law_reason: string; }) => {dr.convicted_violate_law_reason = ans})}
        />

        {/*  */}
        <YesNoQuestion
          mainQuestion='Do you have a current administrative or criminal case?'
          subQuestion='If so, please explain'
          whenEnableSub={true}
          mainAnswer={commonData.administrative_criminal}
          subAnswer={commonData.administrative_criminal_reason}
          setMainAnswer={(ans: boolean) => setCommonData((dr: { administrative_criminal: boolean; }) => {dr.administrative_criminal = ans})}
          setSubAnswer={(ans: string) => setCommonData((dr: { administrative_criminal_reason: string; }) => {dr.administrative_criminal_reason = ans})}
        />
      </Box>
      
      {/*  */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography>How much is your capital?</Typography>
        <TextField size='small' sx={{ width: '100%' }} value={commonData.source_of_capital} onChange={e => setCommonData((dr: { source_of_capital: string; }) => {dr.source_of_capital = e.target.value})} />

        <Typography sx={{ marginTop: '20px' }} >What are you going to sell in your stall?</Typography>
        <TextField size='small' sx={{ width: '100%' }} value={commonData.capital} onChange={e => setCommonData((dr: { capital: string; }) => {dr.capital = e.target.value})}/>
      </Box>
    </Box>
  );
}

export default FormOwnerDetailInfor;