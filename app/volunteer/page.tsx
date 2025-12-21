import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VolunteerForm from '@/components/VolunteerForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volunteer - Care & Share Foundation',
  description: 'Join Care & Share Foundation as a volunteer and make a difference in your community.',
};

export default function Volunteer() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <div className="flex-grow">
        <VolunteerForm />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

