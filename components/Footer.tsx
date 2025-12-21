export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Care & Share Foundation</h3>
            <p className="text-gray-600 text-sm">908-350-5070</p>
            <p className="text-gray-600 text-sm">
              100 Plainfield Ave, Suite U2<br />
              Edison, New Jersey 08817
            </p>
          </div>
          <p className="text-gray-600 text-sm">© 2023</p>
        </div>
      </div>
    </footer>
  );
}

