import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import EventDetailClient from './EventDetailClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const eventTitles: Record<string, string> = {
    'food-packaging': 'Food Packaging Event - Care & Share Foundation',
    'ramadan-iftar': 'Ramadan Iftar 2025 - Care & Share Foundation',
  };

  return {
    title: eventTitles[params.slug] || 'Event - Care & Share Foundation',
    description: 'Learn more about this Care & Share Foundation event.',
  };
}

export default function EventDetail({ params }: { params: { slug: string } }) {
  const eventData: Record<string, { title: string; description: string; imageAlt: string }> = {
    'food-packaging': {
      title: 'Food Packaging Event',
      description: 'Every other week CSFNJ holds an event where volunteers package and distribute 750+ meals across central New Jersey! This is a bi-weekly event that brings together community members to prepare and package meals for those in need.',
      imageAlt: 'Food packaging event - Volunteers packaging meals',
    },
    'ramadan-iftar': {
      title: 'Ramadan 2025 Iftar',
      description: 'Ramadan 2025 CSFNJ is distributing 250 iftaar meals every Tuesday and Friday! CSFNJ is also hosting a clothing and toy drive for Eid. Donate now to help support this important initiative during the holy month.',
      imageAlt: 'Ramadan 2025 Iftar - 250 Iftar Meals',
    },
  };

  const event = eventData[params.slug] || {
    title: 'Event',
    description: 'Event details coming soon.',
    imageAlt: 'Event',
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="py-8 sm:py-12 md:py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/events"
            className="text-[#0720ff] font-semibold hover:underline inline-flex items-center gap-1 mb-4 sm:mb-6"
          >
            ← Back to Events
          </Link>
          <EventDetailClient slug={params.slug} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">{event.title}</h1>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
