/* eslint-disable react/react-in-jsx-scope */
import { SortBy, type User } from '../types/types.d'

interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser: (email: string) => void
  users: User[]
  showColors: boolean
  isDeletingUser: boolean
  deletingUserEmail: string | undefined
}

export const UsersList = ({
  users,
  showColors,
  deleteUser,
  changeSorting,
  isDeletingUser,
  deletingUserEmail
}: Props) => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>
            Apellido
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>
            Pais
          </th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'
          const isDeleting = isDeletingUser && user.email === deletingUserEmail;

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt="" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email)
                  }}
                  disabled={isDeletingUser}
                >
                  {isDeleting ? 'Eliminando...' : 'Borrar'}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
