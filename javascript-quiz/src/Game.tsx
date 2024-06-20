import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from './store/questions'
import { QuizQuestion } from './types'
import { ArrowBackIosNew, ArrowForward } from '@mui/icons-material'
import {Footer} from './Footer'

const getBackgroundColor = (info: QuizQuestion, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // Usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent'
  // Si ya selecciono y es incorrecta la respuesta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent'
  // Si ya selecciono y es correcta la respuesta
  if (index === correctAnswer) return 'green'
  // si la seleccion del usuario no es correcta
  if (index === userSelectedAnswer) return 'red'
  // no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuizQuestion }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  // Funcion que devuelve una funcion que es la del handleClick: () => {selectAnswer(info.id, answerIndex)}
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4, maxWidth: '100%' }}>

      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Card>
  )
}

export const Game = () => {
  // recupera pregunta que mostraremos al usuario
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
