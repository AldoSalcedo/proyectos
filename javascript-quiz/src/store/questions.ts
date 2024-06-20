import { create } from 'zustand'
import { type QuizQuestion } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'

/* Descripcion del estado */
interface State {
  questions: QuizQuestion[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

const API_URL = import.meta.env.PROD
  ? 'https://midu-react-13.surge.sh/'
  : 'http://localhost:5173/'

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          loading: false,
          questions: [],
          currentQuestion: 0, //Posicion del array de preguntas

          fetchQuestions: async (limit: number) => {
            const res = await fetch(`${API_URL}/data.json`)
            const json = await res.json()

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)
            set({ questions }, false, 'FETCH_QUESTIONS')
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            // Recupera el valor del estado con get para actualizarlo
            const { questions } = get()
            // structure clone (clonar objetos de manera profunda)
            const newQuestions = structuredClone(questions)
            // encontrar questionIndex que clickeo el usuario
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            )
            // recuperar la informacion de esa pregunta
            const questionInfo = newQuestions[questionIndex]
            // Verifica si es correcta la respuesta seleccionada por el usuario
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex
            if (isCorrectUserAnswer) confetti()
            // Cambiar informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            }
            // Actualizamos el estado
            set({ questions: newQuestions })
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion })
            }
          },

          goPrevQuestion: () => {
            const { currentQuestion } = get()
            const prevQuestion = currentQuestion - 1

            if (prevQuestion >= 0) {
              set({ currentQuestion: prevQuestion })
            }
          },

          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET')
          },
        }
      },
      {
        name: 'questions',
      }
    )
  )
)
