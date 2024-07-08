import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'John Doe',
    email: 'jd@gmail.com',
    github: 'jona',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'js@gmail.com',
    github: 'janesm',
  },
  {
    id: '3',
    name: 'Rudras Bow',
    email: 'rb@gmail.com',
    github: 'rubo',
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mj@gmail.com',
    github: 'mikejon',
  },
  {
    id: '5',
    name: 'Alice Brown',
    email: 'ab@gmail.com',
    github: 'alibro',
  },
  {
    id: '6',
    name: 'David Clark',
    email: 'dc@gmail.com',
    github: 'daclark',
  },
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('_redux_State_')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState).users
  } catch (err) {
    return undefined
  }
}

const initialState: UserWithId[] = loadState() || DEFAULT_STATE

/* NOTA: Aprovechamos Immer de Redux Toolkit escribiendo codigo que parece mutar el estado pero en realidad se eta creando una copia inmutable del estado */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const index = state.findIndex(user => user.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const userAllreadyDefined = state.find(user => user.id === action.payload.id)
      if(!userAllreadyDefined) {
        state.push(action.payload)
      }
    },
    editUser: (state, action: PayloadAction<UserWithId>) => {
      const index = state.findIndex(user => user.id === action.payload.id)
      if(index !== -1) {
        state[index] = action.payload
      }
    }
  },
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser, editUser } = usersSlice.actions
