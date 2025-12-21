import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Care & Share Foundation',
  description: 'Get in touch with Care & Share Foundation. Contact us for questions, donations, or volunteer opportunities.',
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="pt-16 pb-8 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2 pb-2 border-b-4 border-[#0720ff] inline-block mb-12">
            Contact
          </h1>
          <ContactForm />
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

