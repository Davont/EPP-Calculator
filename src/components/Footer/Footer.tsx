import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  IconButton,
  Link as MuiLink,
  InputBase,
  styled,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

// 自定义的输入框
const CustomInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: '4px 0 0 4px',
    position: 'relative',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontSize: 16,
    padding: '8px 15px',
    height: '20px',
    width: '100%',
    lineHeight: '20px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#0052CC',
      boxShadow: '0 0 0 1px #0052CC',
    },
    '&::placeholder': {
      color: '#666',
    },
  },
  height: '36px',
  display: 'flex',
  alignItems: 'center',
}));

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理订阅逻辑
    console.log('提交的邮箱:', email);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <Box sx={{ 
      bgcolor: '#0A2540', 
      color: 'white',
      position: 'relative',
      pt: 5,
      pb: 4,
      mt: 0
    }}>
      {/* 向上滚动按钮 */}
      <Box 
        onClick={scrollToTop}
        sx={{
          position: 'absolute',
          top: -28,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: '#00C389',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 195, 137, 0.3)',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: '#00A272',
            transform: 'translateX(-50%) translateY(-3px)',
          }
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: 'white', fontSize: 30 }} />
      </Box>
      
      <Container maxWidth="lg">
        {/* Logo和标语区域 */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          mb: 6
        }}>
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              fontSize: '24px',
              color: 'white',
              mb: 1
            }}>
              Lendica
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#8FA6C0', 
              maxWidth: '400px' 
            }}>
              Unlock working capital. Pay suppliers early. Optimize cash flow.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex',
            gap: 2
          }}>
            <IconButton 
              size="medium" 
              sx={{ 
                color: 'white', 
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)'
                }
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton 
              size="medium" 
              sx={{ 
                color: 'white', 
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)'
                }
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton 
              size="medium" 
              sx={{ 
                color: 'white', 
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)'
                }
              }}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
        
        {/* 导航链接区域 */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          mb: 6
        }}>
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600, 
              mb: 3,
              fontSize: '16px',
              color: '#00C389'
            }}>
              Products
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                PayLater
              </MuiLink>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                Capital
              </MuiLink>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                Cash Flow Tools
              </MuiLink>
            </Box>
          </Box>
          
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600, 
              mb: 3,
              fontSize: '16px',
              color: '#00C389'
            }}>
              Company
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                About Us
              </MuiLink>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                Careers
              </MuiLink>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                Blog
              </MuiLink>
            </Box>
          </Box>
          
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600, 
              mb: 3,
              fontSize: '16px',
              color: '#00C389'
            }}>
              Resources
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                FAQs
              </MuiLink>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                Support
              </MuiLink>
              <MuiLink href="#" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': {
                  color: '#00C389'
                }
              }}>
                Contact Us
              </MuiLink>
            </Box>
          </Box>
          
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600, 
              mb: 3,
              fontSize: '16px',
              color: '#00C389'
            }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#8FA6C0',
              mb: 2,
              fontSize: '14px'
            }}>
              Subscribe to receive updates and financial insights.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ 
              display: 'flex',
              width: '100%',
              maxWidth: { xs: '100%', sm: '280px' },
              alignItems: 'center',
              height: '36px',
            }}>
              <CustomInput
                placeholder="Your email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                type="submit"
                sx={{
                  bgcolor: '#00C389',
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  height: '36px',
                  borderRadius: '0 4px 4px 0',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    bgcolor: '#00A272',
                  }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>
        
        {/* 底部版权区域 */}
        <Box sx={{ 
          pt: 4, 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography variant="body2" sx={{ 
            color: '#8FA6C0',
            fontSize: '14px'
          }}>
            © {new Date().getFullYear()} Lendica. All rights reserved.
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            gap: 3
          }}>
            <MuiLink href="#" sx={{ 
              color: '#8FA6C0', 
              textDecoration: 'none',
              fontSize: '14px',
              '&:hover': {
                color: 'white'
              }
            }}>
              Privacy Policy
            </MuiLink>
            <MuiLink href="#" sx={{ 
              color: '#8FA6C0', 
              textDecoration: 'none',
              fontSize: '14px',
              '&:hover': {
                color: 'white'
              }
            }}>
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
