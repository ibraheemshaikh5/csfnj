'use client';

import { useState } from 'react';

export default function ImpactGrid() {
  const [showAll, setShowAll] = useState(false);

  const tableData = [
    [
      {
        heading: 'Funeral Assistance',
        description: ['Helped 97 families in need with Funeral Services', '96 Muslims & 1 Non-Muslim']
      },
      {
        heading: 'Feed the Hungry',
        description: ['66,690+ meals served during Bi-Weekly distribution']
      },
      {
        heading: 'Zakat Distribution',
        description: ['265+ families including refugees from Afghanistan and Syria received financial assistance from Zakat funds']
      }
    ],
    [
      {
        heading: 'Ramadan Care Packages',
        description: ['1,883 Care packages distributed to underprivileged Muslims before Ramadan', '($175 retail value each)']
      },
      {
        heading: 'Iftaar',
        description: ['8,029 Iftaars distributed to economically distressed Muslims', '(Includes dates, fruits, desert, juice, etc.)']
      },
      {
        heading: 'Meat Distribution',
        description: ['8,000 lbs of Qurbani/Udhiya meat', '5,000+ of non-Qurbani halal meat distributed to Zakaat eligible families']
      }
    ],
    [
      {
        heading: 'Eid Basket / Fitrah',
        description: ['462 Families received Eid baskets, grains, gift cards, goodie bags, halal perfume', '(Valued from $110 to $210)']
      },
      {
        heading: 'Eid Clothing Drive',
        description: ['2,000+ pcs of brand new clothing distributed to deserving Muslim families']
      },
      {
        heading: 'Eid Toy Drive',
        description: ['62,500+ financially challenged Muslim children received brand new toys for Eid']
      }
    ],
    [
      {
        heading: 'Furniture Give Away',
        description: ['325+ families in low income group received furniture, household essentials, & small appliances']
      },
      {
        heading: 'Cars Donated',
        description: ['9 used (well maintained) cars donated to needy muslims']
      },
      {
        heading: 'Winter/Hygiene Drive',
        description: ['490 Jackets, 75 Sleeping Bags, 200 Hygiene packs, 200,000 masks, 50,000 sanitizers donated']
      }
    ]
  ];

  // Flatten the table data for mobile card layout
  const allItems = tableData.flat();
  const mobileItems = showAll ? allItems : allItems.slice(0, 4);

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
            {mobileItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
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
                  See All Impact ({allItems.length - 4} more)
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Desktop: Table Layout */}
        <div className="mt-12 overflow-x-auto hidden md:block">
          <table className="w-full border-collapse">
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-6 align-top">
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
