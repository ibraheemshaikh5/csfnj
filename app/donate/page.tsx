import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonationWidget from '@/components/DonationWidget';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate - Care & Share Foundation',
  description: 'Support Care & Share Foundation with your donation. Help us continue serving the community.',
};

export default function Donate() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-12 text-gray-900">Donate</h1>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Support Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Your generous donations help us continue our mission to serve those in need in the greater New Jersey area. 
                Every contribution makes a difference in the lives of families and individuals we support.
              </p>
              <p className="text-gray-700 leading-relaxed">
                $20 a month sponsors a meal for a family of 5. Your ongoing support allows us to prepare and distribute 
                750+ meals bi-weekly to those in need.
              </p>
            </div>
            <div className="w-full lg:w-[420px] flex-shrink-0">
              <DonationWidget />
            </div>
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
