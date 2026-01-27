'use client'

import { useState, useEffect } from 'react'
import type { Event } from '@/db/schema'

type Props = {
  event: Partial<Event> & { slug?: string; title?: string }
  onUpdate: (updates: Partial<Event>) => void
}

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming', description: 'Shows on events listing page' },
  { value: 'ongoing', label: 'Ongoing', description: 'Shows in "Ongoing Events" on home page' },
  { value: 'recent', label: 'Recent', description: 'Shows in "Recent Events" on home page' },
  { value: 'past', label: 'Past', description: 'Archived, not displayed' },
]

export default function EventSettingsPanel({ event, onUpdate }: Props) {
  const [slug, setSlug] = useState(event.slug || '')

  useEffect(() => {
    setSlug(event.slug || '')
  }, [event.slug])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSlugChange = (value: string) => {
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
    setSlug(cleanSlug)
  }

  const handleSlugBlur = () => {
    if (slug !== event.slug) {
      onUpdate({ slug })
    }
  }

  const handleAutoSlug = () => {
    if (event.title) {
      const newSlug = generateSlug(event.title)
      setSlug(newSlug)
      onUpdate({ slug: newSlug })
    }
  }

  const formatDateForInput = (date: Date | string | null | undefined) => {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toISOString().slice(0, 16)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={event.status || 'upcoming'}
            onChange={(e) => onUpdate({ status: e.target.value })}
            className="w-full bg-[#e1e2f8] text-[#1a2df3] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#1a2df3] outline-none text-sm"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            {statusOptions.find((opt) => opt.value === event.status)?.description ||
              statusOptions[0].description}
          </p>
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Order
          </label>
          <input
            type="number"
            min="0"
            value={event.displayOrder || 0}
            onChange={(e) =>
              onUpdate({ displayOrder: parseInt(e.target.value) || 0 })
            }
            className="w-full bg-[#e1e2f8] text-[#1a2df3] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#1a2df3] outline-none text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <input
            type="datetime-local"
            value={formatDateForInput(event.eventDate)}
            onChange={(e) =>
              onUpdate({ eventDate: e.target.value ? new Date(e.target.value) : null })
            }
            className="w-full bg-[#e1e2f8] text-[#1a2df3] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#1a2df3] outline-none text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Optional event date/time</p>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Slug
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              onBlur={handleSlugBlur}
              className="flex-1 bg-[#e1e2f8] text-[#1a2df3] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#1a2df3] outline-none text-sm"
              placeholder="event-slug"
            />
            <button
              type="button"
              onClick={handleAutoSlug}
              className="px-2 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              title="Auto-generate from title"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            /events/{slug || 'event-slug'}
          </p>
        </div>
      </div>
    </div>
  )
}
