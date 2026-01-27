import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import EventsPageClient from './EventsPageClient';
import type { Metadata } from 'next';
import { getAllEvents } from '@/db/queries';

// Don't cache this page - always fetch fresh data
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Events - Care & Share Foundation',
  description: 'View all upcoming and past events organized by Care & Share Foundation.',
};

export default async function Events() {
  const events = await getAllEvents();

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="py-8 sm:py-12 md:py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <EventsPageClient />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 pb-2 border-b-4 border-[#0720ff] inline-block">
            Events
          </h1>
          <div className="space-y-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} showPinIcon={true} />
            ))}
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
