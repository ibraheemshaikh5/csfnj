'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import type { Event } from '@/db/schema'

const statusColors: Record<string, string> = {
  ongoing: 'bg-green-100 text-green-800',
  recent: 'bg-blue-100 text-blue-800',
  upcoming: 'bg-yellow-100 text-yellow-800',
  past: 'bg-gray-100 text-gray-800',
}

export default function EventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setError(null)
      const response = await fetch('/api/admin/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      } else {
        setError('Failed to load events. Please try again.')
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
      setError('Failed to load events. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/events/${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== deleteId))
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => {
            setIsLoading(true)
            fetchEvents()
          }}
          className="px-4 py-2 bg-[#0720ff] text-white rounded-full font-semibold hover:bg-[#0618dd] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <Link
          href="/admin/events/new"
          className="bg-[#0720ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0618dd] transition-colors shadow-md text-sm"
        >
          + New Event
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#e1e2f8]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0720ff]">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0720ff]">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0720ff]">
                Pinned
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0720ff]">
                Order
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-[#0720ff]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-500">/events/{event.slug}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      statusColors[event.status] || statusColors.upcoming
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {event.isPinned ? (
                    <span className="inline-flex items-center gap-1 text-[#0720ff]">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-700">{event.displayOrder}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/events/${event.slug}`}
                    target="_blank"
                    className="inline-block px-3 py-2 text-sm text-gray-600 hover:text-[#0720ff] transition-colors"
                    title="View on site"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                  <Link
                    href={`/admin/events/${event.id}`}
                    className="inline-block px-4 py-2 text-sm bg-[#0720ff] text-white rounded-full font-semibold hover:bg-[#0618dd] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteId(event.id)}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No events found.{' '}
            <Link
              href="/admin/events/new"
              className="text-[#0720ff] hover:underline"
            >
              Create one
            </Link>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}
