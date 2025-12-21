

export default function Footer() {


  return (
    <footer className="text-gray-900 bg-[#202E4B] shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Links */}
       

          {/* Branding / Small note */}
          <div className="text-yellow-400 font-semibold mt-2 md:mt-0 text-center">
            © {new Date().getFullYear()} CinemaView. All Rights Reserved.
          </div>
        </div>

   
    </footer>
  );
}
