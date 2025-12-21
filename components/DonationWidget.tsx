export default function DonationWidget() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600 mb-2">
        $20 a month sponsors a meal for a family of 5.
      </p>
      <div className="bg-[#1e3a8a] p-4 rounded-lg">
        <div className="bg-white rounded p-3 mb-3 flex items-center justify-between">
          <input
            type="text"
            value="$20"
            readOnly
            className="text-lg font-semibold outline-none flex-1"
          />
          <select className="bg-transparent border-none outline-none text-gray-600">
            <option>USD</option>
          </select>
        </div>
        <button className="w-full bg-[#1e3a8a] text-white py-3 rounded font-semibold hover:bg-[#1e40af] transition-colors border-2 border-white">
          DONATE
        </button>
      </div>
    </div>
  );
}

