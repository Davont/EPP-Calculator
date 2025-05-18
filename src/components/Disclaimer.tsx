import React from 'react';
import { Box, Typography } from '@mui/material';

const Disclaimer: React.FC = () => {
  return (
    <Box sx={{ 
      paddingTop: '20px',
      paddingBottom: '10px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <Typography 
        variant="h6" 
        component="h3" 
        sx={{ 
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '12px'
        }}
      >
        Disclaimer
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#666666',
        }}
      >
        This calculator is available for illustrative purposes only. It estimates top-line revenue and does not account for the cost of consumables, processing fees, chargebacks, refunds, taxes, and potential other expenses. These costs are variable and subject to change. To obtain a more accurate picture for your business, please reach out to <a href="mailto:partnerships@aescape.com" style={{ color: '#666666', textDecoration: 'none' }}>partnerships@aescape.com</a> for more information.
      </Typography>
    </Box>
  );
};

export default Disclaimer;
