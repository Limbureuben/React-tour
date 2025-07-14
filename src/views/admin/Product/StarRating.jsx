import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { Typography, Box } from '@mui/material';
import { rateProduct } from '../services/RatingService';

export default function StarRating({ productId, initialRating }) {
  const [value, setValue] = useState(initialRating || 0);
  const [loading, setLoading] = useState(false);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    setLoading(true);
    try {
      await rateProduct(productId, newValue);
      // Optionally, show toast here
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating
        name={`rating-${productId}`}
        value={value}
        precision={1}
        onChange={handleChange}
        disabled={loading}
      />
      <Typography variant="body2" sx={{ ml: 1 }}>
        {value.toFixed(1)}
      </Typography>
    </Box>
  );
}
