// import React, { useState } from 'react';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, Typography, Box, Grid, TextField, Divider
// } from '@mui/material';
// import { createPayment } from '../../services/ProductService'

// const providers = [
//   { name: 'Yas', logo: '/assets/images/yas.png', type: 'mobile' },
//   { name: 'Airtel', logo: '/assets/images/airtel.png', type: 'mobile' },
//   { name: 'Halotel', logo: '/assets/images/halotel.jpeg', type: 'mobile' },
//   { name: 'Vodacom', logo: '/assets/images/voda.png', type: 'mobile' },
// ];

// export default function PaymentDialog({ open, onClose, product }) {
//   const [step, setStep] = useState(1);
//   const [selectedProvider, setSelectedProvider] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '+255'
//   });

//   if (!product) return null;

//   const handleSelectProvider = (provider) => {
//     setSelectedProvider(provider);
//     setStep(2);
//   };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'phone') {
//             // Force prefix +255 if user deletes it
//             if (!value.startsWith('+255')) {
//             setFormData(prev => ({ ...prev, phone: '+255' }));
//             return;
//             }
//         }
//         setFormData(prev => ({ ...prev, [name]: value }));
//         };


//   const handlePayment = () => {
//     try {
//         const response = createPayment({
//             productId: product.id,
//             provider: selectedProvider.name,
//             ...formData
//         });
//         console.log('Payment success:', response);

//         setStep(1);
//         setSelectedProvider(null);
//         onClose();
//     } catch (error) {
//         alert('Payment failed: ' + error.message);
//     }
//   };

//   // Handle Cancel button on form to return to provider selection
//   const handleFormCancel = () => {
//     setStep(1);
//     setSelectedProvider(null);
//     setFormData({ username: '', email: '', phone: '' });
//   };

//   const renderProviderGrid = () => (
//     <Grid container spacing={2} mt={1}>
//       {providers.map((p, index) => (
//         <Grid item xs={6} sm={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
//           <Box
//             onClick={() => handleSelectProvider(p)}
//             sx={{
//               borderRadius: 2,
//               padding: 1.5,
//               textAlign: 'center',
//               cursor: 'pointer',
//               '&:hover': { backgroundColor: '#f5f5f5' },
//               width: 110,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: 1
//             }}
//           >
//             <img src={p.logo} alt={p.name} style={{ width: 50, height: 50, objectFit: 'contain' }} />
//             <Typography variant="body2" mt={1}>{p.name}</Typography>
//           </Box>
//         </Grid>
//       ))}
//     </Grid>
//   );

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//         <DialogTitle
//         sx={{
//             textAlign: 'center',
//             color: 'green',
//             fontWeight: 'bold',
//             fontSize: '1.2rem',
//         }}
//         >
//         PAYMENT FOR {product.name}
//         </DialogTitle>

//       <DialogContent>
//         <Typography variant="body2" gutterBottom sx={{
//             textAlign: 'center',
//             color: 'green',
//             fontWeight: 'bold',
//         }}>
//           Total Price: <strong>Tsh {product.price} /=</strong>
//         </Typography>

//         {step === 1 && (
//           <>
//             <Typography variant="subtitle1" mt={2}>Pay via Mobile phone</Typography>
//             {renderProviderGrid()}
//             <Divider sx={{ my: 3 }} />
//           </>
//         )}

//         {step === 2 && selectedProvider && (
//           <>
//             <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//               <img
//                 src={selectedProvider.logo}
//                 alt={selectedProvider.name}
//                 style={{ width: 80, height: 80, objectFit: 'contain' }}
//               />
//             </Box>

//             <Typography variant="h6" align="center" gutterBottom>
//               {selectedProvider.name} Payment Details
//             </Typography>

//             <Box mt={2}>
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phone"
//                 margin="dense"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mt={3} display="flex" gap={2}>
//               <Button variant="outlined" color="secondary" onClick={handleFormCancel} fullWidth>
//                 Cancel
//               </Button>
//               <Button variant="contained" sx={{ backgroundColor: '#06923E'}} onClick={handlePayment} fullWidth>
//                 Pay Tsh {product.price}
//               </Button>
//             </Box>
//           </>
//         )}
//       </DialogContent>

//       {/* Only show this Cancel button on the provider selection page */}
//       {step === 1 && (
//         <DialogActions>
//           <Button onClick={onClose} color="secondary">Close</Button>
//         </DialogActions>
//       )}
//     </Dialog>
//   );
// }




import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, CircularProgress, Box
} from '@mui/material';
import { initiatePayment } from '../../services/ProductService';

const PaymentDialog = ({ open, onClose, product }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handlePay = async () => {
    if (!phone || !product) return;
    setLoading(true);
    try {
      const res = await initiatePayment(phone, product.price);
      if (res.redirect_url) {
        setPaymentUrl(res.redirect_url);
      } else {
        alert('Failed to get payment URL');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIframeLoad = () => setIframeLoaded(true);

  const resetDialog = () => {
    setPhone('');
    setLoading(false);
    setPaymentUrl(null);
    setIframeLoaded(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={resetDialog}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          paddingX: 2,
          paddingY: 1.5,
          backgroundColor: '#fafafa',
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        PAYMENTS FOR <span style={{ color: '#06923E' }}>{product?.name}</span>
      </DialogTitle>

      <DialogContent>
        {!paymentUrl ? (
          <>
            <Typography variant="body1" sx={{ mb: 0, textAlign: 'center' }}>
              Enter your phone number to receive the payment prompt:
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="e.g. 255712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#06923E',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#06923E',
                  },
                },
              }}
            />
          </>
        ) : (
          <Box sx={{ height: 400, position: 'relative', borderRadius: 0, overflow: 'hidden' }}>
            {!iframeLoaded && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            )}
            <iframe
              src={paymentUrl}
              title="Pesapal Payment"
              width="100%"
              height="100%"
              style={{ border: 'none', display: iframeLoaded ? 'block' : 'none' }}
              onLoad={handleIframeLoad}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
        <Button onClick={resetDialog} variant="outlined" color="error" disabled={loading}>
          Close
        </Button>
        {!paymentUrl && (
          <Button onClick={handlePay} variant="contained" disabled={loading} sx={{ ml: 2, backgroundColor: '#06923E', color: '#fff' }}>
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Pay Now'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;

