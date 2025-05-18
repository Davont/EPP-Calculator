import React from 'react';
import { Box } from '@mui/material';
import AescapeSlider from './Slider';

interface SliderDemoProps {
  title?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  displayValue?: string;
}

const SliderDemo: React.FC<SliderDemoProps> = ({
  title = "Select the number of Aescape massage tables you'll need",
  defaultValue = 1,
  min = 1,
  max = 10,
  step = 1,
  onChange,
  displayValue
}) => {
  return (
    <Box sx={{ 
      width: '100%',
      padding: '0',
    }}>
      <AescapeSlider 
        title={title}
        defaultValue={defaultValue}
        min={min} 
        max={max} 
        step={step}
        onChange={onChange}
        displayValue={displayValue}
      />
    </Box>
  );
};

export default SliderDemo; 