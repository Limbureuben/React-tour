import React from 'react';
import {
  Box, Button, TextField, Typography, FormControl,
  InputLabel, OutlinedInput, InputAdornment, IconButton,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useRegistrationForm from '../../services/authService';

export default function RegistrationForm({ onSwitch }) {
  const {
    formData, errors, isSubmitting,
    showPassword, showConfirmPassword,
    handleChange, handleSubmit,
    handleClickShowPassword, handleClickShowConfirmPassword
  } = useRegistrationForm();

  return (
    <Box
      sx={{
        width: 390,
        height: 'auto',
        p: 2,
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h6" align="center" mb={2}>Register</Typography>

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="medium"
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

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{' '}
          <span style={{ color: '#06923E', cursor: 'pointer' }} onClick={onSwitch}>
            Sign in
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
