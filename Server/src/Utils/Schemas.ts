import {z} from 'zod'

export const userSchema = z.object({
  nombre: z.string(),
  correo: z.string().email(),
  titulo_biologico: z.string(),
  contraseña: z.string()
})

export interface TypeSpecies {
  especie_id:        number;
  nombre_cientifico: string;
  nombre_comun:      string;
  familia:           string;
  categoria_id:      number;
}

export interface TypeResponseGetUsuario {
  usuario_id:       number;
  nombre:           string;
  correo:           string;
  titulo_biologico: null;
  contraseña:       string;
}

export interface TypeAvistamientos {
  nombre_usuario:     string;
  especie:            string;
  latitud:            number;
  longitud:           number;
  descripcion:        string;
  fecha_avistamiento: Date;
}

export const correoSchema = z.string().email();

export type TypeCorreo = z.infer<typeof correoSchema>;

export type typeuserSchema = z.infer<typeof userSchema>

const partialUserSchema = userSchema.partial()

export type partialTypeUserSchema = z.infer<typeof partialUserSchema>

export async function validateUser({ input }: { input: typeuserSchema }): Promise<z.SafeParseReturnType<typeuserSchema, typeuserSchema>> {
  return userSchema.safeParseAsync(input)
}

export async function validatePartialUser({ input }: { input: Partial<typeuserSchema> }) {
  return partialUserSchema.safeParseAsync(input)
}