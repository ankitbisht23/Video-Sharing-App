import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

function Logout() {
  console.log("logout")
  localStorage.clear();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(logout());
  navigate('/');
  return (
    <div>
      logout
    </div>
  )
}

export default Logout
