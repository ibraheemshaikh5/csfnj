import { notFound } from 'next/navigation'
import EventVisualEditor from '@/components/admin/EventVisualEditor'
import { db } from '@/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, parseInt(id)))

  if (!event) {
    notFound()
  }

  return <EventVisualEditor event={event} mode="edit" />
}
