import zod from 'zod'

export interface typeuserSchema {
  nombre: string
  correo: string
  titulo_biologico: string
}

export const userSchema = zod.object({
  nombre: zod.string(),
  correo: zod.string().email(),
  titulo_biologico: zod.string()
})
export function validateUser(input: typeuserSchema): typeuserSchema {
  return userSchema.parse(input)
}