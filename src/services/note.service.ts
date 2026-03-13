import { prisma } from '../lib/prisma.js'

import type { Note, Prisma } from '../generated/prisma/client.js'
import type { CreateNoteDTO, NoteFilterDTO, UpdateNoteDTO } from '../schema/schemas.js'

const findAllNotes = async (filters: NoteFilterDTO): Promise<Note[]> => {
  const { search, color, category, page, limit } = filters

  const where: Prisma.NoteWhereInput = {}

  if (search) {
    where.title = {
      contains: search,
      mode: 'insensitive'
    }
  }

  if (color) {
    where.color = color
  }

  if (category) {
    where.category = {
      contains: category,
      mode: 'insensitive'
    }
  }

  return prisma.note.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    },
    skip: (page - 1) * limit,
    take: limit
  })
}

const findNoteById = async (id: number): Promise<Note | null> => {
  return prisma.note.findUnique({
    where: { id }
  })
}

const createNote = async (data: CreateNoteDTO): Promise<Note> => {
  return prisma.note.create({
    data
  })
}

const updateNote = async (id: number, data: UpdateNoteDTO): Promise<Note | null> => {
  const note = await findNoteById(id)
  if (!note) return null

  return prisma.note.update({
    where: { id },
    data
  })
}

const deleteNote = async (id: number): Promise<Note | null> => {
  const note = await findNoteById(id)
  if (!note) return null

  return prisma.note.delete({
    where: { id }
  })
}

export { findAllNotes, findNoteById, createNote, updateNote, deleteNote }
