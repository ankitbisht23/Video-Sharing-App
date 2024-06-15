import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios.js';
import { setUser, setAccessToken } from '../../store/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/users/login', {
        username,
        password,
      });
      const { user, accessToken } = response.data.data;

      dispatch(setUser(user));
      dispatch(setAccessToken(accessToken));
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl p-6 bg-white rounded shadow-md">
        <div className="w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate('/register')}
            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
        <div className="w-1/2 p-6 bg-gray-200 rounded">
          <h2 className="mb-4 text-2xl font-bold">Welcome Back!</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
