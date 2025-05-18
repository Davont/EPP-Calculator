import React from 'react';
import Hero from '../Hero/Hero';
import Calculator from '../Calculator/Calculator';
import './Content.css';

const Content: React.FC = () => {
  return (
    <main className="content">
      {/* Hero区域 */}
      <Hero />
      
      {/* 计算区域组件 */}
      <Calculator />
    </main>
  );
};

export default Content; 