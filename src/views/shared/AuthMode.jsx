import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RegistrationForm from '../shared/registration';
import LoginForm from '../shared/login';

export default function AuthModal({ open, onClose }) {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {isRegister ? (
          <RegistrationForm onSwitch={toggleForm} onClose={onClose} />
        ) : (
          <LoginForm onSwitch={toggleForm} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

