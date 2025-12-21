export default function Hero() {
  return (
    <section className="relative min-h-[600px] w-full">
      {/* Background Image with Overlay */}
      <div className="relative w-full min-h-[600px] overflow-hidden">
        {/* Background Image - uses CSS background for better fallback handling */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundColor: '#475569'
          }}
        >
          {/* Fallback placeholder shown behind image */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400 -z-10">
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-6 gap-1 h-full p-2">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-sm" />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-white/40 text-xs z-30">
              Add hero-bg.jpg to /public/images/
            </div>
          </div>
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
        {/* Text Content */}
        <article className="absolute inset-0 z-20 flex flex-col justify-end pb-16 px-8 lg:px-16 text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Care & Share Foundation
          </h1>
          <p className="text-lg lg:text-xl drop-shadow-md max-w-xl">
            Serving To Make A <span className="text-[#0720ff] font-bold">DIFFERENCE</span> Where It Matters The Most.
          </p>
        </article>
      </div>
    </section>
  );
}

