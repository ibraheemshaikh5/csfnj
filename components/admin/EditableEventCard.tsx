'use client'

import EditableText from './EditableText'
import InlineImageUploader from './InlineImageUploader'
import type { Event } from '@/db/schema'

type Props = {
  event: Partial<Event> & { title?: string; description?: string }
  onUpdate: (updates: Partial<Event>) => void
}

export default function EditableEventCard({ event, onUpdate }: Props) {
  return (
    <div className="relative flex flex-col md:flex-row gap-4 sm:gap-6 bg-white rounded-lg overflow-hidden shadow-md">
      {/* Toggle Controls - Top Right */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {/* Pinned Toggle */}
        <label
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
            event.isPinned
              ? 'bg-[#0720ff] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <input
            type="checkbox"
            checked={event.isPinned || false}
            onChange={(e) => onUpdate({ isPinned: e.target.checked })}
            className="sr-only"
          />
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
          </svg>
          Pinned
        </label>

        {/* Donate Toggle */}
        <label
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
            event.showDonateButton
              ? 'bg-[#0720ff] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <input
            type="checkbox"
            checked={event.showDonateButton || false}
            onChange={(e) => onUpdate({ showDonateButton: e.target.checked })}
            className="sr-only"
          />
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Donate
        </label>
      </div>

      {/* Left side - Thumbnail */}
      <div className="md:w-1/3 relative h-48 sm:h-64 md:h-auto min-h-[200px]">
        <InlineImageUploader
          value={event.thumbnailUrl || ''}
          onChange={(url) => onUpdate({ thumbnailUrl: url })}
          className="h-full w-full absolute inset-0"
          placeholderText="Click to upload thumbnail"
        />
      </div>

      {/* Right side - Content */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center gap-3 sm:gap-4 pt-12 md:pt-4">
        <p className="text-gray-700 text-sm sm:text-base">
          <EditableText
            value={event.description || ''}
            onSave={(value) => onUpdate({ description: value })}
            placeholder="Enter short description for event cards..."
            multiline
            rows={2}
          />
        </p>
        <div className="flex gap-3 sm:gap-4 items-center justify-between">
          <span className="text-[#0720ff] font-semibold flex items-center gap-1 text-sm sm:text-base">
            Learn More
            <span>→</span>
          </span>
          {event.showDonateButton && (
            <span className="bg-[#0720ff] text-white px-5 sm:px-8 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base">
              Donate
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
