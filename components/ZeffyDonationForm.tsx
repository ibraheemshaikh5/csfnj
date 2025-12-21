export default function ZeffyDonationForm() {
  return (
    <div className="w-full">
      <div 
        className="relative overflow-hidden w-full rounded-lg"
        style={{ 
          height: '900px',
          minHeight: '450px'
        }}
      >
        <iframe
          title="Donation form powered by Zeffy"
          src="https://www.zeffy.com/embed/donation-form/care-and-share-foundation-donations"
          allowPaymentRequest
          allowTransparency="true"
          className="absolute border-0 w-full h-full"
          style={{
            position: 'absolute',
            border: 0,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
}

