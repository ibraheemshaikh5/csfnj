import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/db'
import { impactItems } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { z } from 'zod'

const impactItemSchema = z.object({
  heading: z.string().min(1, 'Heading is required'),
  description: z.array(z.string()).min(1, 'At least one description line required'),
  displayOrder: z.number().int().min(0).default(0),
})

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const items = await db
    .select()
    .from(impactItems)
    .orderBy(asc(impactItems.displayOrder))

  return NextResponse.json(items)
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

  const validated = impactItemSchema.safeParse(body)

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.flatten() },
      { status: 400 }
    )
  }

  const [newItem] = await db
    .insert(impactItems)
    .values(validated.data)
    .returning()

  // Revalidate the home page to show new data
  revalidatePath('/')

  return NextResponse.json(newItem, { status: 201 })
}
