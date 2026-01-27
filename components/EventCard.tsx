import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/db/schema';

type Props = {
  event: Event;
  showPinIcon?: boolean;
};

export default function EventCard({ event, showPinIcon = false }: Props) {
  return (
    <div className="relative flex flex-col md:flex-row gap-4 sm:gap-6 bg-white rounded-lg overflow-hidden shadow-md">
      {/* Pin Icon for pinned events */}
      {showPinIcon && event.isPinned && (
        <div className="absolute top-3 right-3 z-10 w-8 h-8 bg-[#0720ff] rounded-full flex items-center justify-center shadow-md" title="Pinned">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
      )}
      <div className="md:w-1/3 relative h-48 sm:h-64 md:h-auto bg-gray-200 flex items-center justify-center">
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
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center gap-3 sm:gap-4">
        <p className="text-gray-700 text-sm sm:text-base">{event.description}</p>
        <div className="flex gap-3 sm:gap-4 items-center justify-between">
          <Link
            href={`/events/${event.slug}`}
            className="text-[#0720ff] font-semibold hover:underline flex items-center gap-1 text-sm sm:text-base"
          >
            Learn More
            <span>→</span>
          </Link>
          {event.showDonateButton && (
            <Link
              href="/donate"
              className="bg-[#0720ff] text-white px-5 sm:px-8 py-2 sm:py-2.5 rounded-full font-semibold hover:bg-[#0618dd] active:bg-[#0515b8] transition-colors shadow-md text-sm sm:text-base"
            >
              Donate
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
