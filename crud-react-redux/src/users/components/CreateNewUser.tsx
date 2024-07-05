import { Button, Card, TextInput, Title, Badge } from '@tremor/react'
import { useUserActions } from '../hooks/useUserActions'
import { useState } from 'react'

export const CreateNewUser = () => {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (name && email && github) {
      addUser({ name, email, github })
      setResult('ok')
      form.reset()
    } else {
      return setResult('ko')
      console.log('Datos incompletos')
    }
  }

  return (
    <Card className="mt-4">
      <Title>Create New User</Title>
      <form onSubmit={handleSubmit} className="" action="">
        <TextInput name="name" placeholder="Nombre" />
        <TextInput name="email" placeholder="Email" />
        <TextInput name="github" placeholder="Usuario Github" />

        <div>
          <Button type="submit" className="mt-4">
            Crear Usuario
          </Button>
          <span className='ml-2'>
            {result === 'ok' && <Badge color='green'>Añadido Correctamente</Badge>}
            {result === 'ko' && <Badge color='red'>Datos Incompletos</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}
