import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import './SmoothScroll.css';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 创建平滑滚动实例
    const smoother = ScrollSmoother.create({
      smooth: 1.5, // 平滑度，值越高越平滑
      effects: true, // 启用视差效果
      wrapper: wrapperRef.current,
      content: contentRef.current,
      normalizeScroll: true, // 标准化滚动
      ignoreMobileResize: true, // 忽略移动设备调整大小
      smoothTouch: 0.1, // 触摸设备上的平滑度
    });

    // 清理函数
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll; 