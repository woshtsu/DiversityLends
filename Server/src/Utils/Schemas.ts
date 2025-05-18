import zod, { ZodError } from 'zod'

export interface typeuserSchema {
  nombre: string
  correo: string
  titulo_biologico: string
  contraseña: string
}


export const userSchema = zod.object({
  nombre: zod.string(),
  correo: zod.string().email(),
  titulo_biologico: zod.string(),
  contraseña: zod.string()
})
export function validateUser({ input }: { input: typeuserSchema }): Promise<zod.SafeParseReturnType<typeuserSchema, typeuserSchema>> {
  return userSchema.safeParseAsync(input)
}