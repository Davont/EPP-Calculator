import React from 'react';
import Hero from './Hero';
import Calculator from './Calculator';
import './Content.css';

const Content: React.FC = () => {
  return (
    <main className="content">
      {/* Hero区域 */}
      <Hero imageUrl="https://aescape-assets.b-cdn.net/aescape-down-close-arms-optimized.jpg" />
      
      {/* 计算区域组件 */}
      <Calculator />
    </main>
  );
};

export default Content; 