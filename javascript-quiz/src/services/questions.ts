const API_URL = import.meta.env.PROD
  ? 'https://midu-react-13.surge.sh/'
  : 'http://localhost:5173/'

export const getAllQuestions = async (limit: number) => {
  const res = await fetch(`${API_URL}/data.json`)
  const json = await res.json()

return json
}