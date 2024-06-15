import React, { useState } from 'react';
import { FaBars, FaTimes, FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { MdVideoLibrary, MdPlaylistPlay, MdHistory, MdThumbUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const user = useSelector(state => state.auth.user);

  return (
    <div className="flex flex-col">
      <header className="bg-[#212121] text-white flex px-4 py-2 justify-between">
        
        <div className='flex flex-row gap-4 justify-around'>
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-2xl mr-4 focus:outline-none">
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            
          </div>
        
          <div className='text-3xl font-bold'>Stream IO</div>
        </div>
        <div className="relative w-[40%]">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 w-[100%]  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" aria-label="Search Icon" />
          </div>
        
          <div className="relative">
            <button onClick={toggleUserDropdown} className="text-2xl focus:outline-none">
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt="User Avatar" className="w-10 h-10 rounded-full " />
              ) : (
                <FaUserCircle />
              )}
            </button>
            {userDropdownOpen && (
              <div className="absolute flex flex-row right-0 mt-2 bg-gray-700 rounded-md shadow-lg z-50">
                <div><Link to={"/profile"}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-900">User Profile</a>
                </Link>
                </div>
                <div><a href="#" className="block px-4 py-2 hover:bg-gray-900">
                  <FaSignOutAlt className="inline-block mr-2" />
                  Logout
                </a>
                </div>
              </div>
            )}
          </div>
      </header>

      <div className="flex flex-1 overflow-hidden z-100">
        <aside className={`bg-[#212121] text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
          <nav className="p-4">
            <ul>
              <li className="mb-4">
              <Link to={`/`}>
                <a href="#" className="flex items-center text-gray-300 hover:text-white">
                  <MdVideoLibrary className="mr-2" />
                  <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Videos</span>
                </a>
              </Link>
              </li>
              <li className="mb-4">
              <Link to={`/likedVideos`}>
                <a href="#" className="flex items-center text-gray-300 hover:text-white">
                  <MdThumbUp className="mr-2" />
                  <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Liked Videos</span>
                </a>
              </Link>
              </li>
              <li className="mb-4">
              <Link to={`/playlist`}>
                <a href="#" className="flex items-center text-gray-300 hover:text-white">
                  <MdPlaylistPlay className="mr-2" />
                  <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Playlists</span>
                </a>
              </Link>
              </li>
              <li>
              <Link to={`/history`}>
                <a href="#" className="flex items-center text-gray-300 hover:text-white">
                  <MdHistory className="mr-2" />
                  <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>History</span>
                </a>
              </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 bg-black p-4 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Header;
