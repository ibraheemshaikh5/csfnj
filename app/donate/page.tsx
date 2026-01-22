import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZeffyDonationForm from '@/components/ZeffyDonationForm';
import PaymentCards from '@/components/PaymentCards';
import DonatePageClient from './DonatePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate - Care & Share Foundation',
  description: 'Support Care & Share Foundation with your donation. Help us continue serving the community.',
};

export default function Donate() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <DonatePageClient />
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 pb-2 border-b-4 border-[#0720ff] inline-block">
            Donate
          </h1>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 md:p-8">
            <ZeffyDonationForm />
          </div>
          <PaymentCards />
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

