import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function RegisterProductDialog({
  open,
  onClose,
  newProduct,
  onChange,
  onSubmit,
  formError,
  loading
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 1,
          bgcolor: '#f9f9f9',
          height: 400,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#06923E' }}>
        Add New Product
      </DialogTitle>

      <DialogContent
        sx={{
          overflow: 'hidden',
          p: 2,
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          {/* First Row: Name + Price */}
          <Box display="flex" gap={2}>
            <TextField
              label="Name"
              name="name"
              value={newProduct.name}
              onChange={onChange}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={onChange}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
          </Box>

          {/* Second Row: Discount + Stock */}
          <Box display="flex" gap={2}>
            <TextField
              label="Discount"
              name="discount"
              type="number"
              value={newProduct.discount}
              onChange={onChange}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={newProduct.stock}
              onChange={onChange}
              fullWidth
              variant="outlined"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
          </Box>

          {/* Third Row: Description */}
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={onChange}
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />

          {/* Image upload */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{ textTransform: 'none', bgcolor: 'white', borderRadius: 1, color: '#06923E' }}
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    onChange({
                        target: {
                        name: 'image',
                        value: file,
                        preview: URL.createObjectURL(file),
                        },
                    });
                    }
                }}
                />
            </Button>
            {newProduct.image && (
              <Box
                component="img"
                src={newProduct.image}
                alt="Preview"
                sx={{
                  width: 70,
                  height: 70,
                  objectFit: 'cover',
                  borderRadius: 1,
                  border: '1px solid #06923E',
                }}
              />
            )}
          </Box>

          {formError && (
            <Typography color="error" variant="body2">
              {formError}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={loading} variant="contained" sx={{ backgroundColor: '#06923E'}}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
