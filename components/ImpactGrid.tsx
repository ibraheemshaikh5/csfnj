interface ImpactItem {
  title: string;
  description: string;
}

const impactItems: ImpactItem[] = [
  { title: 'Funeral Assistance', description: 'Provide respectful funeral services to needy Muslims free of cost.' },
  { title: 'Food the Hungry', description: '750+ meals distributed regularly to those in need across New Jersey.' },
  { title: 'Zakat Distribution', description: 'Organized zakat distribution to eligible recipients in the community.' },
  { title: 'Ramadan Care Packages', description: 'Groceries distributed to needy Muslims in Central NJ prior to Ramadan.' },
  { title: 'Iftaar', description: '250 iftaar meals distributed every Tuesday and Friday during Ramadan.' },
  { title: 'Meat Distribution', description: 'Regular meat distribution programs for families in need.' },
  { title: 'Eid Basket/Fitrah', description: 'Eid baskets and fitrah distributed to community members.' },
  { title: 'Eid Clothing Drive', description: 'Clothing drives organized for Eid celebrations.' },
  { title: 'Eid Toy Drive', description: 'Toy drives to bring joy to children during Eid.' },
  { title: 'Furniture Give Away', description: 'Furniture donations provided to families in need.' },
  { title: 'Cars Donated', description: 'Vehicles donated to help community members with transportation.' },
  { title: 'Winter/Hygiene Drive', description: 'Winter essentials and hygiene products distributed to those in need.' },
];

export default function ImpactGrid() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Your Donations at Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactItems.map((item, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2 text-[#0620ff]">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

