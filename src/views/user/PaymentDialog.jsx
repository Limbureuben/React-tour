import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Grid, TextField, Divider
} from '@mui/material';

const providers = [
  { name: 'Yas', logo: '/assets/images/yas.png', type: 'mobile' },
  { name: 'Airtel', logo: '/assets/images/airtel.png', type: 'mobile' },
  { name: 'Halotel', logo: '/assets/images/halotel.jpeg', type: 'mobile' },
  { name: 'Vodacom', logo: '/assets/images/voda.png', type: 'mobile' },
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

  // Handle Cancel button on form to return to provider selection
  const handleFormCancel = () => {
    setStep(1);
    setSelectedProvider(null);
    setFormData({ username: '', email: '', phone: '' });
  };

  const renderProviderGrid = () => (
    <Grid container spacing={2} mt={1}>
      {providers.map((p, index) => (
        <Grid item xs={6} sm={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            onClick={() => handleSelectProvider(p)}
            sx={{
              borderRadius: 2,
              padding: 1.5,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' },
              width: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <img src={p.logo} alt={p.name} style={{ width: 50, height: 50, objectFit: 'contain' }} />
            <Typography variant="body2" mt={1}>{p.name}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Payment for {product.name}</DialogTitle>

      <DialogContent>
        <Typography variant="body2" gutterBottom>
          Total Price: <strong>Tsh {product.price}</strong>
        </Typography>

        {step === 1 && (
          <>
            <Typography variant="subtitle1" mt={2}>Pay via Mobile phone</Typography>
            {renderProviderGrid()}
            <Divider sx={{ my: 3 }} />
          </>
        )}

        {step === 2 && selectedProvider && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img
                src={selectedProvider.logo}
                alt={selectedProvider.name}
                style={{ width: 80, height: 80, objectFit: 'contain' }}
              />
            </Box>

            <Typography variant="h6" align="center" gutterBottom>
              {selectedProvider.name} Payment Details
            </Typography>

            <Box mt={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                margin="dense"
                value={formData.username}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="dense"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                margin="dense"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Box>
            <Box mt={3} display="flex" gap={2}>
              <Button variant="outlined" color="secondary" onClick={handleFormCancel} fullWidth>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handlePayment} fullWidth>
                Pay Tsh {product.price}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>

      {/* Only show this Cancel button on the provider selection page */}
      {step === 1 && (
        <DialogActions>
          <Button onClick={onClose} color="secondary">Close</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
