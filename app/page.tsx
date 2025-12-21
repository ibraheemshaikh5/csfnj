import HomeHeader from '@/components/HomeHeader';
import Carousel from '@/components/Carousel';
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
      <HomeHeader />
      
      <Carousel />

      {/* Help Support Our Community Section */}
      <section className="relative pb-8">
        {/* White Card Container - overlaps the carousel above */}
        <div className="relative z-20 -mt-32 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-stretch p-10 lg:p-12">
              {/* Left side - Text content */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm text-gray-500 mb-2">Help Support Our Community</p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">Feed Homeless & Needy</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Bi-weekly volunteers in the Care & Share Foundation prepare and distribute 750+ meals to those in need in the greater New Jersey area. Help our foundation continue to provide aid with a monthly contribution.
                </p>
                <a
                  href="/about"
                  className="text-[#0720ff] font-semibold hover:underline inline-flex items-center gap-1"
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
        <div className="absolute inset-x-0 bottom-0 top-32 bg-[#f7f7f7] -z-10"></div>
      </section>

      {/* Changing Lives Section */}
      <section className="pt-10 pb-20 px-4 bg-[#f7f7f7]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-1.5 h-14 bg-[#0720ff]"></div>
            <h2 className="text-4xl font-bold text-gray-900">Changing lives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IconCard
              image="/images/cooking-stickfigure.png"
              imageAlt="Chef cooking illustration"
              description="Our food is freshly prepared and packed right before delivery."
            />
            <IconCard
              image="/images/delivery-truck.png"
              imageAlt="Delivery truck illustration"
              description="Our volunteers deliver hundreds of meals across the state."
            />
            <IconCard
              image="/images/happy-family.png"
              imageAlt="Happy family illustration"
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
          <h2 className="text-3xl font-bold mb-2 pb-2 border-b-4 border-[#0720ff] inline-block">
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
      <section className="py-16 px-4 bg-[#f7f7f7]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-2 pb-2 border-b-4 border-[#0720ff] inline-block">
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
