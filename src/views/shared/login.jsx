import React, { useState } from 'react';
import { Box, Button, Container,  TextField,Typography,Paper,FormControl,
  InputLabel,OutlinedInput,InputAdornment,IconButton,FormHelperText,Fade,Zoom,Slide } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

// Styled components for animations
const AnimatedContainer = styled(motion.div)({
  width: '100%'
});

const AnimatedPaper = styled(motion(Paper))({
  padding: '2rem',
  marginTop: '2rem'
});

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const validate = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'First name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        // Add your success handling here (redirect, notification, etc.)
      }, 1500);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12, mb: 2, px: 1 }}>
      <AnimatedContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <AnimatedPaper
            elevation={3}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Fade in={true} timeout={800}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{ mb: 2 }}
                  />
                </Box>
              </Fade>
              
              <Fade in={true} timeout={1200}>
                <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.password}>
                  <InputLabel htmlFor="password">Password *</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password *"
                  />
                  {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                </FormControl>
              </Fade>
              <Fade in={true} timeout={1600}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </Fade>
              
              <Fade in={true} timeout={1800}>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Do'nt have an account <a href="/register">Sign out</a>
                </Typography>
              </Fade>
            </Box>
          </AnimatedPaper>
        </Slide>
      </AnimatedContainer>
    </Container>
  );
};

export default LoginForm;