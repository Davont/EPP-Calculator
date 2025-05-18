import { useState, useRef, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';

const navItems = ['Products', 'Solutions', 'Resources', 'Pricing'];

interface NavbarProps {
  logoText?: string;
}

export default function Navbar({ logoText = 'Lendica' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1); // 用于背景透明度的状态
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 点击背景关闭抽屉
  const handleBackdropClick = () => {
    setMobileOpen(false);
  };

  // 监听滚动事件，调整导航栏透明度
  useEffect(() => {
    // 防抖函数
    const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      return function(this: unknown, ...args: Parameters<T>) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, delay);
      };
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // 设置一个阈值为300px，让过渡更加平滑
      const threshold = 300;
      // 使用更平滑的计算逻辑
      const newOpacity = Math.max(0.2, Math.min(1, 1 - (scrollPosition / threshold)));
      setScrollOpacity(newOpacity);
    };

    // 使用防抖处理滚动事件，提高性能
    const debouncedHandleScroll = debounce(handleScroll, 10);

    window.addEventListener('scroll', debouncedHandleScroll);
    // 初始执行一次
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  // 按ESC关闭抽屉
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [mobileOpen]);

  // 导航栏样式
  const navbarStyle = {
    backgroundColor: `rgba(255, 255, 255, ${scrollOpacity})`,
    backdropFilter: 'blur(8px)',
    boxShadow: scrollOpacity < 0.8 ? '0 2px 10px rgba(0,0,0,0.08)' : 'none',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
  };

  // 导航项目样式 - 根据透明度调整颜色
  const navItemStyle = {
    color: scrollOpacity < 0.5 ? '#111' : 'inherit',
    fontWeight: scrollOpacity < 0.5 ? 600 : 500,
  };

  return (
    <>
      <nav className="navbar" style={navbarStyle}>
        <div className="navbar-container">
          <div className="navbar-toolbar">
            {/* Logo */}
            <div className="logo">
              <span style={{ color: '#0052CC', fontWeight: 700 }}>{logoText}</span>
              <span style={{ 
                color: '#00C389', 
                fontWeight: 700, 
                fontSize: '9px', 
                position: 'relative', 
                top: '-6px', 
                left: '2px' 
              }}>
                PayLater
              </span>
            </div>

            {/* 桌面导航菜单 */}
            <div className="desktop-nav">
              {navItems.map((item) => (
                <button key={item} className="nav-item" style={navItemStyle}>
                  {item}
                </button>
              ))}
            </div>

            {/* 预订按钮和菜单 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="cta-button" style={{ 
                boxShadow: scrollOpacity < 0.5 ? '0 2px 8px rgba(0, 82, 204, 0.3)' : 'none'
              }}>
                Get Started
              </button>

              {/* 移动端菜单按钮 */}
              <button 
                className="menu-button"
                onClick={handleDrawerToggle}
                aria-label="打开菜单"
              >
                <MenuIcon className="menu-icon" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 移动端抽屉菜单 */}
      <div 
        ref={backdropRef}
        className={`drawer-backdrop ${mobileOpen ? 'open' : ''}`} 
        onClick={handleBackdropClick}
      />
      <div 
        ref={drawerRef}
        className={`drawer ${mobileOpen ? 'open' : ''}`}
      >
        <div className="drawer-header">
          <div className="logo-container">
            <span style={{ color: '#0052CC', fontWeight: 700 }}>{logoText}</span>
            <span style={{ 
              color: '#00C389', 
              fontWeight: 700, 
              fontSize: '9px', 
              position: 'relative', 
              top: '-6px', 
              left: '2px' 
            }}>
              PayLater
            </span>
          </div>
          <button 
            className="close-button"
            onClick={handleDrawerToggle}
            aria-label="关闭菜单"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-content">
          {navItems.map((item) => (
            <div key={item} className="drawer-menu-item">
              {item}
            </div>
          ))}
          <button className="drawer-cta-button">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
} 