import { addNewUser, deleteUserById, User, UserId } from '../store/slice'
import { useAppDispatch } from './store'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const addUser = ({name, email, github}: User) => {
    dispatch(addNewUser({name, email, github}))
  }

  const deleteUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { addUser, deleteUser }
}
