import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events - Care & Share Foundation',
  description: 'View all upcoming and past events organized by Care & Share Foundation.',
};

export default function Events() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2 pb-2 border-b-4 border-[#0720ff] inline-block mb-12">
            Events
          </h1>
          <div className="space-y-8">
            <EventCard
              image=""
              imageAlt="Food packaging event - Volunteers packaging meals"
              description="Every other week CSFNJ holds an event where volunteers package and distribute 750+ meals across central New Jersey!"
              learnMoreLink="/events/food-packaging"
              showDonateButton={true}
            />
            <EventCard
              image=""
              imageAlt="Ramadan 2025 Iftar - 250 Iftar Meals"
              description="Ramadan 2025 CSFNJ is distributing 250 iftaar meals every Tuesday and Friday! CSFNJ is also hosting a clothing and toy drive for Eid. Donate now to help!"
              learnMoreLink="/events/ramadan-iftar"
              showDonateButton={true}
            />
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

