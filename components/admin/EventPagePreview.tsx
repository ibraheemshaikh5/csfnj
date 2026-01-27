'use client'

import Image from 'next/image'
import EditableText from './EditableText'
import MultiImageUploader from './MultiImageUploader'
import type { Event } from '@/db/schema'

type Props = {
  event: Partial<Event> & { title?: string }
  onUpdate: (updates: Partial<Event>) => void
}

export default function EventPagePreview({ event, onUpdate }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-[#e1e2f8] px-6 py-3 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-[#0720ff]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span className="text-[#0720ff] font-medium text-sm">
          Event Detail Page Preview
        </span>
      </div>

      {/* Preview Content */}
      <div className="p-6 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto">
          {/* Back link preview */}
          <span className="text-[#0720ff] font-semibold inline-flex items-center gap-1 mb-4 text-sm opacity-50">
            ← Back to Events
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            <EditableText
              value={event.title || ''}
              onSave={(value) => onUpdate({ title: value })}
              placeholder="Enter event title..."
              className="text-2xl sm:text-3xl font-bold"
            />
          </h1>

          {/* Thumbnail Image - Read-only preview */}
          {event.thumbnailUrl && (
            <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-6 bg-gray-200">
              <Image
                src={event.thumbnailUrl}
                alt={event.thumbnailAlt || event.title || 'Event thumbnail'}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Thumbnail Alt Text */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Thumbnail Alt Text (for accessibility)
            </label>
            <EditableText
              value={event.thumbnailAlt || ''}
              onSave={(value) => onUpdate({ thumbnailAlt: value })}
              placeholder="Enter image description for accessibility..."
              className="text-sm text-gray-600"
            />
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Full Description
              </label>
              <p className="text-gray-700 text-base leading-relaxed">
                <EditableText
                  value={event.fullDescription || ''}
                  onSave={(value) => onUpdate({ fullDescription: value })}
                  placeholder="Enter detailed description for the event page... (Leave empty to use short description)"
                  multiline
                  rows={5}
                  className="text-base"
                />
              </p>
            </div>

            {event.showDonateButton && (
              <div className="pt-4">
                <span className="inline-block bg-[#0720ff] text-white px-8 py-3 rounded-full font-semibold opacity-50">
                  Donate to Support This Event
                </span>
              </div>
            )}
          </div>

          {/* Gallery Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Event Gallery</h2>
            <MultiImageUploader
              values={Array.isArray(event.contentImages) ? event.contentImages : []}
              onChange={(urls) => onUpdate({ contentImages: urls })}
            />
            {(!event.contentImages || event.contentImages.length === 0) && (
              <p className="text-sm text-gray-500 mt-2">
                Add images to create a gallery on the event detail page.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
