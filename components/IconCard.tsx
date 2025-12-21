import { ReactNode } from 'react';

interface IconCardProps {
  icon: ReactNode;
  description: string;
}

export default function IconCard({ icon, description }: IconCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-24 h-24 rounded-full bg-[#e9d5ff] flex items-center justify-center">
        <div className="text-[#6b21a8]">
          {icon}
        </div>
      </div>
      <p className="text-gray-700 max-w-xs">{description}</p>
    </div>
  );
}

