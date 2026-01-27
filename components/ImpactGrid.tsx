'use client';

import { useState } from 'react';

type ImpactItem = {
  id: number;
  heading: string;
  description: string[];
  displayOrder: number;
};

type Props = {
  items: ImpactItem[];
};

export default function ImpactGrid({ items }: Props) {
  const [showAll, setShowAll] = useState(false);

  // Group items into rows of 3 for desktop table layout
  const tableData: ImpactItem[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    tableData.push(items.slice(i, i + 3));
  }

  // For mobile, show first 4 items unless showAll is true
  const mobileItems = showAll ? items : items.slice(0, 4);

  return (
    <section className="pt-0 pb-8 px-4 bg-[#f7f7f7]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-bold pb-2 border-b-4 border-[#0720ff] inline-block">
            Your Donations at Work
          </h2>
        </div>

        {/* Mobile: Card Grid Layout with Show More */}
        <div className="mt-8 sm:mt-12 md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mobileItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-base mb-2 text-gray-900">{item.heading}</h3>
                {item.description.map((desc, descIndex) => (
                  <p key={descIndex} className="text-gray-700 text-sm mb-1 last:mb-0">
                    {desc}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* See All / Show Less Button */}
          {items.length > 4 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 text-[#0720ff] font-semibold hover:underline active:text-[#0618dd] transition-colors"
              >
                {showAll ? (
                  <>
                    Show Less
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    See All Impact ({items.length - 4} more)
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Desktop: Table Layout */}
        <div className="mt-12 overflow-x-auto hidden md:block">
          <table className="w-full border-collapse">
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell) => (
                    <td key={cell.id} className="p-6 align-top">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{cell.heading}</h3>
                      {cell.description.map((desc, descIndex) => (
                        <p key={descIndex} className="text-gray-700 text-sm mb-1 last:mb-0">
                          {desc}
                        </p>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
