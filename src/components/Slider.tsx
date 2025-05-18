import React, { useState } from 'react';
import { Box, Typography, Slider, IconButton, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// 自定义滑块样式
const CustomSlider = styled(Slider)(() => ({
  color: '#9d94d3', // 紫色滑块
  height: 3,
  padding: '10px 0',
  '& .MuiSlider-track': {
    height: 3,
    backgroundColor: '#9d94d3',
  },
  '& .MuiSlider-rail': {
    height: 3,
    backgroundColor: '#e2e2e2',
  },
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#9d94d3',
    '&:focus, &:hover': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    display: 'none',
  },
}));

// 自定义按钮样式
const CustomIconButton = styled(IconButton)(() => ({
  backgroundColor: '#ffffff',
  color: '#9d94d3',
  border: '1px solid #e0e0e5',
  width: 30,
  height: 30,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#f8f8fa',
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

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const numValue = newValue as number;
    setValue(numValue);
    if (onChange) {
      onChange(numValue);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      const newValue = value - step;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      const newValue = value + step;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

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
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {displayValue || value}
        </Typography>
      </Box>
    </Box>
  );
};

export default AescapeSlider;
