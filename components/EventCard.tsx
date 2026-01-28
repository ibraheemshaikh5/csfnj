import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/db/schema';

type Props = {
  event: Event;
  showPinIcon?: boolean;
};

export default function EventCard({ event, showPinIcon = false }: Props) {
  return (
    <div className="relative">
      {/* Pin Icon for pinned events - positioned outside card */}
      {showPinIcon && event.isPinned && (
        <div className="absolute -top-3 -left-3 z-20 w-10 h-10 bg-[#0720ff] rounded-full flex items-center justify-center shadow-lg" title="Pinned">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
          </svg>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 bg-white rounded-lg overflow-hidden shadow-md">
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
    </div>
  );
}
