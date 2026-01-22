export default function Footer({ className = '' }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`bg-white py-2 px-4 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-1">
          <h3 className="font-bold text-base text-gray-900">Care & Share Foundation</h3>
          <a href="tel:+19083605076" className="text-gray-900 text-sm hover:text-[#0720ff] transition-colors">(908)-360-5076</a>
          <a
            href="https://maps.google.com/?q=100+Plainfield+Ave,+Suite+B3+Edison,+New+Jersey+08817"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 text-sm hover:text-[#0720ff] transition-colors"
          >
            100 Plainfield Ave, Suite B3 Edison, New Jersey 08817
          </a>
          <p className="text-gray-900 text-sm">© {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}

