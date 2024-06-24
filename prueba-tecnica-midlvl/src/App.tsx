/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types/types.d'
import { UsersList } from './components/UsersList'

/* 1.- Hacer un fetching de datos de una API */
/* 2.- Mostrar los datos en una tabla */
/* 3.- Colorear las filas de la tabla al dar click en un boton */
/* 4.- Acomodar los resultados por pais */
/* 5.- Activar la habilidad para eliminar filas */
/* 6.- implementar un feature que permita al usuario regresar al estado original, se recuperan todas las filas borradas (mi solucion: usar useRef) */
/* 7.- maneja errores potenciales */
/* 8.- implementa un feature que permita al usuario filtrar la data por pais */
/* 9.- Evita volver a ordenar los usuarios cuando el usuario esta cambiando el filtro por pais (mi solucion: Usar useMemo)*/
/* 10.- Acomodar con un click en el header de alguna columna */
function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])
  /* useRef ==> guardaremos un valor que queremos que se comparta entre renderizados, 
      al cambiar no se volvera a renderizar el componente
  */

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email != email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  /* guardaremos el valor y solo se calculara entre renderizados cuando cambien las [dependencias] */
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    }

    /* to Sorted, regresa un nuevo array con los elementos filtrados en orden ascendente */
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Prueba Técnica</h1>
      <header>
        <button onClick={toggleColors}>Color Rows</button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar' : 'Order by Country'}
        </button>

        <button onClick={handleReset}>Reset State</button>

        <input
          type="text"
          placeholder="Filter by Country"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        <UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
