import { User } from "../types/types"

const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number } = {}) => {
  await delay(300)

  return await fetch(
    `https://randomuser.me/api?results=10&seed=aldo&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la peticion')
      return await res.json()
    })

    .then((res) => {
      const currentPage = Number(res.info.page)
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1

      return {
        users: res.results as User[],
        nextCursor,
      }
    })
}

export const deleteUser = async (email: string) => {
  // Simular una llamada a API
  return new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
}