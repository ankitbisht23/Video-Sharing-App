import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Login from './components/Login/Login';
import { setUser, setAccessToken } from './store/authSlice.js';
import { useState } from 'react';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/SideMenu/SideMenu.jsx';
function Layout() {
  console.log("layout")
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const dispatch = useDispatch();
  let accessToken = useSelector(state => state.auth.accessToken);
  // const navigate=useNavigate()
  if(!accessToken){
    accessToken = localStorage.getItem('accessToken');
    const userstr=localStorage.getItem('user')
    const user=JSON.parse(userstr);
    dispatch(setUser(user));
    dispatch(setAccessToken(accessToken));
    console.log("get from storage",accessToken)

    console.log(typeof accessToken )
  }

  if (!accessToken || typeof accessToken !== 'string') {
    console.log("no accesstoken")
   
    return(
      <Login/>
    )
  }
  else{
    return (
      <div className="min-h-screen grid grid-cols-[auto,1fr] grid-rows-[auto,1fr]">
      {/* Header */}
      <header className="col-span-2 bg-gray-800">
        <Header toggleSidebar={toggleSidebar} />
      </header>

      {/* Sidebar */}
      <aside
        className={`bg-gray-700 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </aside>

      {/* Main Content */}
      <main className="overflow-y-auto bg-gray-100 p-4">
        <Outlet/>
      </main>
    </div>
    );
  }

  
}

export default Layout;