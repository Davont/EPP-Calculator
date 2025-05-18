import React, { useState, useEffect } from 'react';
import './Calculator.css';
import InputSlider from '../InputSlider/InputSlider';
import Email from '../Email/Email';
import Disclaimer from '../Disclaimer/Disclaimer';
import Footer from '../Footer/Footer';
import CountUp from 'react-countup';

// 移动设备的媒体查询辅助函数
const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

// 费率等级常量
const RATE_TIERS = [
  { revenue_max: 250000, monthly_rate: 0.025 },
  { revenue_max: 1000000, monthly_rate: 0.0208 },
  { revenue_max: 10000000, monthly_rate: 0.0167 },
  { revenue_max: 50000000, monthly_rate: 0.015 }
];

const ALT_RATES = { "Credit Card": 0.245, "MCA": 0.62, "Factoring": 0.30 };
const DAYS_IN_MONTH = 30;

const Calculator: React.FC = () => {
  // 状态变量
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(2000000);
  const [supplierSpend, setSupplierSpend] = useState<number>(1000000);
  const [discountRate, setDiscountRate] = useState<number>(1); // 早付折扣百分比，默认1%
  const [discountWindow, setDiscountWindow] = useState<number>(10); // 折扣窗口天数，默认10天
  const [standardTerms, setStandardTerms] = useState<number>(30); // 标准付款期限，默认30天
  const [repayDay, setRepayDay] = useState<number>(60); // 还款日期，默认60天
  const [mobile, setMobile] = useState<boolean>(false);
  
  // 动态步长计算
  const [revenueStep, setRevenueStep] = useState<number>(10000);
  const [spendStep, setSpendStep] = useState<number>(10000);
  
  // 计算动态步长
  const calculateStep = (rangeMax: number): number => {
    if (rangeMax < 1000000) {
      return 1000; // 低于100万时使用1000的步长
    }
    // 计算大约是范围最大值的0.5%，但不低于10000，并四舍五入到最近的1000
    const stepValue = Math.max(Math.ceil(rangeMax * 0.005 / 1000) * 1000, 10000);
    return stepValue;
  };
  
  // 初始化和监听窗口大小变化
  useEffect(() => {
    const checkMobile = () => {
      setMobile(isMobile());
    };
    
    // 初始化
    checkMobile();
    
    // 计算初始步长
    setRevenueStep(calculateStep(50000000)); // 最大收入$50M
    setSpendStep(calculateStep(monthlyRevenue)); // 供应商支出最大为月收入
    
    // 添加事件监听器
    window.addEventListener('resize', checkMobile);
    
    // 清理
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // 当收入变化时，更新供应商支出的最大值和步长
  useEffect(() => {
    setSpendStep(calculateStep(monthlyRevenue));
    // 如果供应商支出超过月收入，则限制它
    if (supplierSpend > monthlyRevenue) {
      setSupplierSpend(monthlyRevenue);
    }
  }, [monthlyRevenue]);
  
  // 当折扣窗口变化时，确保还款日期不小于折扣窗口
  useEffect(() => {
    if (repayDay < discountWindow) {
      setRepayDay(discountWindow);
    }
  }, [discountWindow]);
  
  // 计算结果
  const [paylaterLine, setPaylaterLine] = useState<number>(0); // 可用信用额度
  const [normalRateMonthly, setNormalRateMonthly] = useState<number>(0); // 正常月利率
  const [effectiveRateMonthly, setEffectiveRateMonthly] = useState<number>(0); // 有效月利率
  const [netSavingAnnual, setNetSavingAnnual] = useState<number>(0); // 年净节省
  const [altCostMonthly, setAltCostMonthly] = useState<{[key: string]: number}>({}); // 替代产品每月成本
  
  // 当输入变化时重新计算结果
  useEffect(() => {
    // 实现PRD中的计算逻辑
    
    // 1. 获取PayLater月利率
    const getPayLaterRate = (revenue: number): number => {
      for (const tier of RATE_TIERS) {
        if (revenue <= tier.revenue_max) {
          return tier.monthly_rate;
        }
      }
      return RATE_TIERS[RATE_TIERS.length - 1].monthly_rate; // 默认使用最低利率
    };
    
    // 2. 计算派生值
    const paylaterMonthlyRate = getPayLaterRate(monthlyRevenue);
    const loanDays = Math.max(0, repayDay - discountWindow);
    const financingFactor = loanDays / DAYS_IN_MONTH; // 融资时间占一个月的比例
    
    // 3. PayLater信用额度（解锁的现金）
    const calculatedPaylaterLine = monthlyRevenue * 0.25 * financingFactor;
    
    // 4. 可用于融资的支出
    const spendUsed = Math.min(supplierSpend, calculatedPaylaterLine);
    
    // 5. 折扣收益（每月）
    const discountRateDecimal = discountRate / 100; // 转换百分比为小数
    const benefit = spendUsed * discountRateDecimal;
    
    // 6. PayLater实际贷款期限的成本
    const plCost = spendUsed * paylaterMonthlyRate * financingFactor;
    
    // 7. 正常月利率 - PayLater标题利率
    const calculatedNormalRateMonthly = paylaterMonthlyRate * 100; // 转换为百分比
    
    // 8. 有效月利率 - 扣除早付折扣后的净值
    let calculatedEffectiveRateMonthly = 0;
    if (financingFactor > 0) {
      calculatedEffectiveRateMonthly = ((plCost - benefit) / spendUsed / financingFactor) * 100; // 转换为百分比
    }
    
    // 9. 年净节省
    const calculatedNetSavingAnnual = 12 * (spendUsed * paylaterMonthlyRate * financingFactor - 
                                           spendUsed * (calculatedEffectiveRateMonthly/100) * financingFactor);
    
    // 10. 替代产品成本表
    const calculatedAltCostMonthly: {[key: string]: number} = {};
    for (const [name, altRate] of Object.entries(ALT_RATES)) {
      calculatedAltCostMonthly[name] = spendUsed * altRate * financingFactor;
    }
    
    // 更新状态
    setPaylaterLine(calculatedPaylaterLine);
    setNormalRateMonthly(calculatedNormalRateMonthly);
    setEffectiveRateMonthly(calculatedEffectiveRateMonthly);
    setNetSavingAnnual(calculatedNetSavingAnnual);
    setAltCostMonthly(calculatedAltCostMonthly);
    
  }, [monthlyRevenue, supplierSpend, discountRate, discountWindow, standardTerms, repayDay]);
  
  // 格式化数字为美元显示
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // 格式化百分比显示
  const formatPercent = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };
  
  return (
    <div className="calculator-area" style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '40px 0 0', 
      minHeight: 'auto'
    }}>
      <div className="calculator-container" style={{ 
        maxWidth: '1100px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        {/* 结果卡片区域 */}
        <div className="results-cards" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: mobile ? 'wrap' : 'nowrap',
          gap: '0',
          borderRadius: '24px',
          overflow: 'hidden'
        }}>
          <div className="result-card" style={{ 
            flex: mobile ? '1 1 calc(50% - 1px)' : '1',
            backgroundColor: '#f5f5f0',
            padding: mobile ? '20px 16px 24px' : '24px 24px 30px',
            textAlign: 'center',
            position: 'relative',
            borderRadius: '0',
            boxShadow: 'none',
            border: 'none',
            borderRight: mobile ? 'none' : '1px solid rgba(0,0,0,0.05)',
            borderBottom: mobile ? '1px solid rgba(0,0,0,0.05)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: mobile ? '160px' : '180px'
          }}>
            <div style={{
              backgroundColor: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '16px'
            }}>
              $
            </div>
            <div className="result-value" style={{ 
              fontSize: mobile ? '38px' : '44px',
              fontWeight: 'bold',
              marginBottom: '8px',
              marginTop: '0'
            }}>
              <CountUp 
                end={paylaterLine} 
                separator="," 
                duration={1} 
                preserveValue={true} 
                decimals={0}
                prefix="$"
              />
            </div>
            <div className="result-label" style={{
              fontSize: '16px',
              color: '#555',
              fontWeight: '500',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span>Unlocked Cash</span>
              <span style={{ opacity: 0.85, fontSize: '14px' }}>(PayLater Line)</span>
            </div>
          </div>
          
          <div className="result-card" style={{ 
            flex: mobile ? '1 1 calc(50% - 1px)' : '1',
            backgroundColor: '#f5f5f0',
            padding: mobile ? '20px 16px 24px' : '24px 24px 30px',
            textAlign: 'center',
            position: 'relative',
            borderRadius: '0',
            boxShadow: 'none',
            border: 'none',
            borderRight: mobile ? 'none' : '1px solid rgba(0,0,0,0.05)',
            borderBottom: mobile ? '1px solid rgba(0,0,0,0.05)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: mobile ? '160px' : '180px'
          }}>
            <div style={{
              backgroundColor: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '16px'
            }}>
              %
            </div>
            <div className="result-value" style={{ 
              fontSize: mobile ? '38px' : '44px',
              fontWeight: 'bold',
              marginBottom: '8px',
              marginTop: '0'
            }}>
              <CountUp 
                end={normalRateMonthly} 
                duration={1} 
                preserveValue={true} 
                decimals={2}
                suffix="%"
              />
            </div>
            <div className="result-label" style={{
              fontSize: '16px',
              color: '#555',
              fontWeight: '500',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span>Normal Interest Rate</span>
              <span style={{ opacity: 0.85, fontSize: '14px' }}>(Monthly)</span>
            </div>
          </div>
          
          <div className="result-card" style={{ 
            flex: mobile ? '1 1 calc(50% - 1px)' : '1',
            backgroundColor: '#f5f5f0',
            padding: mobile ? '20px 16px 24px' : '24px 24px 30px',
            textAlign: 'center',
            position: 'relative',
            borderRadius: '0',
            boxShadow: 'none',
            border: 'none',
            borderRight: mobile ? 'none' : '1px solid rgba(0,0,0,0.05)',
            borderBottom: mobile ? '1px solid rgba(0,0,0,0.05)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: mobile ? '160px' : '180px'
          }}>
            <div style={{
              backgroundColor: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '16px'
            }}>
              %
            </div>
            <div className="result-value" style={{ 
              fontSize: mobile ? '38px' : '44px',
              fontWeight: 'bold',
              marginBottom: '8px',
              marginTop: '0'
            }}>
              <CountUp 
                end={effectiveRateMonthly} 
                duration={1} 
                preserveValue={true} 
                decimals={2}
                suffix="%"
              />
            </div>
            <div className="result-label" style={{
              fontSize: '16px',
              color: '#555',
              fontWeight: '500',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span>Effective Interest Rate</span>
              <span style={{ opacity: 0.85, fontSize: '14px' }}>(Monthly)</span>
            </div>
          </div>
          
          <div className="result-card profit-card" style={{ 
            flex: mobile ? '1 1 calc(50% - 1px)' : '1',
            backgroundColor: '#1456BD',
            padding: mobile ? '20px 16px 24px' : '24px 24px 30px',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            borderRadius: '0',
            boxShadow: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: mobile ? '160px' : '180px'
          }}>
            <div style={{
              backgroundColor: '#FFC107',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '16px'
            }}>
              $
            </div>
            <div className="result-value" style={{ 
              fontSize: mobile ? '38px' : '44px',
              fontWeight: 'bold',
              marginBottom: '8px',
              marginTop: '0',
              color: 'white'
            }}>
              <CountUp 
                end={netSavingAnnual} 
                separator="," 
                duration={1} 
                preserveValue={true} 
                decimals={0}
                prefix="$"
              />
            </div>
            <div className="result-label" style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '500',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span>Net Saving</span>
              <span style={{ opacity: 0.85, fontSize: '14px' }}>(Annual)</span>
            </div>
          </div>
        </div>
        
        {/* 输入区域 */}
        <div className="calculator-inputs" style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px',
          padding: '40px 30px',
          position: 'relative',
          marginBottom: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px',
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: '20px'
          }}>
            <h2 className="calculator-heading" style={{ 
              fontSize: '24px', 
              margin: 0, 
              fontWeight: '600',
              color: '#0052CC'
            }}>Early-Pay Profit Calculator</h2>
            
            <div className="calculation-details-link" style={{ fontSize: '14px' }}>
              <a href="#" style={{ 
                color: '#0052CC', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                Calculation details <span className="arrow" style={{ marginTop: '2px' }}>→</span>
              </a>
            </div>
          </div>
          
          {/* 滑块输入区域 - 每行两个 (在移动设备上每行一个) */}
          <div className="sliders-container" style={{ 
            backgroundColor: '#fafafa', 
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <div className="slider-row" style={{ 
              display: 'flex', 
              flexDirection: mobile ? 'column' : 'row',
              gap: '30px'
            }}>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <InputSlider 
                  title="Monthly revenue"
                  defaultValue={monthlyRevenue}
                  min={50000}
                  max={50000000}
                  step={revenueStep}
                  onChange={(value) => setMonthlyRevenue(value)}
                  displayValue={`$${formatCurrency(monthlyRevenue)}`}
                />
              </div>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <InputSlider 
                  title="Monthly supplier spend"
                  defaultValue={supplierSpend}
                  min={0}
                  max={monthlyRevenue}
                  step={spendStep}
                  onChange={(value) => setSupplierSpend(value)}
                  displayValue={`$${formatCurrency(supplierSpend)}`}
                />
              </div>
            </div>
            
            <div className="slider-row" style={{ 
              display: 'flex', 
              flexDirection: mobile ? 'column' : 'row',
              gap: '30px' 
            }}>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <InputSlider 
                  title="Early-pay discount (%)"
                  defaultValue={discountRate}
                  min={0}
                  max={5}
                  step={0.1}
                  onChange={(value) => setDiscountRate(value)}
                  displayValue={`${discountRate}%`}
                />
              </div>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <InputSlider 
                  title="Discount window (days)"
                  defaultValue={discountWindow}
                  min={1}
                  max={30}
                  step={1}
                  onChange={(value) => setDiscountWindow(value)}
                  displayValue={`${discountWindow}`}
                />
              </div>
            </div>
            
            <div className="slider-row" style={{ 
              display: 'flex', 
              flexDirection: mobile ? 'column' : 'row',
              gap: '30px' 
            }}>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <InputSlider 
                  title="Standard terms (Net-days)"
                  defaultValue={standardTerms}
                  min={discountWindow + 1}
                  max={120}
                  step={1}
                  onChange={(value) => setStandardTerms(value)}
                  displayValue={`${standardTerms}`}
                />
              </div>
              <div className="slider-col" style={{ 
                flex: '1 1 50%'
              }}>
                <InputSlider 
                  title="Repay Lendica on day (invoice date)"
                  defaultValue={repayDay}
                  min={0}
                  max={60}
                  step={1}
                  onChange={(value) => setRepayDay(value)}
                  displayValue={`${repayDay}`}
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
            <button 
              className="results-button" 
              style={{
                backgroundColor: netSavingAnnual > 0 ? '#00C389' : '#999',
                color: 'white',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: netSavingAnnual > 0 ? 'pointer' : 'default',
                width: 'auto',
                minWidth: '220px',
                boxShadow: netSavingAnnual > 0 ? '0 4px 12px rgba(0, 195, 137, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
              disabled={netSavingAnnual <= 0}
            >
              {netSavingAnnual > 0 ? 'Start Apply' : 'Enter Valid Data'}
            </button>
          </div>
          
          {/* 替代产品比较表 */}
          <div className="alternative-comparison" style={{
            marginTop: '40px',
            marginBottom: '40px',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '16px',
              color: '#0052CC',
              fontWeight: 600
            }}>Alternative Product Comparison</h3>
            <div className="alt-table" style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #eee',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div className="alt-header" style={{
                display: 'flex',
                backgroundColor: '#f2f7ff',
                padding: '14px 16px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                <div style={{ flex: '1' }}>Financing Product</div>
                <div style={{ flex: '1' }}>Monthly Rate</div>
                <div style={{ flex: '1' }}>Monthly Cost</div>
              </div>
              {Object.entries(ALT_RATES).map(([name, rate]) => (
                <div key={name} className="alt-row" style={{
                  display: 'flex',
                  borderTop: '1px solid #eee',
                  padding: '14px 16px',
                  backgroundColor: 'white'
                }}>
                  <div style={{ flex: '1' }}>{name}</div>
                  <div style={{ flex: '1', color: '#d32f2f' }}>{(rate * 100).toFixed(2)}%</div>
                  <div style={{ flex: '1', color: '#d32f2f' }}>${formatCurrency(altCostMonthly[name] || 0)}</div>
                </div>
              ))}
              <div className="alt-row paylater-row" style={{
                display: 'flex',
                borderTop: '1px solid #eee',
                padding: '14px 16px',
                backgroundColor: '#e6f7f0',
                fontWeight: '600',
                color: '#00875A'
              }}>
                <div style={{ flex: '1' }}>Lendica PayLater</div>
                <div style={{ flex: '1' }}>{formatPercent(normalRateMonthly)}</div>
                <div style={{ flex: '1' }}>${formatCurrency(supplierSpend * (normalRateMonthly/100) * (Math.max(0, repayDay - discountWindow) / DAYS_IN_MONTH))}</div>
              </div>
            </div>
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