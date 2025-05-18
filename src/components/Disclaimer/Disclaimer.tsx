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
        This calculator is available for illustrative purposes only. Results are estimates based on the inputs provided and actual savings may vary. The calculation assumes that vendors will honor early-payment discounts as indicated. Interest rates shown are based on typical rates for businesses with similar revenue profiles and may not reflect the exact rates available to your business. Lendica PayLater approval is subject to creditworthiness and other factors. For detailed information specific to your business situation, please contact <a href="mailto:info@lendica.com" style={{ color: '#0052CC', textDecoration: 'none', fontWeight: 500 }}>info@lendica.com</a> or speak with a Lendica representative.
      </Typography>
    </Box>
  );
};

export default Disclaimer;
