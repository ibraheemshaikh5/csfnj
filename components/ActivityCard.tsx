import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/db/schema';

type Props = {
  event: Event;
};

export default function ActivityCard({ event }: Props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        {event.thumbnailUrl ? (
          <Image
            src={event.thumbnailUrl}
            alt={event.thumbnailAlt || event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="text-gray-500 text-sm text-center px-4">
            {event.thumbnailAlt || event.title}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-[#0720ff]">{event.title}</h3>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <Link
          href={`/events/${event.slug}`}
          className="text-[#0720ff] font-semibold hover:underline inline-flex items-center gap-1"
        >
          Learn More
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
