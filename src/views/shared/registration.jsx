import React from 'react';
import {
  Box, Button, TextField, Typography, FormControl,
  InputLabel, OutlinedInput, InputAdornment, IconButton,
  FormHelperText, Fade, Slide
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useRegistrationForm from '../../services/authService';

export default function RegistrationForm() {
  const {
    formData, errors, isSubmitting,
    showPassword, showConfirmPassword,
    handleChange, handleSubmit,
    handleClickShowPassword, handleClickShowConfirmPassword
  } = useRegistrationForm();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        width: 300, // make it compact
        p: 2
      }}
    >
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" align="center" mb={2}>Register</Typography>

          <Fade in timeout={300}>
            <TextField
              fullWidth
              required
              margin="dense"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Fade>

          <Fade in timeout={400}>
            <TextField
              fullWidth
              required
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Fade>

          <Fade in timeout={500}>
            <FormControl fullWidth variant="outlined" margin="dense" error={!!errors.password}>
              <InputLabel>Password *</InputLabel>
              <OutlinedInput
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password *"
              />
              {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
            </FormControl>
          </Fade>

          <Fade in timeout={600}>
            <FormControl fullWidth variant="outlined" margin="dense" error={!!errors.confirmPassword}>
              <InputLabel>Confirm Password *</InputLabel>
              <OutlinedInput
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password *"
              />
              {errors.confirmPassword && <FormHelperText>{errors.confirmPassword}</FormHelperText>}
            </FormControl>
          </Fade>

          <Fade in timeout={800}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Fade>

          <Typography variant="body2" align="center" mt={2}>
            Already have an account? <a href="/">Sign in</a>
          </Typography>
        </Box>
      </Slide>
    </Box>
  );
}
