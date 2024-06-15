import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
      <div className="p-4">
        <button
          onClick={toggleMenu}
          className="text-white px-4 py-2 mb-4 bg-blue-500 rounded hover:bg-blue-700"
        >
          {isOpen ? 'Close' : 'Open'} Menu
        </button>
        <ul className="text-white">
          <li className="mb-4">
            <Link to="/videos" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Videos
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/liked-videos" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Liked Videos
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/playlist" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Playlist
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/history" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
