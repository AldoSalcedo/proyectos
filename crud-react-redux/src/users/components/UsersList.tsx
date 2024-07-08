// 'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Badge,
  Card,
  TextInput,
  Button,
} from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUserActions'
import { useState } from 'react'
import { UserWithId } from '../store/slice'

export function UsersList() {
  const users = useAppSelector((state) => state.users)
  const { deleteUser, updateUser } = useUserActions()
  const [editingUser, setEditingUser] = useState<UserWithId | null>(null)

  const handleEdit = (user: UserWithId) => {
    setEditingUser(user)
  }

  const handleSave = () => {
    if (editingUser) {
      updateUser(editingUser)
      setEditingUser(null)
    }
  }

  const handleCancel = () => {
    setEditingUser(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [e.target.name]: e.target.value,
      })
    }
  }

  return (
    <>
      <Card>
        <Title>
          Usuarios
          <Badge className="ml-2">{users.length}</Badge>
        </Title>
        <Table className="mt-8 rounded-3xl shadow-xl">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Id
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Nombre
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Email
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Acciones
              </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {user.id}
                </TableCell>

                <TableCell className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={`https://unavatar.io/github/${
                      editingUser?.id === user.id
                        ? editingUser.github
                        : user.github
                    }`}
                    alt={user.name}
                  />
                  {editingUser?.id === user.id ? (
                    <>
                      <TextInput
                        name="github"
                        value={editingUser.github}
                        onChange={handleInputChange}
                      />
                      <TextInput
                        name="name"
                        value={editingUser.name}
                        onChange={handleInputChange}
                      />
                    </>
                  ) : (
                    user.name
                  )}
                </TableCell>

                <TableCell>
                  {editingUser?.id === user.id ? (
                    <TextInput
                      name="email"
                      value={editingUser.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>

                <TableCell>
                  {editingUser?.id === user.id ? (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Save</Button>
                      <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>

                      <button onClick={() => deleteUser(user.id)}>
                        <svg
                          aria-label="Remove Element"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
