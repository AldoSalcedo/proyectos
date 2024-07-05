import { configureStore, Middleware } from '@reduxjs/toolkit'
import usersReducer, {rollbackUser} from './slice'
import { toast } from 'sonner'

/* Midlewares */
const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('_redux_State_', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = (store)=> (next) => (action) => {
  const {type, payload} = action
  const previousState = store.getState()
  
  // Fase 1
  next(action)

  if(type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.ok) toast.success(`Usuario ${payload} eliminado correctamente`)
        throw new Error('Error al eliminar el usuario')
    })
    .catch((error) => {
      toast.error(`Error deleting user ${userIdToRemove}`)
      if(userToRemove) store.dispatch(rollbackUser(userToRemove))
      console.error('Error deleting user:', error);
      toast.error(`Error al eliminar el usuario ${payload}`);
    })
  }
  // Fase 2
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {

    return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)//syncWithDatabaseMiddleware
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch