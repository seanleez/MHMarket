import { Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';


interface IYesNoQuestion {
  mainQuestion: string;
  subQuestion: string;
  mainAnswer: boolean;
  subAnswer: string;
  whenEnableSub: boolean; // which case enable sub question? yes => enable when mainAnswer = yes; no => enable when mainAnswer = no
  setMainAnswer: (ans: boolean) => void;
  setSubAnswer: (ans: string) => void;
}

const YesNoQuestion = ({
  mainQuestion,
  subQuestion,
  
  mainAnswer,
  subAnswer,

  whenEnableSub,

  setMainAnswer,
  setSubAnswer
}: IYesNoQuestion) => {

  const whenDisableSubAnswer = mainAnswer !== whenEnableSub


  // clear subAnswer when disbled
  useEffect(() => {
    if(whenDisableSubAnswer) {
      setSubAnswer('');
    }
  }, [whenDisableSubAnswer]);

  return (
    <Box sx={{ margin: '25px 0 20px 0' }}>
      <Typography>{ mainQuestion }</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={mainAnswer ? 'yes' : 'no'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setMainAnswer(e.target.value === 'yes') }}
          row
        >
          <FormControlLabel value="yes" control={<Radio size='small' />} label="Yes" />
          <FormControlLabel value="no" control={<Radio size='small' />} label="No" />
        </RadioGroup>
      </FormControl>
      <Box>
        <Typography sx={{fontSize: '0.9em'}}>{ subQuestion }</Typography>
        <TextField 
          size='small' 
          disabled={whenDisableSubAnswer}
          value={subAnswer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSubAnswer(e.target.value)}
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default YesNoQuestion;