import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchUsers, deleteUser } from '../services/users'
import { FetchUsersResponse, type User } from '../types/types.d'

export const useUsers = () => {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FetchUsersResponse>({
      queryKey: ['users'],
      queryFn: ({ pageParam = 1 }) =>
        fetchUsers({ pageParam: pageParam as number }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus:
        false /* para evitar hacer un refetching de datos al regresar a la pagina desactivamos esta funcion de react-query */,
      staleTime: 1000 * 3,
    })

    /* Simulacion de una mutacion a la base de datos para borrar datos */
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: async (deletedEmail) => {
      // Cancelar queries en curso
      await queryClient.cancelQueries({ queryKey: ['users'] })

      // Obtener los datos actuales
      const previousUsers = queryClient.getQueryData<FetchUsersResponse>([
        'users',
      ])
      // Optimistically update
      queryClient.setQueryData<FetchUsersResponse>(['users'], (old) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            users: page.users.filter((user) => user.email !== deletedEmail),
          })),
        }
      })

      // Devolver el contexto con los datos previos
      return { previousUsers }
    },
    onError: (err, variables, context) => {
      // Si hay un error, revertimos a los datos previos
      if (context?.previousUsers) {
        queryClient.setQueryData<FetchUsersResponse>(
          ['users'],
          context.previousUsers
        )
      }
    },
    onSettled: () => {
      // Invalidar la query para asegurar que los datos están frescos
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const users: User[] = data?.pages.flatMap((page) => page.users) ?? []

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users,
    hasNextPage,
    deleteUser: deleteMutation.mutate,
    isDeletingUser: deleteMutation.isPending,
    deletingUserEmail: deleteMutation.variables,
  }
}

/* En este caso se utiliza el flatMap para "aplanar" los arrays, osease que en lugar de tener diversos array dentro de un array, tendriamos todos los datos dentro de un solo array */
