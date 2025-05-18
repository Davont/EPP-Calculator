import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Slider, IconButton, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// 自定义滑块样式
const CustomSlider = styled(Slider)(() => ({
  color: '#0052CC', // Lendica蓝色
  height: 3,
  padding: '10px 0',
  '& .MuiSlider-track': {
    height: 3,
    backgroundColor: '#0052CC',
  },
  '& .MuiSlider-rail': {
    height: 3,
    backgroundColor: '#e2e2e2',
  },
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#0052CC',
    '&:focus, &:hover': {
      boxShadow: '0 0 0 6px rgba(0, 82, 204, 0.2)',
    },
  },
  '& .MuiSlider-valueLabel': {
    display: 'none',
  },
}));

// 自定义按钮样式
const CustomIconButton = styled(IconButton)(() => ({
  backgroundColor: '#ffffff',
  color: '#0052CC',
  border: '1px solid #e0e0e5',
  width: 30,
  height: 30,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#f8f8fa',
  },
}));

// 值显示容器
const ValueBadge = styled(Box)(() => ({
  display: 'inline-block',
  backgroundColor: '#EAF5FF',
  borderRadius: '16px',
  padding: '6px 12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#D9EBFF',
  },
}));

interface AescapeSliderProps {
  title: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  displayValue?: string;
}

const AescapeSlider: React.FC<AescapeSliderProps> = ({
  title,
  defaultValue = 1,
  min = 1,
  max = 10,
  step = 1,
  onChange,
  displayValue,
}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 处理滑块变化
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const numValue = newValue as number;
    setValue(numValue);
    if (onChange) {
      onChange(numValue);
    }
  };

  // 加减按钮处理
  const handleDecrease = () => {
    if (value > min) {
      const newValue = Math.max(min, value - step);
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      const newValue = Math.min(max, value + step);
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };
  
  // 启用直接编辑模式
  const handleBadgeClick = () => {
    setIsEditing(true);
    setEditValue(value.toString());
    // 让input在下一个渲染周期获取焦点
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 0);
  };
  
  // 处理直接输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };
  
  // 提交输入的值
  const handleInputBlur = () => {
    handleInputSubmit();
  };
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      let newValue = value;
      if (e.key === 'ArrowUp') {
        newValue = e.shiftKey ? Math.min(max, value + 10 * step) : Math.min(max, value + step);
      } else if (e.key === 'ArrowDown') {
        newValue = e.shiftKey ? Math.max(min, value - 10 * step) : Math.max(min, value - step);
      }
      
      setValue(newValue);
      setEditValue(newValue.toString());
      if (onChange) {
        onChange(newValue);
      }
    }
  };
  
  const handleInputSubmit = () => {
    let newValue = parseFloat(editValue);
    if (isNaN(newValue)) {
      newValue = value;
    } else {
      // 限制在最小值和最大值范围内
      newValue = Math.max(min, Math.min(max, newValue));
    }
    
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    setIsEditing(false);
  };
  
  // 监听键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleDecrease();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleIncrease();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [value, min, max, step]);

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Typography variant="body1" sx={{ mb: 1.5, fontSize: '14px', fontWeight: 500, color: '#333333' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <CustomIconButton 
          onClick={handleDecrease} 
          disabled={value <= min}
          aria-label="decrease"
          size="small"
        >
          <RemoveIcon fontSize="small" />
        </CustomIconButton>
        <Box sx={{ flex: 1, mx: 1.5 }}>
          <CustomSlider
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleSliderChange}
            aria-label={title}
          />
        </Box>
        <CustomIconButton 
          onClick={handleIncrease} 
          disabled={value >= max}
          aria-label="increase"
          size="small"
        >
          <AddIcon fontSize="small" />
        </CustomIconButton>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 0.5 }}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            style={{
              width: '100px',
              padding: '6px 12px',
              borderRadius: '16px',
              border: '1px solid #0052CC',
              backgroundColor: '#ffffff',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500
            }}
          />
        ) : (
          <ValueBadge onClick={handleBadgeClick}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {displayValue || value}
            </Typography>
          </ValueBadge>
        )}
      </Box>
    </Box>
  );
};

export default AescapeSlider;
