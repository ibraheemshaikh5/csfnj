import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { events } from '@/db/schema'
import { asc, desc } from 'drizzle-orm'
import { z } from 'zod'

const eventSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  fullDescription: z.string().nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  thumbnailAlt: z.string().nullable().optional(),
  contentImages: z.array(z.string()).nullable().optional(),
  status: z.enum(['upcoming', 'ongoing', 'recent', 'past']).default('upcoming'),
  isPinned: z.boolean().default(false),
  showDonateButton: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  eventDate: z.string().nullable().optional(),
})

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const allEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.isPinned), asc(events.displayOrder))

  return NextResponse.json(allEvents)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Parse JSON with error handling
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
  }

  const validated = eventSchema.safeParse(body)

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.flatten() },
      { status: 400 }
    )
  }

  const { eventDate, ...rest } = validated.data

  const [newEvent] = await db
    .insert(events)
    .values({
      ...rest,
      eventDate: eventDate ? new Date(eventDate) : null,
    })
    .returning()

  // Revalidate pages that display events
  revalidatePath('/')
  revalidatePath('/events')

  return NextResponse.json(newEvent, { status: 201 })
}
