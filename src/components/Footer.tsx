import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  IconButton,
  Link as MuiLink,
  InputBase,
  styled
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// TikTok图标 (MUI没有内置，所以自定义)
const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.122 5.122 0 0 1-3.414-1.267 5.929 5.929 0 0 1-1.847-3.309h-3.602v13.778c0 .983-.285 1.82-.847 2.502a2.94 2.94 0 0 1-2.196 1.02 2.74 2.74 0 0 1-2.01-.801 2.732 2.732 0 0 1-.838-2.037c0-.79.278-1.461.83-2.008a2.738 2.738 0 0 1 2.018-.821c.223 0 .447.026.667.075V8.683a6.284 6.284 0 0 0-2.657.324A6.142 6.142 0 0 0 2.82 10.58a6.44 6.44 0 0 0-1.667 4.535c0 1.785.662 3.313 1.976 4.566a6.614 6.614 0 0 0 4.688 1.895c1.558 0 2.956-.464 4.178-1.382a6.71 6.71 0 0 0 2.486-3.629V24H17.07V8.957a9.411 9.411 0 0 0 2.947.802V5.79c-.236-.066-.47-.132-.696-.227z" />
  </svg>
);

// 自定义的黑色输入框
const DarkInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: '4px 0 0 4px',
    position: 'relative',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
    padding: '10px 15px',
    height: '20px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#666',
    },
    '&::placeholder': {
      color: '#999',
    },
  },
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
      bgcolor: 'black', 
      color: 'white',
      position: 'relative',
      pt: 7,
      pb: 4
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
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: '#000', fontSize: 28 }} />
      </Box>
      
      <Container maxWidth="lg">
        {/* 订阅区域 */}
        <Box sx={{ 
          maxWidth: 700, 
          mx: 'auto', 
          mb: 6, 
          textAlign: 'center' 
        }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 400, fontSize: '16px' }}>
            Get updates you'll actually want—new locations, special offers, and more ways to feel good.
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 3
          }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ 
              display: 'flex',
              width: '100%',
              maxWidth: 450,
            }}>
              <DarkInput
                placeholder="Enter your email address"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button
                type="submit"
                sx={{
                  bgcolor: 'white',
                  color: 'black',
                  px: 3,
                  py: 1,
                  borderRadius: '0 4px 4px 0',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    bgcolor: '#f0f0f0',
                  }
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: 450,
            mx: 'auto'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#999', fontSize: '14px' }}>
                Interested in partner news?
              </Typography>
              <MuiLink 
                href="#" 
                sx={{ 
                  color: 'white', 
                  ml: 1, 
                  textDecoration: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Subscribe here
              </MuiLink>
            </Box>
            
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body2" sx={{ 
                color: '#999', 
                fontSize: '14px',
                mr: 2,
                display: 'flex',
                alignItems: 'center'
              }}>
                Follow the feeling
              </Typography>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  bgcolor: '#333',
                  mr: 1,
                  '&:hover': {
                    bgcolor: '#444'
                  }
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  bgcolor: '#333',
                  mr: 1,
                  '&:hover': {
                    bgcolor: '#444'
                  }
                }}
              >
                <TikTokIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'white', 
                  bgcolor: '#333',
                  '&:hover': {
                    bgcolor: '#444'
                  }
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        
        {/* 链接区域 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 6 }}>
          {/* Experience 列 */}
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '20%' }, px: 2, mb: { xs: 4, md: 0 } }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 400, fontSize: '14px', color: '#999' }}>
              Experience
            </Typography>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Join the waitlist
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              FAQs
            </MuiLink>
          </Box>
          
          {/* Business 列 */}
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '20%' }, px: 2, mb: { xs: 4, md: 0 } }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 400, fontSize: '14px', color: '#999' }}>
              Business
            </Typography>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Become a partner
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Request a demo
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Partner FAQs
            </MuiLink>
          </Box>
          
          {/* Therapists 列 */}
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '20%' }, px: 2, mb: { xs: 4, md: 0 } }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 400, fontSize: '14px', color: '#999' }}>
              Therapists
            </Typography>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Become a partner
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Request a demo
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Therapist FAQs
            </MuiLink>
          </Box>
          
          {/* Company 列 */}
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '20%' }, px: 2, mb: { xs: 4, md: 0 } }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 400, fontSize: '14px', color: '#999' }}>
              Company
            </Typography>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              About
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Careers
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              News
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Investors
            </MuiLink>
            <MuiLink href="#" sx={{ display: 'block', color: 'white', textDecoration: 'none', mb: 1, fontSize: '14px' }}>
              Contact
            </MuiLink>
          </Box>
          
          {/* Offices 列 */}
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '20%' }, px: 2, mb: { xs: 4, md: 0 } }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 400, fontSize: '14px', color: '#999' }}>
              Offices
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 0.5, fontSize: '14px' }}>
              New York Headquarters:
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 0.5, fontSize: '14px' }}>
              545 5th Ave,
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 2, fontSize: '14px' }}>
              New York, NY 10017
            </Typography>
            
            <Typography variant="body2" sx={{ color: 'white', mb: 0.5, fontSize: '14px' }}>
              San Francisco:
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 0.5, fontSize: '14px' }}>
              490 2nd St,
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 0.5, fontSize: '14px' }}>
              Suite 302,
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 1, fontSize: '14px' }}>
              San Francisco, 94107
            </Typography>
          </Box>
        </Box>
        
        {/* 底部区域 */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #333',
          pt: 2
        }}>
          <Box>
            <svg width="100" height="22" viewBox="0 0 426 80" fill="white">
              <path d="M69.0663 10.7904C63.9008 6.46997 57.4287 3.43442 50.1374 2.49483C46.1336 0.857683 41.7775 0 37.1846 0C19.3438 0 4.55537 14.7885 4.55537 33.0508C4.55537 43.8444 9.78537 53.3915 18.0447 58.9221C23.2102 63.2425 29.6823 66.278 36.9736 67.2176C40.9774 68.8548 45.3334 69.7124 49.9264 69.7124C67.7672 69.7124 82.5556 54.924 82.5556 36.6617C82.5556 25.868 77.3256 16.321 69.0663 10.7904ZM42.9235 58.5028C33.2624 58.5028 25.4214 50.2961 25.4214 40.1841C25.4214 30.072 33.2624 21.8654 42.9235 21.8654C52.5845 21.8654 60.4255 30.072 60.4255 40.1841C60.4255 50.2961 52.5845 58.5028 42.9235 58.5028Z"/>
              <path d="M240.7 26.0654C231.364 26.0654 223.628 33.9618 223.628 43.531C223.628 53.1001 231.322 61.0177 240.7 61.0177C250.078 61.0177 257.772 53.1213 257.772 43.531C257.772 33.9406 250.078 26.0654 240.7 26.0654Z"/>
              <path d="M165.52 26.0654C156.184 26.0654 148.448 33.9618 148.448 43.531C148.448 53.1001 156.142 61.0177 165.52 61.0177C174.898 61.0177 182.592 53.1213 182.592 43.531C182.592 33.9406 174.898 26.0654 165.52 26.0654Z"/>
              <path d="M308.372 26.0654C299.036 26.0654 291.3 33.9618 291.3 43.531C291.3 53.1001 298.994 61.0177 308.372 61.0177C317.75 61.0177 325.444 53.1213 325.444 43.531C325.444 33.9406 317.75 26.0654 308.372 26.0654Z"/>
              <path d="M392.552 8.32288L374.262 58.1771C373.736 59.5428 372.264 60.2747 370.942 59.7276C369.62 59.1804 368.904 57.654 369.43 56.2882L387.72 6.43405C388.246 5.0683 389.718 4.33649 391.04 4.88361C392.405 5.43073 393.078 6.9571 392.552 8.32288ZM425.127 24.2635L414.911 50.8959C414.385 52.2616 412.913 52.9934 411.591 52.4463C410.269 51.8992 409.553 50.3728 410.079 49.007L420.295 22.3746C420.821 21.0089 422.293 20.2771 423.615 20.8242C424.979 21.3713 425.653 22.8977 425.127 24.2635ZM356.845 20.8455L366.693 47.6626C367.219 49.0283 366.503 50.5547 365.139 51.1019C363.817 51.649 362.345 50.9172 361.819 49.5514L351.971 22.7343C351.445 21.3686 352.161 19.8422 353.525 19.295C354.889 18.7479 356.319 19.4797 356.845 20.8455Z"/>
              <path d="M121.358 59.2441H110.08C108.588 59.2441 107.392 58.0058 107.392 56.4583V30.6224C107.392 29.075 108.588 27.8367 110.08 27.8367H121.379C122.871 27.8367 124.067 29.075 124.067 30.6224V56.4795C124.046 58.0058 122.85 59.2441 121.358 59.2441Z"/>
              <path d="M198.516 59.2441H187.238C185.746 59.2441 184.55 58.0058 184.55 56.4583V30.6224C184.55 29.075 185.746 27.8367 187.238 27.8367H198.538C200.03 27.8367 201.226 29.075 201.226 30.6224V56.4795C201.184 58.0058 199.988 59.2441 198.516 59.2441Z"/>
              <path d="M273.696 59.2441H262.418C260.926 59.2441 259.73 58.0058 259.73 56.4583V30.6224C259.73 29.075 260.926 27.8367 262.418 27.8367H273.717C275.209 27.8367 276.405 29.075 276.405 30.6224V56.4795C276.384 58.0058 275.188 59.2441 273.696 59.2441Z"/>
              <path d="M115.719 21.9719C111.319 21.9719 107.731 18.2828 107.731 13.7879C107.731 9.29302 111.319 5.60394 115.719 5.60394C120.119 5.60394 123.707 9.29302 123.707 13.7879C123.707 18.2828 120.119 21.9719 115.719 21.9719Z"/>
              <path d="M192.877 21.9719C188.477 21.9719 184.889 18.2828 184.889 13.7879C184.889 9.29302 188.477 5.60394 192.877 5.60394C197.277 5.60394 200.865 9.29302 200.865 13.7879C200.886 18.2828 197.277 21.9719 192.877 21.9719Z"/>
              <path d="M268.057 21.9719C263.657 21.9719 260.069 18.2828 260.069 13.7879C260.069 9.29302 263.657 5.60394 268.057 5.60394C272.457 5.60394 276.045 9.29302 276.045 13.7879C276.045 18.2828 272.457 21.9719 268.057 21.9719Z"/>
              <path d="M341.145 59.2441H329.867C328.375 59.2441 327.179 58.0058 327.179 56.4583V30.6224C327.179 29.075 328.375 27.8367 329.867 27.8367H341.166C342.658 27.8367 343.854 29.075 343.854 30.6224V56.4795C343.833 58.0058 342.637 59.2441 341.145 59.2441Z"/>
              <path d="M335.506 21.9719C331.106 21.9719 327.518 18.2828 327.518 13.7879C327.518 9.29302 331.106 5.60394 335.506 5.60394C339.906 5.60394 343.494 9.29302 343.494 13.7879C343.494 18.2828 339.906 21.9719 335.506 21.9719Z"/>
            </svg>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MuiLink href="#" sx={{ color: '#999', fontSize: '13px', textDecoration: 'none', mr: 2 }}>
              Privacy policy
            </MuiLink>
            <Box component="span" sx={{ color: '#666', mx: 1 }}>|</Box>
            <MuiLink href="#" sx={{ color: '#999', fontSize: '13px', textDecoration: 'none', ml: 2 }}>
              Terms of use
            </MuiLink>
          </Box>
          
          <Typography variant="body2" sx={{ color: '#999', fontSize: '13px' }}>
            Copyright © Aescape Inc. 2023
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
