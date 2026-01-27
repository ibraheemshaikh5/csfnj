import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import EventDetailClient from './EventDetailClient';
import type { Metadata } from 'next';
import { getEventBySlug, getAllEventSlugs } from '@/db/queries';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found - Care & Share Foundation',
    };
  }

  return {
    title: `${event.title} - Care & Share Foundation`,
    description: event.description,
  };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

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
          <EventDetailClient slug={slug} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">{event.title}</h1>

          {/* Thumbnail Image */}
          {event.thumbnailUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 sm:mb-8">
              <Image
                src={event.thumbnailUrl}
                alt={event.thumbnailAlt || event.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {event.fullDescription || event.description}
            </p>

            {event.showDonateButton && (
              <div className="pt-4">
                <Link
                  href="/donate"
                  className="inline-block bg-[#0720ff] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0618dd] active:bg-[#0515b8] transition-colors shadow-md"
                >
                  Donate to Support This Event
                </Link>
              </div>
            )}
          </div>

          {/* Content Images Gallery */}
          {event.contentImages && event.contentImages.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Event Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {event.contentImages.map((imageUrl, index) => (
                  <div key={index} className="relative h-48 sm:h-56 rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${event.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
