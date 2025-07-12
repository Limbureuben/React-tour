import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function EditProductDialog({
  open,
  onClose,
  product,
  onChange,
  onSubmit,
  formError,
  loading
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Edit Product
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={onChange}
            fullWidth
            multiline
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Discount"
            name="discount"
            type="number"
            value={product.discount}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={onChange}
            fullWidth
          />

          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Change Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onChange({
                      target: {
                        name: 'image',
                        value: e.target.files[0],
                        preview: URL.createObjectURL(e.target.files[0])
                      }
                    });
                  }
                }}
              />
            </Button>
            {product?.imagePreview || product?.image ? (
              <img
                src={product.imagePreview || product.image}
                alt="Preview"
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
              />
            ) : null}
          </Box>

          {formError && <Typography color="error">{formError}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={loading} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
