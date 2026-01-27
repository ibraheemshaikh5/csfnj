'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import EditableEventCard from './EditableEventCard'
import EventSettingsPanel from './EventSettingsPanel'
import EventPagePreview from './EventPagePreview'
import type { Event } from '@/db/schema'

type Props = {
  event: Event | null
  mode: 'create' | 'edit'
}

export default function EventVisualEditor({ event: initialEvent, mode }: Props) {
  const router = useRouter()
  const [event, setEvent] = useState<Partial<Event>>(
    initialEvent || {
      title: '',
      slug: '',
      description: '',
      fullDescription: '',
      thumbnailUrl: '',
      thumbnailAlt: '',
      contentImages: [],
      status: 'upcoming',
      isPinned: false,
      showDonateButton: false,
      displayOrder: 0,
      eventDate: null,
    }
  )
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasCreatedRef = useRef(mode === 'edit')

  // Debounced save function
  const saveChanges = useCallback(
    async (updates: Partial<Event>) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(async () => {
        // For new events, require title and slug before saving
        if (!hasCreatedRef.current) {
          if (!updates.title && !event.title) return
          if (!updates.slug && !event.slug) {
            // Auto-generate slug from title
            const title = updates.title || event.title || ''
            updates.slug = title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim()
          }
        }

        setIsSaving(true)
        setError(null)

        try {
          const mergedEvent = { ...event, ...updates }

          if (hasCreatedRef.current && initialEvent) {
            // Update existing event
            const response = await fetch(`/api/admin/events/${initialEvent.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates),
            })

            if (!response.ok) {
              const data = await response.json()
              throw new Error(data.error?.message || 'Failed to save')
            }

            setLastSaved(new Date())
          } else {
            // Create new event
            const response = await fetch('/api/admin/events', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...mergedEvent,
                fullDescription: mergedEvent.fullDescription || null,
                thumbnailUrl: mergedEvent.thumbnailUrl || null,
                thumbnailAlt: mergedEvent.thumbnailAlt || null,
                contentImages:
                  mergedEvent.contentImages && mergedEvent.contentImages.length > 0
                    ? mergedEvent.contentImages
                    : null,
                eventDate: mergedEvent.eventDate || null,
              }),
            })

            if (!response.ok) {
              const data = await response.json()
              throw new Error(data.error?.message || 'Failed to create')
            }

            const newEvent = await response.json()
            hasCreatedRef.current = true
            // Redirect to edit page for the new event
            router.replace(`/admin/events/${newEvent.id}`)
            setLastSaved(new Date())
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to save')
        } finally {
          setIsSaving(false)
        }
      }, 500) // 500ms debounce
    },
    [event, initialEvent, router]
  )

  const handleUpdate = (updates: Partial<Event>) => {
    setEvent((prev) => ({ ...prev, ...updates }))
    saveChanges(updates)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/events"
            className="text-[#0720ff] font-semibold hover:underline inline-flex items-center gap-1 text-sm mb-2"
          >
            ← Back to Events
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Create New Event' : 'Edit Event'}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Click any text to edit. Changes are saved automatically.
          </p>
        </div>

        {/* Save Status */}
        <div className="flex items-center gap-3">
          {error && (
            <span className="text-red-600 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </span>
          )}
          {isSaving && (
            <span className="text-[#0720ff] text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#0720ff]/30 border-t-[#0720ff] rounded-full animate-spin" />
              Saving...
            </span>
          )}
          {!isSaving && lastSaved && !error && (
            <span className="text-green-600 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Saved
            </span>
          )}
        </div>
      </div>

      {/* Section 1: Card Preview */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#0720ff] text-white rounded-full flex items-center justify-center text-sm">
            1
          </span>
          Event Card Preview
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This is how the event appears in listings. Click to edit or toggle options.
        </p>
        <EditableEventCard event={event} onUpdate={handleUpdate} />
      </div>

      {/* Section 2: Settings */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#0720ff] text-white rounded-full flex items-center justify-center text-sm">
            2
          </span>
          Event Settings
        </h2>
        <EventSettingsPanel event={event} onUpdate={handleUpdate} />
      </div>

      {/* Section 3: Page Preview */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#0720ff] text-white rounded-full flex items-center justify-center text-sm">
            3
          </span>
          Event Detail Page
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This is how the full event page appears. Edit the title, description, and gallery.
        </p>
        <EventPagePreview event={event} onUpdate={handleUpdate} />
      </div>

      {/* View Live Link (for edit mode) */}
      {mode === 'edit' && event.slug && (
        <div className="flex justify-center pt-4">
          <Link
            href={`/events/${event.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-[#0720ff] font-semibold hover:underline"
          >
            View Live Page
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
