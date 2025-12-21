import Link from 'next/link';

interface ActivityCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  learnMoreLink?: string;
}

export default function ActivityCard({
  image,
  imageAlt,
  title,
  description,
  learnMoreLink,
}: ActivityCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500 text-sm text-center px-4">
          {imageAlt}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-[#1e3a8a]">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        {learnMoreLink && (
          <Link
            href={learnMoreLink}
            className="text-[#1e3a8a] font-semibold hover:underline inline-flex items-center gap-1"
          >
            Learn More
            <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

