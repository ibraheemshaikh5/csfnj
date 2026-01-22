export default function ImpactGrid() {
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

  return (
    <section className="pt-0 pb-8 px-4 bg-[#f7f7f7]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold pb-2 border-b-4 border-[#0720ff] inline-block">
            Your Donations at Work
          </h2>
        </div>

        {/* Mobile: Card Grid Layout */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {allItems.map((item, index) => (
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

