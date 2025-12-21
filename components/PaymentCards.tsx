import Image from 'next/image';

export default function PaymentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4 mt-12 mb-8">
      {/* Venmo Card */}
      <div className="bg-[#374af0] rounded-lg py-[9px] px-4 flex items-center gap-6">
        {/* Venmo Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/images/venmo_logo.png"
              alt="Venmo logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Account Details */}
        <div className="flex-1 text-white">
          <p className="font-semibold text-lg mb-1">@careshare</p>
          <p className="text-sm">(732) 809 2595</p>
        </div>
        
        {/* QR Code */}
        <div className="flex-shrink-0 w-60 h-60 relative">
          <Image
            src="/images/venmo_qr.png"
            alt="Venmo QR Code"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>
      </div>

      {/* Zelle Card */}
      <div className="bg-[#374af0] rounded-lg py-[9px] px-4 flex items-center gap-6">
        {/* Zelle Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/images/zelle_logo.png"
              alt="Zelle logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Account Details */}
        <div className="flex-1 text-white">
          <p className="font-semibold text-lg">mail.csfnj@gmail.com</p>
        </div>
        
        {/* QR Code */}
        <div className="flex-shrink-0 w-60 h-60 relative">
          <Image
            src="/images/zelle_qr.png"
            alt="Zelle QR Code"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Check Payment Card */}
      <div className="md:col-span-2 -mt-2">
        <div className="bg-[#374af0] rounded-lg p-4 text-center">
          <p className="text-white font-semibold">Checks are accepted payable to Care & Share Foundation</p>
        </div>
      </div>
      
      {/* Additional Text */}
      <div className="md:col-span-2 text-center mt-4 mb-0">
        <p className="text-gray-700">We accept Zakat & Sadaqah - 100% of Donations are for the cause!</p>
      </div>
    </div>
  );
}

