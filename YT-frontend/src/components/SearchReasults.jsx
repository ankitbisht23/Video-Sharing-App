import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../axios.js";
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const accessToken = useSelector(state => state.auth.accessToken);
  console.log("search results")

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    if (query) {
        const fetchVideos = async () => {
            try {
              console.log("Fetching search videos...");
              const response = await axios.get(`/video?query=${query}`, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              });
              console.log("API Response:", response);
              const data = response.data.data.docs;
      
              setLoading(false);
              setResults(data);

            } catch (error) {
              console.error('Error fetching videos:', error);
            }
          };
          fetchVideos();
    }
  }, [location.search]);

  if (loading) return <div className='text-white'>  
    Loading...</div>;
  if (error) return <div className='text-white'>{error}</div>;

  return (
    <div className='min-h-screen bg-white'>
        {console.log("Inside")}
      <h1>Search Results</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map(video => (
            <li key={video.id}>
              {/* Display video information here */}
              <h2>{video.title}</h2>
              {/* Add more video details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;