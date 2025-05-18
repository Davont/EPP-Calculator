import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, styled } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

// 标题强调部分的样式
const HighlightSpan = styled('span')({
  color: '#00C389', // Lendica绿色
  fontWeight: 700,
});

const Hero: React.FC = () => {
  // 添加refs用于GSAP动画
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const circleOneRef = useRef<HTMLDivElement>(null);
  const circleTwoRef = useRef<HTMLDivElement>(null);
  const circleThreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 创建视差滚动效果
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      }
    });

    // 标题文字视差效果 - 向上移动较慢
    tl.to(titleRef.current, {
      y: -60,
      ease: "none",
    }, 0);

    // 装饰圆形的视差效果 - 每个圆形移动速度不同
    tl.to(circleOneRef.current, {
      y: -120,
      x: 40,
      ease: "none",
    }, 0);

    tl.to(circleTwoRef.current, {
      y: -80,
      x: -30,
      ease: "none",
    }, 0);

    tl.to(circleThreeRef.current, {
      y: -150,
      x: 20,
      ease: "none",
    }, 0);

    return () => {
      // 清理ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box 
      ref={heroRef}
      className="hero-container"
      sx={{
        backgroundColor: '#1a365d',
        position: 'relative',
        color: 'white',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: {xs: '350px', md: '450px'},
        display: 'flex',
        alignItems: 'center',
        padding: {xs: '60px 0', md: '80px 0'},
        background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)'
      }}
    >
      {/* 蓝色背景层 */}
      <Container maxWidth="lg">
        <Box 
          ref={titleRef}
          className="hero-content"
          sx={{
            position: 'relative',
            zIndex: 2,
            maxWidth: {xs: '100%', md: '60%'},
            textAlign: {xs: 'center', md: 'left'},
            px: {xs: 3, md: 0}
          }}
        >
          <Typography 
            variant="h1"
            sx={{
              fontSize: {xs: '2.2rem', sm: '2.5rem', md: '3.5rem'},
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 3
            }}
          >
            Save More by Paying <HighlightSpan>Earlier</HighlightSpan>
          </Typography>
          
          <Typography 
            variant="h2"
            sx={{
              fontSize: {xs: '1.2rem', md: '1.5rem'},
              fontWeight: 400,
              mb: 4,
              maxWidth: '650px',
              mx: {xs: 'auto', md: 0}
            }}
          >
            Use Lendica PayLater to capture vendor discounts while optimizing your cash flow. Calculate your potential savings instantly.
          </Typography>
          
          <Box 
            sx={{
              display: 'flex',
              flexDirection: {xs: 'column', sm: 'row'},
              gap: 2,
              justifyContent: {xs: 'center', md: 'flex-start'}
            }}
          >
            <Button 
              variant="contained"
              sx={{
                bgcolor: '#00C389',
                color: 'white',
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#00A272',
                }
              }}
            >
              Get Started
            </Button>
            
            <Button 
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              How it works
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* 右侧浮动图案 */}
      <Box 
        ref={circleOneRef}
        sx={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: {xs: '180px', md: '280px'},
          height: {xs: '180px', md: '280px'},
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 195, 137, 0.2)',
          zIndex: 1
        }}
      />
      <Box 
        ref={circleTwoRef}
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: {xs: '100px', md: '150px'},
          height: {xs: '100px', md: '150px'},
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 1
        }}
      />
      <Box 
        ref={circleThreeRef}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '30%',
          width: {xs: '60px', md: '80px'},
          height: {xs: '60px', md: '80px'},
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 195, 137, 0.15)',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default Hero; 