import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core'

export const impactItems = pgTable('impact_items', {
  id: serial('id').primaryKey(),
  heading: text('heading').notNull(),
  description: text('description').array().notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  fullDescription: text('full_description'),
  thumbnailUrl: text('thumbnail_url'),
  thumbnailAlt: text('thumbnail_alt'),
  contentImages: text('content_images').array(),
  status: text('status').notNull().default('upcoming'),
  isPinned: boolean('is_pinned').notNull().default(false),
  showDonateButton: boolean('show_donate_button').notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  eventDate: timestamp('event_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Type for inserting new items
export type NewImpactItem = typeof impactItems.$inferInsert
export type NewEvent = typeof events.$inferInsert

// Type for selecting items
export type ImpactItem = typeof impactItems.$inferSelect
export type Event = typeof events.$inferSelect
