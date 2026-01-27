import { db } from './index'
import { impactItems, events } from './schema'

const impactSeedData = [
  {
    heading: 'Funeral Assistance',
    description: ['Helped 97 families in need with Funeral Services', '96 Muslims & 1 Non-Muslim'],
    displayOrder: 1,
  },
  {
    heading: 'Feed the Hungry',
    description: ['66,690+ meals served during Bi-Weekly distribution'],
    displayOrder: 2,
  },
  {
    heading: 'Zakat Distribution',
    description: ['265+ families including refugees from Afghanistan and Syria received financial assistance from Zakat funds'],
    displayOrder: 3,
  },
  {
    heading: 'Ramadan Care Packages',
    description: ['1,883 Care packages distributed to underprivileged Muslims before Ramadan', '($175 retail value each)'],
    displayOrder: 4,
  },
  {
    heading: 'Iftaar',
    description: ['8,029 Iftaars distributed to economically distressed Muslims', '(Includes dates, fruits, desert, juice, etc.)'],
    displayOrder: 5,
  },
  {
    heading: 'Meat Distribution',
    description: ['8,000 lbs of Qurbani/Udhiya meat', '5,000+ of non-Qurbani halal meat distributed to Zakaat eligible families'],
    displayOrder: 6,
  },
  {
    heading: 'Eid Basket / Fitrah',
    description: ['462 Families received Eid baskets, grains, gift cards, goodie bags, halal perfume', '(Valued from $110 to $210)'],
    displayOrder: 7,
  },
  {
    heading: 'Eid Clothing Drive',
    description: ['2,000+ pcs of brand new clothing distributed to deserving Muslim families'],
    displayOrder: 8,
  },
  {
    heading: 'Eid Toy Drive',
    description: ['62,500+ financially challenged Muslim children received brand new toys for Eid'],
    displayOrder: 9,
  },
  {
    heading: 'Furniture Give Away',
    description: ['325+ families in low income group received furniture, household essentials, & small appliances'],
    displayOrder: 10,
  },
  {
    heading: 'Cars Donated',
    description: ['9 used (well maintained) cars donated to needy muslims'],
    displayOrder: 11,
  },
  {
    heading: 'Winter/Hygiene Drive',
    description: ['490 Jackets, 75 Sleeping Bags, 200 Hygiene packs, 200,000 masks, 50,000 sanitizers donated'],
    displayOrder: 12,
  },
]

const eventSeedData = [
  // Ongoing events
  {
    slug: 'food-packaging',
    title: 'Food Packaging Event',
    description: 'Every other week CSFNJ holds an event where volunteers package and distribute 750+ meals across central New Jersey!',
    fullDescription: 'Join our bi-weekly food packaging event where dedicated volunteers come together to prepare and distribute over 750 meals to families in need across central New Jersey. This ongoing initiative is at the heart of our mission to fight hunger in our community.',
    thumbnailAlt: 'Food packaging event - Volunteers packaging meals',
    status: 'ongoing',
    isPinned: false,
    showDonateButton: true,
    displayOrder: 1,
  },
  {
    slug: 'ramadan-iftar',
    title: 'Ramadan 2025 Iftar',
    description: 'Ramadan 2025 CSFNJ is distributing 250 iftaar meals every Tuesday and Friday! CSFNJ is also hosting a clothing and toy drive for Eid. Donate now to help!',
    fullDescription: 'During Ramadan 2025, Care & Share Foundation NJ is distributing 250 iftaar meals every Tuesday and Friday to help our community break their fast. We are also hosting a clothing and toy drive to ensure families can celebrate Eid with dignity and joy.',
    thumbnailAlt: 'Ramadan 2025 Iftar - 250 Iftar Meals',
    status: 'ongoing',
    isPinned: true,
    showDonateButton: true,
    displayOrder: 2,
  },
  // Recent events
  {
    slug: 'ramadan-care-2025',
    title: 'Ramadan Care 2025',
    description: 'Distributed care packages to families in need during Ramadan 2025, ensuring they have essential groceries and supplies for the holy month.',
    fullDescription: 'Our Ramadan Care 2025 initiative successfully distributed care packages to families in need, ensuring they have essential groceries and supplies throughout the holy month of Ramadan.',
    thumbnailAlt: 'Ramadan Care 2025 - Care packages distribution',
    status: 'recent',
    isPinned: false,
    showDonateButton: false,
    displayOrder: 1,
  },
  {
    slug: 'grocery-distributions',
    title: 'Grocery Pantries/Distributions',
    description: 'Organized multiple grocery distribution events, providing fresh produce and essential food items to families across Central New Jersey.',
    fullDescription: 'Our grocery distribution events provide fresh produce and essential food items to families across Central New Jersey, helping to ensure food security in our community.',
    thumbnailAlt: 'Grocery Pantries/Distributions - Fresh produce',
    status: 'recent',
    isPinned: false,
    showDonateButton: false,
    displayOrder: 2,
  },
  {
    slug: 'eid-giveaway-2024',
    title: 'Eid Giveaway 2024',
    description: 'Celebrated Eid with our community by organizing a special giveaway event, bringing joy and essential items to families during the festive season.',
    fullDescription: 'Our Eid Giveaway 2024 brought joy to families during the festive season with gifts, clothing, and essential items for children and adults alike.',
    thumbnailAlt: 'Eid Giveaway 2024 - Celebration event',
    status: 'recent',
    isPinned: false,
    showDonateButton: false,
    displayOrder: 3,
  },
  {
    slug: 'refugee-donation-drives',
    title: 'Refugee Donation Drives',
    description: 'Conducted multiple donation drives to support refugee families, providing food, clothing, and essential supplies to help them settle in their new communities.',
    fullDescription: 'Our refugee donation drives provide food, clothing, and essential supplies to help refugee families settle into their new communities with dignity and support.',
    thumbnailAlt: 'Refugee Donation Drives - Community support',
    status: 'recent',
    isPinned: false,
    showDonateButton: false,
    displayOrder: 4,
  },
]

async function seed() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await db.delete(impactItems)
  await db.delete(events)

  // Insert impact items
  await db.insert(impactItems).values(impactSeedData)
  console.log('✅ Seeded', impactSeedData.length, 'impact items')

  // Insert events
  await db.insert(events).values(eventSeedData)
  console.log('✅ Seeded', eventSeedData.length, 'events')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
