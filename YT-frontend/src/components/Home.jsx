import React from 'react';
import Header from './Header/Header';
import Videos from './Videos/Videos';

const Home = () => {
  console.log("home");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Videos />
      </Header>
    </div>
  );
};

export default Home;
