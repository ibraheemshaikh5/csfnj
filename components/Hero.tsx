
export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex flex-col lg:flex-row">
      {/* Left Side - Background Image with Overlay */}
      <div className="relative flex-1 min-h-[400px] lg:min-h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 z-0">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm opacity-50">
            Hero Background Image
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 lg:px-16 text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Care & Share Foundation
          </h1>
          <p className="text-lg lg:text-xl drop-shadow-md">
            Serving To Make A DIFFERENCE Where It Matters The Most.
          </p>
        </div>
      </div>

      {/* Right Side - Orange Donation Panel */}
      <div className="bg-[#f97316] text-white p-8 lg:p-12 flex flex-col gap-6 w-full lg:w-[400px]">
        <h2 className="text-3xl font-bold">Please Donate</h2>
        
        {/* PayPal Section */}
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">PayPal</h3>
          <div className="bg-white p-4 rounded mb-2 flex justify-center">
            <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
              QR Code
            </div>
          </div>
        </div>

        {/* Venmo Section */}
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Venmo</h3>
          <div className="bg-white p-4 rounded mb-2 flex justify-center">
            <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
              QR Code
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-sm">
          <p>Email: csfnj@gmail.com</p>
          <p>Phone: (908) 380-5070</p>
        </div>

        {/* Cause Bands */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="bg-[#1e3a8a] p-3 rounded flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div>
              <p className="font-semibold">Feed The Needy</p>
              <p className="text-xs">Meals delivered to the homeless on a regular basis.</p>
            </div>
          </div>
          
          <div className="bg-[#eab308] p-3 rounded flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Funeral Assistance</p>
              <p className="text-xs text-gray-800">Provide respectable funeral to needy Muslims free of cost.</p>
            </div>
          </div>
          
          <div className="bg-[#f97316] p-3 rounded flex items-center gap-3 border-2 border-white">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div>
              <p className="font-semibold">Ramadan Packages</p>
              <p className="text-xs">Distribute groceries to the needy Muslims in Central NJ prior to Ramadan.</p>
            </div>
          </div>
          
          <div className="bg-[#14b8a6] p-3 rounded flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div>
              <p className="font-semibold">Women Empowerment</p>
              <p className="text-xs">Assist in establishing women in various trades.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

