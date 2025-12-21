import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DonationWidget from '@/components/DonationWidget';
import IconCard from '@/components/IconCard';
import VolunteerForm from '@/components/VolunteerForm';
import ImpactGrid from '@/components/ImpactGrid';
import EventCard from '@/components/EventCard';
import ActivityCard from '@/components/ActivityCard';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <Hero />

      {/* Help Support Our Community Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Food Homeless & Needy</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ur-needy volunteers in the Care & Share Foundation prepare and distribute 750+ meals to those in need in the greater New Jersey area. Help our foundation continue to provide aid with a monthly contribution.
              </p>
              <a
                href="#"
                className="text-[#1e3a8a] font-semibold hover:underline inline-flex items-center gap-1"
              >
                Learn More
                <span>→</span>
              </a>
            </div>
            <div className="w-full lg:w-80 flex-shrink-0">
              <DonationWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Changing Lives Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-12 bg-[#1e3a8a]"></div>
            <h2 className="text-3xl font-bold">Changing lives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <IconCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              }
              description="Our food is freshly prepared and packed right before delivery."
            />
            <IconCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5V14.25a1.125 1.125 0 00-1.125-1.125H3.375a1.125 1.125 0 00-1.125 1.125v3.375m0 0h.008v.008H3.375v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm16.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM8.25 4.5v9.75m0 0v-9.75m0 9.75H3.375a1.125 1.125 0 01-1.125-1.125V4.5m5.25 0h8.25m-8.25 0H3.375a1.125 1.125 0 00-1.125 1.125v9.75m11.25-9.75v9.75m0-9.75h8.25m-8.25 0h5.625c.621 0 1.125.504 1.125 1.125v9.75m-11.25 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m11.25 0v4.5" />
                </svg>
              }
              description="Our volunteers deliver hundreds of meals across the state."
            />
            <IconCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              }
              description="Across New Jersey, many in need now have food on their plates."
            />
          </div>
        </div>
      </section>

      <VolunteerForm />

      <ImpactGrid />

      {/* Ongoing Events Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 pb-2 border-b-4 border-[#1e3a8a] inline-block">
            Ongoing Events
          </h2>
          <div className="mt-12 space-y-8">
            <EventCard
              image=""
              imageAlt="Food packaging event - Volunteers packaging meals"
              description="Every other week CSFNJ holds an event where volunteers package and distribute 750+ meals across central New Jersey!"
              learnMoreLink="#"
              showDonateButton={true}
            />
            <EventCard
              image=""
              imageAlt="Ramadan 2025 Iftar - 250 Iftar Meals"
              description="Ramadan 2025 CSFNJ is distributing 250 iftaar meals every Tuesday and Friday! CSFNJ is also hosting a clothing and toy drive for Eid. Donate now to help!"
              showDonateButton={true}
            />
          </div>
        </div>
      </section>

      {/* Things We Have Done Recently Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 pb-2 border-b-4 border-[#1e3a8a] inline-block">
            Things We Have Done Recently
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ActivityCard
              image=""
              imageAlt="Ramadan Care 2025 - Care packages distribution"
              title="Ramadan Care 2025"
              description="Distributed care packages to families in need during Ramadan 2025, ensuring they have essential groceries and supplies for the holy month."
              learnMoreLink="#"
            />
            <ActivityCard
              image=""
              imageAlt="Grocery Pantries/Distributions - Fresh produce"
              title="Grocery Pantries/Distributions"
              description="Organized multiple grocery distribution events, providing fresh produce and essential food items to families across Central New Jersey."
              learnMoreLink="#"
            />
            <ActivityCard
              image=""
              imageAlt="Eid Giveaway 2024 - Celebration event"
              title="Eid Giveaway 2024"
              description="Celebrated Eid with our community by organizing a special giveaway event, bringing joy and essential items to families during the festive season."
              learnMoreLink="#"
            />
            <ActivityCard
              image=""
              imageAlt="Refugee Donation Drives - Community support"
              title="Refugee Donation Drives"
              description="Conducted multiple donation drives to support refugee families, providing food, clothing, and essential supplies to help them settle in their new communities."
              learnMoreLink="#"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
