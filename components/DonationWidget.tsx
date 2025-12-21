import Link from 'next/link';

export default function DonationWidget() {
  return (
    <div className="bg-[#0720ff] px-4 py-6 rounded-lg">
      <p className="text-white text-base mb-5 text-center whitespace-nowrap mx-auto w-fit">
        $20 a month sponsors a meal for a family of 5.
      </p>
      <div className="bg-white rounded-md px-5 py-4 mb-5 flex items-center justify-between">
        <span className="text-[#0720ff] text-2xl font-medium">$ 20</span>
        <span className="text-[#0720ff] text-xl font-medium">USD</span>
      </div>
      <Link 
        href="/donate"
        className="block w-full bg-black text-white py-3.5 rounded-full font-medium hover:bg-gray-900 transition-colors text-sm tracking-wide text-center"
      >
        DONATE
      </Link>
    </div>
  );
}

