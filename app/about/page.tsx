import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Care & Share Foundation',
  description: 'Learn about Care & Share Foundation and our mission to serve the community.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">About Us</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              Content for About page will go here.
            </p>
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
