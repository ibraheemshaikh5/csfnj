import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only')
    .optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  fullDescription: z.string().nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  thumbnailAlt: z.string().nullable().optional(),
  contentImages: z.array(z.string()).nullable().optional(),
  status: z.enum(['upcoming', 'ongoing', 'recent', 'past']).optional(),
  isPinned: z.boolean().optional(),
  showDonateButton: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
  eventDate: z.string().nullable().optional(),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  // Validate ID is a number
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
  }

  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, parsedId))

  if (!event) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(event)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  // Validate ID is a number
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
  }

  // Parse JSON with error handling
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
  }

  const validated = updateSchema.safeParse(body)

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.flatten() },
      { status: 400 }
    )
  }

  const { eventDate, ...rest } = validated.data

  const updateData: Record<string, unknown> = { ...rest }
  if (eventDate !== undefined) {
    updateData.eventDate = eventDate ? new Date(eventDate) : null
  }

  let updated
  try {
    ;[updated] = await db
      .update(events)
      .set(updateData)
      .where(eq(events.id, parsedId))
      .returning()
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    throw err
  }

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Revalidate pages that display events
  revalidatePath('/')
  revalidatePath('/events')
  revalidatePath(`/events/${updated.slug}`)

  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  // Validate ID is a number
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
  }

  const [deleted] = await db
    .delete(events)
    .where(eq(events.id, parsedId))
    .returning()

  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Revalidate pages that display events
  revalidatePath('/')
  revalidatePath('/events')

  return NextResponse.json({ success: true })
}
