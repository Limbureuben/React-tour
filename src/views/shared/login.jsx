import React from 'react';
import { Box, Button, Container,  TextField,Typography,Paper,FormControl,
  InputLabel,OutlinedInput,InputAdornment,IconButton,FormHelperText,Fade,Zoom,Slide } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import LoginRegistrationForm from '../../services/LoginService'

// Styled components for animations
const AnimatedContainer = styled(motion.div)({
  width: '100%'
});

const AnimatedPaper = styled(motion(Paper))({
  padding: '2rem',
  marginTop: '2rem'
});

export default function LoginForm({ onSwitch }) {
  const {formData, errors, isSubmitting, showPassword,
    handleChange,
    handleSubmit,
    handleClickShowPassword,
  } = LoginRegistrationForm();


 return (
  <Box sx={{ width: '100%', p: 0, m: 0 }}>
    <AnimatedContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            backgroundColor: 'transparent', // no background
            padding: 2,
            width: 360,
            mx: 'auto',
          }}
        >
          <Fade in={true} timeout={800}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="dense"
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
              />
            </Box>
          </Fade>

          <Fade in={true} timeout={1200}>
            <FormControl fullWidth variant="outlined" margin="dense" error={!!errors.password}>
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
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                backgroundColor: '#06923E',
                '&:hover': {
                  backgroundColor: '#057a33',
                },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Fade>

          <Fade in={true} timeout={1800}>
            <Typography variant="body2" align="center" mt={2}>
              Don’t have an account?{' '}
              <span style={{ color: '#06923E', cursor: 'pointer' }} onClick={onSwitch}>
                Register
              </span>
            </Typography>
          </Fade>
        </Box>
      </Slide>
    </AnimatedContainer>
  </Box>
);
};