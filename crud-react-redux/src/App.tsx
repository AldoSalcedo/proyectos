import { Toaster } from 'sonner'
import './App.css'
import { CreateNewUser } from './users/components/CreateNewUser'
import { UsersList } from './users/components/UsersList'
import MiddlewareExplanation from './users/components/MiddlewareExplanation'

function App() {
  return (
    <>
      <UsersList />
      <CreateNewUser />
      <Toaster richColors />
      <MiddlewareExplanation />
    </>
  )
}

export default App
