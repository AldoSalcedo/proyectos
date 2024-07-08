import { addNewUser, deleteUserById, editUser, User, UserId, UserWithId } from '../store/slice'
import { useAppDispatch } from './store'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const addUser = ({name, email, github}: User) => {
    dispatch(addNewUser({name, email, github}))
  }

  const deleteUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const updateUser = (user: UserWithId) => {
    dispatch(editUser(user))
  }

  return { addUser, deleteUser, updateUser }
}
