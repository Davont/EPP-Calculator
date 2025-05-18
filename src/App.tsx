import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import SmoothScroll from './components/SmoothScroll';
import './App.css';

function App() {
  return (
    <div className="app">
      <SmoothScroll>
        <Navbar />
        <Content />
      </SmoothScroll>
    </div>
  );
}

export default App;
