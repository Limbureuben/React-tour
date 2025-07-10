import React from 'react';
import {
  Box, Button, TextField, Typography, FormControl,
  InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginRegistrationForm from '../../services/LoginService';

export default function LoginForm({ onSwitch, onClose }) {
  const {
    formData, errors, isSubmitting, showPassword,
    handleChange, handleSubmit, handleClickShowPassword,
  } = LoginRegistrationForm(onClose);

  return (
    <Box sx={{ width: '100%', p: 0, m: 0 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          backgroundColor: 'transparent',
          padding: 2,
          width: 360,
          mx: 'auto',
        }}
      >
        <Typography variant="h6" align="center" mb={2}>LOGIN</Typography>
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
          {isSubmitting ? 'Logging In...' : 'Sign In'}
        </Button>

        <Typography variant="body2" align="center" mt={2}>
          Don’t have an account?{' '}
          <span style={{ color: '#06923E', cursor: 'pointer' }} onClick={onSwitch}>
            Register
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
