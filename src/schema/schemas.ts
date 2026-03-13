import z from 'zod'

import { NoteColor } from '../generated/prisma/enums.js'

const removeUndefined = (obj: object) => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined))
}

// ID
export const idSchema = z.coerce.number().int().positive()

// Usuário
export const userSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.string().email(),
  password: z.string().min(6)
})
export type CreateUserDTO = z.infer<typeof userSchema>

export const updateUserSchema = userSchema.partial().transform((data) => removeUndefined(data))
export type UpdateUserDTO = z.infer<typeof updateUserSchema>

// Anotações
export const noteSchema = z.object({
  title: z.string().min(2).trim(),
  content: z
    .string()
    .nullable()
    .optional()
    .transform((v) => v ?? null),
  category: z.string(),
  color: z.enum(NoteColor),
  userId: z.number().int().positive()
})
export type CreateNoteDTO = z.infer<typeof noteSchema>

export const updateNoteSchema = noteSchema
  .omit({ userId: true })
  .partial()
  .transform((data) => removeUndefined(data))
export type UpdateNoteDTO = z.infer<typeof updateNoteSchema>

export const noteFilterSchema = z.object({
  search: z.string().trim().default(''),
  category: z.string().default(''),
  color: z.enum(NoteColor).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10)
})
export type NoteFilterDTO = z.infer<typeof noteFilterSchema>
