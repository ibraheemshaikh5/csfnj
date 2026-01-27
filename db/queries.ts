import { db } from './index'
import { impactItems, events } from './schema'
import { asc, eq, desc, ne, and } from 'drizzle-orm'

export async function getImpactItems() {
  return db.select().from(impactItems).orderBy(asc(impactItems.displayOrder))
}

export async function getOngoingEvents() {
  return db
    .select()
    .from(events)
    .where(eq(events.status, 'ongoing'))
    .orderBy(desc(events.isPinned), asc(events.displayOrder))
}

export async function getRecentEvents() {
  // Automatically get the last 4 events (by createdAt), excluding ongoing events
  return db
    .select()
    .from(events)
    .where(ne(events.status, 'ongoing'))
    .orderBy(desc(events.createdAt))
    .limit(4)
}

export async function getAllEvents() {
  return db
    .select()
    .from(events)
    .where(ne(events.status, 'past'))
    .orderBy(desc(events.isPinned), asc(events.displayOrder))
}

export async function getEventBySlug(slug: string) {
  const result = await db
    .select()
    .from(events)
    .where(eq(events.slug, slug))
    .limit(1)
  return result[0] || null
}

export async function getAllEventSlugs() {
  return db
    .select({ slug: events.slug })
    .from(events)
    .where(ne(events.status, 'past'))
}
