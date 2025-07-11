// src/views/admin/RegisterProductDialog.jsx
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography
} from '@mui/material';

export default function RegisterProductDialog({
  open, onClose, newProduct, onChange, onSubmit, formError, loading
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Name" name="name" value={newProduct.name} onChange={onChange} fullWidth />
          <TextField label="Description" name="description" value={newProduct.description} onChange={onChange} fullWidth multiline />
          <TextField label="Price" name="price" type="number" value={newProduct.price} onChange={onChange} fullWidth />
          <TextField label="Discount" name="discount" type="number" value={newProduct.discount} onChange={onChange} fullWidth />
          <TextField label="Stock" name="stock" type="number" value={newProduct.stock} onChange={onChange} fullWidth />
          <TextField label="Image URL" name="image" value={newProduct.image} onChange={onChange} fullWidth />
          {formError && <Typography color="error">{formError}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={loading}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
