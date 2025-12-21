export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-4 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center gap-2">
          <h3 className="font-bold text-base text-gray-900">Care & Share Foundation</h3>
          <p className="text-gray-900 text-sm">(908)-360-5076</p>
          <p className="text-gray-900 text-sm">
            100 Plainfield Ave, Suite B3<br />
            Edison, New Jersey 08817
          </p>
          <p className="text-gray-900 text-sm mt-2">© {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}

