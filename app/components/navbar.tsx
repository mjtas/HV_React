import React, { useState } from 'react';
import { Link } from 'react-router';
import headerToggleImage from '/menu.png';

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/workshops', label: 'Workshops' },
  { to: '/privateBookings', label: 'Private Bookings' },
  { to: '/consulting', label: 'Consulting' },
  { to: '/guides', label: 'How To Guides' },
  { to: '/blog', label: 'Blog' },
  { to: '/contactUs', label: 'Contact' }
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const closeMenu = (): void => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile toggle button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <img src={headerToggleImage} alt="Toggle menu" className="h-6 w-6 cursor-pointer" />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex w-full justify-between">
          <ul className="flex gap-6 items-center">
            {menuItems.slice(0, 4).map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="font-semibold text-gray-700 hover:text-green-600">{label}</Link>
              </li>
            ))}
          </ul>

          <ul className="flex gap-6 items-center">
            {menuItems.slice(4).map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="font-semibold text-gray-700 hover:text-green-600">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-50 bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0 opacity-97' : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col px-4 py-2 gap-2">
          {menuItems.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={closeMenu}
                className="block py-2 text-gray-700 hover:text-green-600"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;