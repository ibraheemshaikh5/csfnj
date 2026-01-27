import HomeHeader from '@/components/HomeHeader';
import Carousel from '@/components/Carousel';
import DonationWidget from '@/components/DonationWidget';
import ChangingLivesCarousel from '@/components/ChangingLivesCarousel';
import VolunteerForm from '@/components/VolunteerForm';
import ImpactGrid from '@/components/ImpactGrid';
import EventCard from '@/components/EventCard';
import ActivityCard from '@/components/ActivityCard';
import Footer from '@/components/Footer';
import { getImpactItems, getOngoingEvents, getRecentEvents } from '@/db/queries';

export default async function Home() {
  const [impactItems, ongoingEvents, recentEvents] = await Promise.all([
    getImpactItems(),
    getOngoingEvents(),
    getRecentEvents(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />

      <Carousel />

      {/* Help Support Our Community Section */}
      <section className="relative pb-4 sm:pb-8">
        {/* White Card Container - overlaps the carousel above */}
        <div className="relative z-20 -mt-12 sm:-mt-24 md:-mt-32 px-3 sm:px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-12 items-stretch p-4 sm:p-8 lg:p-12">
              {/* Left side - Text content */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-1 sm:mb-2">Help Support Our Community</p>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-6 text-gray-900 leading-tight">Feed Homeless & Needy</h2>
                {/* Mobile: Shorter description */}
                <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:hidden">
                  Help our foundation continue to provide 750+ meals bi-weekly to those in need with a monthly contribution.
                </p>
                {/* Desktop: Full description */}
                <p className="text-gray-600 mb-8 leading-relaxed text-base hidden sm:block">
                  Bi-weekly volunteers in the Care & Share Foundation prepare and distribute 750+ meals to those in need in the greater New Jersey area. Help our foundation continue to provide aid with a monthly contribution.
                </p>
                <a
                  href="/about"
                  className="text-[#0720ff] font-semibold hover:underline inline-flex items-center gap-1 text-sm"
                >
                  Learn More <span>›</span>
                </a>
              </div>

              {/* Right side - Donation Widget */}
              <div className="w-full lg:w-[380px] flex-shrink-0">
                <DonationWidget />
              </div>
            </div>
          </div>
        </div>
        {/* Grey background fills the space below the card */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[#f7f7f7] -z-10"></div>
      </section>

      {/* Changing Lives Section */}
      <section className="pt-4 sm:pt-10 pb-8 sm:pb-16 md:pb-20 px-4 bg-[#f7f7f7]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-12 md:mb-16">
            <div className="w-1 sm:w-1.5 h-8 sm:h-14 bg-[#0720ff]"></div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">Changing lives</h2>
          </div>
          <ChangingLivesCarousel />
        </div>
      </section>

      <VolunteerForm />

      <ImpactGrid items={impactItems} />

      {/* Ongoing Events Section */}
      {ongoingEvents.length > 0 && (
        <section className="pt-4 sm:pt-8 pb-0 px-4 bg-[#f7f7f7]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 pb-2 border-b-4 border-[#0720ff] inline-block">
              Ongoing Events
            </h2>
            <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
              {ongoingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Events Section */}
      {recentEvents.length > 0 && (
        <section className="pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-4 bg-[#f7f7f7]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 pb-2 border-b-4 border-[#0720ff] inline-block">
              Recent Events
            </h2>
            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {recentEvents.map((event) => (
                <ActivityCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer className="mt-auto" />
    </div>
  );
}
