import { PrismaClient } from '@prisma/client'

/**
 * @type PrismaClient
 */
let prisma

// If we're in production, create a new Prisma client
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
  prisma.$connect()
} else {
  // Otherwise, use a global variable
  // This prevents us from creating a new Prisma client on every request
  if (!global.__db) {
    global.__db = new PrismaClient()
    global.__db.$connect()
  }
  prisma = global.__db
}

export { prisma }
