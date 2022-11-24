import { Box, Typography } from '@mui/material';
import { TPair } from '../../const/interface';

type TQuestion = {
  question: string;
  answer: string;
  subquestion?: {
    question: string;
    answer: string;
  };
};

interface IQuestionaire {
  questions: TQuestion[];
}

const customField = (q: string, a: string) => {
  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          width: '75%',
          backgroundColor: '#FAFAFA',
          border: '1px solid #F0F0F0',
          padding: '5px',
        }}>
        {q}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          flex: 1,
          fontWeight: 'bold',
          border: '1px solid #F0F0F0',
          padding: '5px',
        }}>
        {a}
      </Typography>
    </>
  );
};

const questionAnswer = (question: TQuestion) => {
  return (
    <>
      <Box sx={{ width: '50%', display: 'flex' }}>
        {customField(question.question, question.answer)}
      </Box>
      {question.subquestion && (
        <Box sx={{ width: '50%', display: 'flex' }}>
          {customField(
            question.subquestion.question,
            question.subquestion.answer
          )}
        </Box>
      )}
    </>
  );
};

const Questionaire: React.FC<IQuestionaire> = ({ questions }) => {
  return (
    <>
      {questions.slice(0, 9).map((question: TQuestion, i: number) => {
        return (
          <Box key={i} sx={{ display: 'flex', width: '100%' }}>
            {questionAnswer(question)}
          </Box>
        );
      })}
    </>
  );
};

export default Questionaire;
