import Link from 'next/link';

export default function DonationWidget() {
  return (
    <div className="bg-[#0720ff] px-4 py-5 sm:py-6 rounded-lg">
      <p className="text-white text-sm sm:text-base mb-4 sm:mb-5 text-center">
        $20 a month sponsors a meal for a family of 5.
      </p>
      <div className="bg-[#e1e2f8] rounded-md px-4 sm:px-5 py-3 sm:py-4 mb-4 sm:mb-5 flex items-center justify-between">
        <span className="text-[#1a2df3] text-xl sm:text-2xl font-medium">$ 20</span>
        <span className="text-[#1a2df3] text-lg sm:text-xl font-medium">USD</span>
      </div>
      <Link 
        href="/donate"
        className="block w-full bg-black text-white py-3.5 rounded-full font-medium hover:bg-gray-900 active:bg-gray-800 transition-colors text-sm tracking-wide text-center"
      >
        DONATE
      </Link>
    </div>
  );
}

