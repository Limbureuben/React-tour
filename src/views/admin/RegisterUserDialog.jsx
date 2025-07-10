// src/components/User/RegisterUserDialog.jsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';

export default function RegisterUserDialog({
  open,
  onClose,
  newUser,
  onChange,
  onSubmit,
  formError,
  loading,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register New User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          name="username"
          fullWidth
          variant="outlined"
          value={newUser.username}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          type="email"
          fullWidth
          variant="outlined"
          value={newUser.email}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          fullWidth
          variant="outlined"
          value={newUser.role}
          onChange={onChange}
        />
        {formError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {formError}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit} disabled={loading}>
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}
