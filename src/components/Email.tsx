import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Email: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理提交逻辑
    console.log('提交的邮箱:', email);
  };

  return (
    <Box>
      {/* 顶部邮件订阅部分 */}
      <Box sx={{ 
        backgroundColor: '#f0ece3', 
        padding: {xs: '30px 20px', md: '30px 40px'},
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: {xs: 'wrap', md: 'nowrap'},
        gap: {xs: '20px', md: '0'}
      }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            color: '#222222',
            fontSize: {xs: '22px', md: '26px'},
            marginRight: {xs: '0', md: '20px'},
            flexShrink: 0,
            flex: {xs: '1 1 100%', md: '0 0 auto'}
          }}
        >
          Get your results sent to your inbox
        </Typography>

        <Box sx={{ 
          display: 'flex',
          flex: '1',
          maxWidth: {xs: '100%', md: '500px'},
          width: '100%',
        }} component="form" onSubmit={handleSubmit}>
          <TextField 
            fullWidth
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: { 
                backgroundColor: '#ffffff', 
                borderRadius: '9999px',
                height: '50px',
                paddingLeft: '20px',
                border: 'none',
                '& fieldset': {
                  border: 'none',
                },
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              borderRadius: '9999px',
              height: '50px',
              marginLeft: '-36px',
              paddingLeft: '24px',
              paddingRight: '24px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#333333',
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* 底部绿色ROI计算器部分 */}
      <Box sx={{ 
        backgroundColor: '#174733', 
        padding: {xs: '40px 20px', md: '50px 40px'},
        marginTop: '0px',
        textAlign: 'center',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        color: '#ffffff'
      }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 500, 
            fontSize: {xs: '28px', md: '36px'},
            marginBottom: '16px'
          }}
        >
          ROI calculator
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: {xs: '16px', md: '18px'},
            marginBottom: '40px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          Unlock competitive pricing and ROI with Aescape.
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: {xs: 'column', sm: 'row'},
          justifyContent: 'center',
          gap: '16px',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              padding: '12px 24px',
              color: '#000000',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              boxShadow: 'none',
              flex: {xs: '1', sm: '0 1 auto'},
              minWidth: '180px',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                boxShadow: 'none',
              }
            }}
          >
            Join waitlist
          </Button>
          
          <Button
            variant="outlined"
            sx={{
              borderRadius: '9999px',
              padding: '12px 24px',
              color: '#ffffff',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              flex: {xs: '1', sm: '0 1 auto'},
              minWidth: '180px',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            Contact us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Email;
