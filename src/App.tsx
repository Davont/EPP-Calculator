import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <SmoothScroll>
        <Content />
      </SmoothScroll>
    </div>
  );
}

export default App;
