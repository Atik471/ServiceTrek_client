const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container max-w-[90%] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-white">ServiceTrek</h2>
          <p className="text-sm text-gray-400">
            ServiceTrek connects you with trusted services to make your life
            easier. From technology to home maintenance, we&apos;ve got you covered.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact & Info
          </h3>
          <p className="text-sm text-gray-400">
            Email: support@servicetrek.com
          </p>
          <p className="text-sm text-gray-400">Phone: +1 (555) 123-4567</p>
          <p className="mt-4 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ServiceTrek. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
