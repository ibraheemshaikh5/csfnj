import Link from 'next/link'
import { db } from '@/db'
import { impactItems, events } from '@/db/schema'

export default async function AdminDashboard() {
  const [impactCount, eventsCount] = await Promise.all([
    db.select().from(impactItems).then((r) => r.length),
    db.select().from(events).then((r) => r.length),
  ])

  const stats = [
    {
      label: 'Impact Items',
      count: impactCount,
      href: '/admin/impact-items',
      description: '"Your Donations at Work" section',
    },
    {
      label: 'Events',
      count: eventsCount,
      href: '/admin/events',
      description: 'Ongoing, recent, and upcoming events',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {stat.label}
              </h2>
              <span className="text-3xl font-bold text-[#0720ff]">
                {stat.count}
              </span>
            </div>
            <p className="text-sm text-gray-500">{stat.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/impact-items"
            className="bg-[#0720ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0618dd] transition-colors shadow-md text-sm"
          >
            Edit Impact Items
          </Link>
          <Link
            href="/admin/events/new"
            className="bg-[#0720ff] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0618dd] transition-colors shadow-md text-sm"
          >
            + New Event
          </Link>
        </div>
      </div>
    </div>
  )
}
