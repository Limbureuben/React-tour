import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Grid, TextField
} from '@mui/material';

const providers = [
  { name: 'Tigo Pesa', logo: '/public/assets/images/yas.png', type: 'mobile' },
  { name: 'Airtel Money', logo: '/public/assets/images/airtel.png', type: 'mobile' },
  { name: 'Halotel Money', logo: '/public/assets/images/halotel.jpeg', type: 'mobile' },
  { name: 'Vodacom M-Pesa', logo: '/public/assets/images/voda.png', type: 'mobile' },
  { name: 'CRDB Bank', logo: '/public/assets/images/crdb.jpeg', type: 'bank' },
  { name: 'NMB Bank', logo: '/public/assets/images/nmb.png', type: 'bank' },
];

export default function PaymentDialog({ open, onClose, product }) {
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  if (!product) return null;

  const handleSelectProvider = (provider) => {
    setSelectedProvider(provider);
    setStep(2);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = () => {
    // Send to backend here
    console.log('Processing payment...', {
      product,
      provider: selectedProvider,
      formData
    });

    // Reset & close
    setStep(1);
    setSelectedProvider(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Payment for {product.name}</DialogTitle>

      <DialogContent>
        <Typography variant="body2" gutterBottom>
          Total Price: <strong>Tsh {product.price}</strong>
        </Typography>

        {step === 1 && (
          <>
            <Typography>Select your service provider:</Typography>
            <Grid container spacing={2} mt={1}>
              {providers.map((p, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Box
                    onClick={() => handleSelectProvider(p)}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: 2,
                      padding: 1,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f0f0f0' }
                    }}
                  >
                    <img src={p.logo} alt={p.name} width="50" height="50" />
                    <Typography variant="body2">{p.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h6" mt={2}>Provider: {selectedProvider.name}</Typography>
            <Box mt={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                margin="dense"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="dense"
                type="email"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                margin="dense"
                onChange={handleInputChange}
              />
            </Box>
            <Box mt={3}>
              <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
                Pay Tsh {product.price}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
