import React, { useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

// 模拟发送邮件的API调用
const sendSummaryEmail = async (email: string, captchaToken: string) => {
  // 实际应用中这里应该是一个真实的API调用
  console.log('发送邮件摘要给:', email, '验证码:', captchaToken);
  
  // 模拟API响应
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

const Email: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  
  // reCAPTCHA引用
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // 验证邮箱格式
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 清除之前的错误
    setEmailError('');
    
    // 验证邮箱格式
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // 获取reCAPTCHA令牌
    if (!recaptchaRef.current) {
      setSnackbarMessage('reCAPTCHA verification failed, please try again later');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // 执行reCAPTCHA验证
      const token = await recaptchaRef.current.executeAsync();
      
      if (!token) {
        throw new Error('Verification failed');
      }
      
      // 发送邮件摘要
      await sendSummaryEmail(email, token);
      
      // 重置reCAPTCHA
      recaptchaRef.current.reset();
      
      // 显示成功消息
      setSnackbarMessage('Summary has been sent to your email!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // 清空邮箱输入
      setEmail('');
      
    } catch (error) {
      console.error('Submission failed:', error);
      setSnackbarMessage('Sending failed, please try again later');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      {/* reCAPTCHA (隐藏但有效) */}
      <div style={{ display: 'none' }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // 这是一个测试密钥，实际应用需要使用真实密钥
          size="invisible"
        />
      </div>
      
      {/* 顶部邮件订阅部分 */}
      <Box sx={{ 
        backgroundColor: '#EAF5FF', 
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
          Get your summary PDF sent to your inbox
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
            error={!!emailError}
            helperText={emailError}
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
              '& .MuiFormHelperText-root': {
                marginLeft: '20px',
                marginTop: '4px'
              }
            }}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#0052CC',
              borderRadius: '9999px',
              height: '50px',
              marginLeft: '-36px',
              paddingLeft: '24px',
              paddingRight: '24px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#003D99',
              },
              '&.Mui-disabled': {
                backgroundColor: '#83A9E0',
                color: 'white'
              }
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Summary'}
          </Button>
        </Box>
      </Box>

      {/* 底部蓝色计算器营销部分 */}
      <Box sx={{ 
        backgroundColor: '#0052CC', 
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
          Boost Your Cash Flow
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
          Lendica PayLater lets you capture early-payment discounts while extending your payment terms – the best of both worlds.
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
              backgroundColor: '#00C389',
              borderRadius: '9999px',
              padding: '12px 24px',
              color: '#ffffff',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              boxShadow: 'none',
              flex: {xs: '1', sm: '0 1 auto'},
              minWidth: '180px',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#00A272',
                boxShadow: 'none',
              }
            }}
          >
            Start Apply
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
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            Talk to an Expert
          </Button>
        </Box>
      </Box>
      
      {/* 成功/错误提示 */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Email;
