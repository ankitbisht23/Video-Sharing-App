import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './components/Login/Login.jsx';
import Logout from './components/Logout/Logout.jsx';
import Register from './components/Register/Register.jsx';
import VideoPage from './components/Videos/VideoPage.jsx';
import Home from './components/Home.jsx';
// import LikedVideosPage from './components/LikedVideosPage.jsx';
import WatchHistoryPage from './components/WatchHistoryPage.jsx';
import './index.css';
import LikedVideos from "./components/LikedVideos.jsx"
import WatchHistory from "./components/WatchHistory.jsx"

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Playlist from './components/Playlist.jsx';
import UserProfile from './components/UserProfile.jsx';
import Header from './components/Header/Header.jsx';
import DetailPage from './components/Videos/DetailPage.jsx';
import Videos from './components/Videos/Videos.jsx';
import LikedVideosPage from './components/LikedVideosPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Videos />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="likedVideos" element={<LikedVideosPage/>}/>
      <Route path="history" element={<WatchHistoryPage/>}/>
      <Route path="playlist" element={<Playlist/>}/>
      <Route path="watch/:id" element={<DetailPage/>} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);