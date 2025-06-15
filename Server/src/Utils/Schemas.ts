import zod from 'zod'

export const userSchema = zod.object({
  nombre: zod.string(),
  correo: zod.string().email(),
  titulo_biologico: zod.string(),
  contraseña: zod.string()
})

export type typeuserSchema = zod.infer<typeof userSchema>

const partialUserSchema = userSchema.partial()

export async function validateUser({ input }: { input: typeuserSchema }): Promise<zod.SafeParseReturnType<typeuserSchema, typeuserSchema>> {
  return userSchema.safeParseAsync(input)
}

export async function validatePartialUser({ input }: { input: Partial<typeuserSchema> }) {
  return partialUserSchema.safeParseAsync(input)
}