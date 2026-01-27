import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Lazy initialization to avoid connection during build
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getDb() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    const client = postgres(connectionString)
    _db = drizzle(client, { schema })
  }
  return _db
}

// Proxy for backwards compatibility - lazily initializes on first use
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle<typeof schema>>]
  },
})
