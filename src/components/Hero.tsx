import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

// 确保ScrollTrigger已注册
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  imageUrl?: string;
  height?: string;
}

const Hero: React.FC<HeroProps> = ({
  imageUrl = 'https://aescape-assets.b-cdn.net/aescape-down-close-arms-optimized.jpg',
  height = '60vh'
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const smallTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!heroRef.current || !textContainerRef.current || !titleRef.current) return;

    // 创建标题文字向上移动且透明度变化的动画
    gsap.to(titleRef.current, {
      y: -100, // 向上移动
      opacity: 0, // 完全透明
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // 平滑跟随滚动
      }
    });

    // 创建小标题文字动画
    if (smallTextRef.current) {
      gsap.to(smallTextRef.current, {
        y: -80, // 向上移动
        opacity: 0, // 完全透明
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2, // 略微慢于标题
        }
      });
    }

    // 创建按钮动画
    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        y: -60, // 向上移动
        opacity: 0, // 完全透明
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4, // 更慢
        }
      });
    }

    // 创建整个文字容器向上移动的动画
    gsap.to(textContainerRef.current, {
      y: -50, // 向上移动
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5, // 比文字移动得更快
      }
    });

    return () => {
      // 清理ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="hero-container" ref={heroRef} style={{ height }}>
      <img 
        src={imageUrl}
        alt="背景图片"
        className="hero-image"
        loading="lazy"
        srcSet={`
          ${imageUrl}?width=640 640w,
          ${imageUrl}?width=750 750w,
          ${imageUrl}?width=828 828w,
          ${imageUrl}?width=1080 1080w,
          ${imageUrl}?width=1200 1200w,
          ${imageUrl}?width=1536 1536w,
          ${imageUrl}?width=1920 1920w,
          ${imageUrl}?width=2048 2048w,
          ${imageUrl}?width=2880 2880w,
          ${imageUrl}?width=3840 3840w
        `}
        sizes="100vw"
      />
      <div className="hero-overlay">
        <div className="hero-text-container" ref={textContainerRef}>
          <div className="hero-small-text" ref={smallTextRef}>ROI CALCULATOR</div>
          <h1 className="hero-title" ref={titleRef}>
            Unlock competitive pricing<br />
            and ROI with Aescape.
          </h1>
          <button className="hero-cta" ref={ctaRef}>Calculate your profits</button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 