import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Care & Share Foundation',
  description: 'Get in touch with Care & Share Foundation. Contact us for questions, donations, or volunteer opportunities.',
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="py-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-12 text-gray-900">Contact Us</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Get in Touch</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Phone:</strong> (908)-360-5076
                </p>
                <p>
                  <strong>Address:</strong><br />
                  100 Plainfield Ave, Suite B3<br />
                  Edison, New Jersey 08817
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-700">
                Content for contact form or additional information will go here.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
