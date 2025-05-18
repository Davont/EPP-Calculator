import { useState, useRef, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

const navItems = ['技术', '地点', '新闻'];

interface NavbarProps {
  logoText?: string;
}

export default function Navbar({ logoText = 'aescape' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 点击背景关闭抽屉
  const handleBackdropClick = () => {
    setMobileOpen(false);
  };

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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-toolbar">
            {/* Logo */}
            <div className="logo">
              {logoText}
            </div>

            {/* 桌面导航菜单 */}
            <div className="desktop-nav">
              {navItems.map((item) => (
                <button key={item} className="nav-item">
                  {item}
                </button>
              ))}
            </div>

            {/* 预订按钮和菜单 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="book-button">
                预订
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
          <div className="logo">
            {logoText}
          </div>
        </div>
        <div>
          {navItems.map((item) => (
            <div key={item} className="drawer-menu-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 