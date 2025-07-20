import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from '@mui/material';

export default function PaymentDialog({ open, onClose, product }) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Payment for {product.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          You are about to pay for: <strong>{product.name}</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Total Price: <strong>Tsh {product.price}</strong>
        </Typography>

        {/* You can add PesaPal or PayPal form here */}
        <Box mt={3}>
          <Button variant="contained" color="primary" fullWidth>
            Proceed to Pay
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
