import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useStallData } from '../pages/EditStallApplication';
import EditableDependentTable from './EditableDependentTable';
import YesNoQuestion from './YesNoQuestion';

function FormOwnerDetailInfor({tableRef}: {tableRef: React.MutableRefObject<unknown>}) {

  const { commonData, setCommonData } = useStallData();

  const [stallQuestion, setStallQuestion] = useState({
    mainAnswer: true,
    subAnswer: ''
  })

  const [taxQuestion, setTaxQuestion] = useState({
    mainAnswer: false,
    subAnswer: ''
  })

  const [leaseQuestion, setLeaseQuestion] = useState({
    mainAnswer: true,
    subAnswer: ''
  })

  const [rentQuestion, setRentQuestion] = useState({
    mainAnswer: true,
    subAnswer: ''
  })
  
  const [violateQuestion, setViolateQuestion] = useState({
    mainAnswer: true,
    subAnswer: ''
  })
  
  const [criminalQuestion, setCriminalQuestion] = useState({
    mainAnswer: true,
    subAnswer: ''
  })
  
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
          mainAnswer={stallQuestion.mainAnswer}
          subAnswer={stallQuestion.subAnswer}
          setMainAnswer={(ans: boolean) => setStallQuestion(prev => ({ ...prev, mainAnswer: ans }))}
          setSubAnswer={(ans: string) => setStallQuestion(prev => ({ ...prev, subAnswer: ans }))}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Were you able to pay tax in your previous stall?'
          subQuestion='If not, please indicate the reason why?'
          whenEnableSub={false}
          mainAnswer={taxQuestion.mainAnswer}
          subAnswer={taxQuestion.subAnswer}
          setMainAnswer={(ans: boolean) => setTaxQuestion(prev => ({ ...prev, mainAnswer: ans }))}
          setSubAnswer={(ans: string) => setTaxQuestion(prev => ({ ...prev, subAnswer: ans }))}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Were you forced to terminate your previous lease?'
          subQuestion='If yes, please explain.'
          whenEnableSub={true}
          mainAnswer={leaseQuestion.mainAnswer}
          subAnswer={leaseQuestion.subAnswer}
          setMainAnswer={(ans: boolean) => setLeaseQuestion(prev => ({ ...prev, mainAnswer: ans }))}
          setSubAnswer={(ans: string) => setLeaseQuestion(prev => ({ ...prev, subAnswer: ans }))}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Did you pay to someone in exchage for a chance to rent for a stall?'
          subQuestion='If yes, please indicate the name'
          whenEnableSub={true}
          mainAnswer={rentQuestion.mainAnswer}
          subAnswer={rentQuestion.subAnswer}
          setMainAnswer={(ans: boolean) => setRentQuestion(prev => ({ ...prev, mainAnswer: ans }))}
          setSubAnswer={(ans: string) => setRentQuestion(prev => ({ ...prev, subAnswer: ans }))}
        />
        
        {/*  */}
        <YesNoQuestion
          mainQuestion='Have you been convicted of violating a law, ordinance or rule?'
          subQuestion='If so, please explain'
          whenEnableSub={true}
          mainAnswer={violateQuestion.mainAnswer}
          subAnswer={violateQuestion.subAnswer}
          setMainAnswer={(ans: boolean) => setViolateQuestion(prev => ({ ...prev, mainAnswer: ans }))}
          setSubAnswer={(ans: string) => setViolateQuestion(prev => ({ ...prev, subAnswer: ans }))}
        />

        {/*  */}
        <YesNoQuestion
          mainQuestion='Do you have a current administrative or criminal case?'
          subQuestion='If so, please explain'
          whenEnableSub={true}
          mainAnswer={criminalQuestion.mainAnswer}
          subAnswer={criminalQuestion.subAnswer}
          setMainAnswer={(ans: boolean) => setCriminalQuestion(prev => ({ ...prev, mainAnswer: ans }))}
          setSubAnswer={(ans: string) => setCriminalQuestion(prev => ({ ...prev, subAnswer: ans }))}
        />
      </Box>
      
      {/*  */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography>How much is your capital?</Typography>
        <TextField size='small' sx={{ width: '100%' }} />

        <Typography sx={{ marginTop: '20px' }} >What are you going to sell in your stall?</Typography>
        <TextField size='small' sx={{ width: '100%' }} />
      </Box>
    </Box>
  );
}

export default FormOwnerDetailInfor;