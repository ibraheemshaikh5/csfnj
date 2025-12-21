import Image from 'next/image';

interface IconCardProps {
  image: string;
  imageAlt: string;
  description: string;
}

export default function IconCard({ image, imageAlt, description }: IconCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div className="relative w-[140px] h-[140px] rounded-full bg-[#374af0] flex items-center justify-center">
        <div className="absolute -inset-12 flex items-center justify-center">
          <Image
            src={image}
            alt={imageAlt}
            width={350}
            height={350}
            className="object-contain"
          />
        </div>
      </div>
      <p className="text-gray-700 text-base max-w-xs leading-relaxed">{description}</p>
    </div>
  );
}

