import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

const QUESTIONS_LIMIT = 10

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(QUESTIONS_LIMIT)
  }
  return (
    <div style={{ marginTop: '16px' }}>
      <Button onClick={handleClick} variant="contained">
        ¡Empezar el juego!
      </Button>
    </div>
  )
}
