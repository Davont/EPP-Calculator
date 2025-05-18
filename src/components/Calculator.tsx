import React, { useState, useEffect } from 'react';
import './Calculator.css';
import SliderDemo from './SliderDemo';
import Email from './Email';
import Disclaimer from './Disclaimer';
import Footer from './Footer';

// 移动设备的媒体查询辅助函数
const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

const Calculator: React.FC = () => {
  // 状态变量
  const [tables, setTables] = useState<number>(1);
  const [hoursPerDay, setHoursPerDay] = useState<number>(12);
  const [utilization, setUtilization] = useState<number>(60);
  const [price, setPrice] = useState<number>(160);
  const [daysPerYear, setDaysPerYear] = useState<number>(340);
  const [otherCosts, setOtherCosts] = useState<number>(0);
  const [mobile, setMobile] = useState<boolean>(false);
  
  // 初始化和监听窗口大小变化
  useEffect(() => {
    const checkMobile = () => {
      setMobile(isMobile());
    };
    
    // 初始化
    checkMobile();
    
    // 添加事件监听器
    window.addEventListener('resize', checkMobile);
    
    // 清理
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // 计算结果
  const [monthlyFee, setMonthlyFee] = useState<number>(5500);
  const [annualRevenue, setAnnualRevenue] = useState<number>(313280);
  const [netProfit, setNetProfit] = useState<number>(247280);
  
  // 当输入变化时重新计算结果
  useEffect(() => {
    // 这里可以添加真实的计算逻辑
    const calculatedMonthlyFee = tables * 5500;
    const calculatedAnnualRevenue = Math.round(price * (hoursPerDay * (utilization/100)) * daysPerYear * tables);
    const calculatedNetProfit = Math.round(calculatedAnnualRevenue - (calculatedMonthlyFee * 12) - otherCosts);
    
    setMonthlyFee(calculatedMonthlyFee);
    setAnnualRevenue(calculatedAnnualRevenue);
    setNetProfit(calculatedNetProfit);
  }, [tables, hoursPerDay, utilization, price, daysPerYear, otherCosts]);
  
  // 格式化数字为美元显示
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="calculator-area" style={{ backgroundColor: '#f6f3eb', padding: '20px 0', minHeight: '100vh' }}>
      <div className="calculator-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        {/* 结果卡片区域 */}
        <div className="results-cards" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '40px',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div className="result-card" style={{ 
            flex: '1',
            backgroundColor: '#ece9e0',
            padding: '32px 24px',
            textAlign: 'center'
          }}>
            <div className="dollar-icon" style={{ 
              fontSize: '14px', 
              marginBottom: '8px',
              color: '#333'
            }}>$</div>
            <div className="result-value" style={{ 
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '4px'
            }}>${formatCurrency(monthlyFee)}</div>
            <div className="result-label" style={{
              fontSize: '14px',
              color: '#555'
            }}>Monthly fee per table</div>
          </div>
          
          <div className="result-card" style={{ 
            flex: '1',
            backgroundColor: '#ece9e0',
            padding: '32px 24px',
            textAlign: 'center'
          }}>
            <div className="dollar-icon" style={{ 
              fontSize: '14px', 
              marginBottom: '8px',
              color: '#333'
            }}>$</div>
            <div className="result-value" style={{ 
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '4px'
            }}>${formatCurrency(annualRevenue)}</div>
            <div className="result-label" style={{
              fontSize: '14px',
              color: '#555'
            }}>Total Annual Revenue</div>
          </div>
          
          <div className="result-card profit-card" style={{ 
            flex: '1',
            backgroundColor: '#0a4a35',
            padding: '32px 24px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div className="dollar-icon profit" style={{ 
              fontSize: '14px', 
              marginBottom: '8px',
            }}>$</div>
            <div className="result-value" style={{ 
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '4px',
              color: 'white'
            }}>${formatCurrency(netProfit)}</div>
            <div className="result-label" style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.8)'
            }}>Net profit</div>
          </div>
        </div>
        
        {/* 输入区域 */}
        <div className="calculator-inputs" style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px',
          padding: '40px 30px',
          position: 'relative',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 className="calculator-heading" style={{ 
              fontSize: '24px', 
              margin: 0, 
              fontWeight: '500',
              color: '#222'
            }}>Tell us more about your business operations</h2>
            
            <div className="calculation-details-link" style={{ fontSize: '14px' }}>
              <a href="#" style={{ color: '#9d94d3', textDecoration: 'none' }}>
                Calculation details <span className="arrow">→</span>
              </a>
            </div>
          </div>
          
          {/* 滑块输入区域 - 每行两个 (在移动设备上每行一个) */}
          <div className="sliders-container">
            <div className="slider-row" style={{ 
              display: 'flex', 
              flexDirection: mobile ? 'column' : 'row',
              gap: '20px'
            }}>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <SliderDemo 
                  title="Select the number of Aescape massage tables you'll need"
                  defaultValue={tables}
                  min={1}
                  max={10}
                  onChange={(value) => setTables(value)}
                />
              </div>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <SliderDemo 
                  title="Select the number of hours the Aescape table will be available each day"
                  defaultValue={hoursPerDay}
                  min={1}
                  max={24}
                  onChange={(value) => setHoursPerDay(value)}
                  displayValue={`${hoursPerDay}`}
                />
              </div>
            </div>
            
            <div className="slider-row" style={{ 
              display: 'flex', 
              flexDirection: mobile ? 'column' : 'row',
              gap: '20px' 
            }}>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <SliderDemo 
                  title="Select the percent utilization of the Aescape table"
                  defaultValue={utilization}
                  min={10}
                  max={100}
                  onChange={(value) => setUtilization(value)}
                  displayValue={`${utilization}%`}
                />
              </div>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <SliderDemo 
                  title="Select the price of a 60-minute Aescape massage"
                  defaultValue={price}
                  min={50}
                  max={300}
                  step={10}
                  onChange={(value) => setPrice(value)}
                  displayValue={`$${price}`}
                />
              </div>
            </div>
            
            <div className="slider-row" style={{ 
              display: 'flex', 
              flexDirection: mobile ? 'column' : 'row',
              gap: '20px' 
            }}>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <SliderDemo 
                  title="Select the number of days your business is open each year"
                  defaultValue={daysPerYear}
                  min={100}
                  max={365}
                  onChange={(value) => setDaysPerYear(value)}
                  displayValue={`${daysPerYear}`}
                />
              </div>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <SliderDemo 
                  title="(Optional): Other annual costs, on a per-table basis"
                  defaultValue={otherCosts}
                  min={0}
                  max={100000}
                  step={1000}
                  onChange={(value) => setOtherCosts(value)}
                  displayValue={`${otherCosts === 0 ? '0' : '$' + formatCurrency(otherCosts)}`}
                />
              </div>
            </div>
          </div>
          
          {/* 结果按钮 */}
          <div className="results-button-container" style={{
            textAlign: 'center',
            marginTop: '40px',
            marginBottom: '50px'
          }}>
            <button className="results-button" style={{
              backgroundColor: '#9d94d3',
              color: 'white',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              width: 'auto',
              minWidth: '200px'
            }}>Show results</button>
          </div>
          
          {/* Email组件区域 - 在白色背景内部 */}
          <Email />
          
          {/* Disclaimer组件区域 - 同样放在白色背景内部 */}
          <Disclaimer />
        </div>
      </div>
      
      {/* Footer组件 */}
      <Footer />
    </div>
  );
};

export default Calculator; 