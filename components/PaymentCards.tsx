import Image from 'next/image';

export default function PaymentCards() {
  return (
    <div className="mt-12 mb-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Other Ways to Donate</h2>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Venmo Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          {/* Header with brand color */}
          <div className="bg-[#008CFF] px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#008CFF">
                <path d="M19.5 3c.9 1.5 1.3 3 1.3 5 0 3.9-3.4 9-6.1 12.6H7.5L5 3.6l6.3-.6.9 7.3c1-1.6 2.2-4 2.2-5.7 0-1-.2-1.7-.4-2.3L19.5 3z"/>
              </svg>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium uppercase tracking-wide opacity-90">Pay with</p>
              <p className="text-xl font-bold">Venmo</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Account Details */}
              <div className="flex-1 w-full space-y-3">
                <div className="bg-[#f7f7f7] rounded-xl p-3 sm:p-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Username</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">@careshare</p>
                </div>
                <div className="bg-[#f7f7f7] rounded-xl p-3 sm:p-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900">(732) 809-2595</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] flex items-center justify-center">
                  <Image
                    src="/images/venmo_qr.png"
                    alt="Venmo QR Code"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">Scan to pay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Zelle Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          {/* Header with brand color */}
          <div className="bg-[#6D1ED4] px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
              <Image
                src="/images/zelle_logo.png"
                alt="Zelle logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <p className="text-sm font-medium uppercase tracking-wide opacity-90">Pay with</p>
              <p className="text-xl font-bold">Zelle</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Account Details */}
              <div className="flex-1 w-full">
                <div className="bg-[#f7f7f7] rounded-xl p-3 sm:p-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 break-all">mail.csfnj@gmail.com</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] flex items-center justify-center">
                  <Image
                    src="/images/zelle_qr.png"
                    alt="Zelle QR Code"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">Scan to pay</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Check Payment Card */}
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
          <div className="w-14 h-14 bg-[#0720ff] rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pay by Check</p>
            <p className="text-lg font-semibold text-gray-900">Make checks payable to Care & Share Foundation</p>
          </div>
        </div>
      </div>

      {/* Additional Text */}
      <div className="text-center mt-6 sm:mt-8">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="font-medium text-sm sm:text-base">We accept Zakat & Sadaqah - 100% of Donations go to the cause!</p>
        </div>
      </div>
    </div>
  );
}

