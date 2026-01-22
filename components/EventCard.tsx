import Link from 'next/link';

interface EventCardProps {
  image: string;
  imageAlt: string;
  description: string;
  learnMoreLink?: string;
  showDonateButton?: boolean;
}

export default function EventCard({
  image,
  imageAlt,
  description,
  learnMoreLink,
  showDonateButton = true,
}: EventCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 bg-white rounded-lg overflow-hidden shadow-md">
      <div className="md:w-1/3 relative h-48 sm:h-64 md:h-auto bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500 text-sm text-center px-4">
          {imageAlt}
        </div>
      </div>
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center gap-3 sm:gap-4">
        <p className="text-gray-700 text-sm sm:text-base">{description}</p>
        <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-start sm:justify-between">
          {learnMoreLink && (
            <Link
              href={learnMoreLink}
              className="text-[#0720ff] font-semibold hover:underline flex items-center gap-1 text-sm sm:text-base"
            >
              Learn More
              <span>→</span>
            </Link>
          )}
          {showDonateButton && (
            <Link
              href="/donate"
              className="bg-[#0720ff] text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full font-semibold hover:bg-[#0618dd] transition-colors shadow-md sm:ml-auto text-sm sm:text-base"
            >
              Donate
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

