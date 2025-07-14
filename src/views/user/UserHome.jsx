import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Card, CardContent, CardMedia, Typography, IconButton
} from '@mui/material';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
import { fetchProductUser } from '../../services/UserService';
import UserHeader from './UserHeader';

function UserHome() {
  const [products, setProducts] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);
  const slideRef = useRef(null);

  useEffect(() => {
    async function loadProducts() {
      const { products } = await fetchProductUser();
      setProducts(products);
    }
    loadProducts();
  }, []);

  const toggleLike = (productId) => {
    setLikedProperties((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <Box sx={{ pt: 1 }}>
      <UserHeader />

      <Box sx={{ width: '100%', overflowY: 'visible', mt: 10, px: 3 }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            transform: 'translateX(0%)',
          }}
          ref={slideRef}
        >
          {products.map((product, index) => (
            <Box
              key={product.id + '-' + index}
              sx={{
                flex: '0 0 20%',
                px: 1,
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                elevation={0}
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 250,
                  height: '100%',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
                }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: likedProperties.includes(product.id)
                      ? '#06923E'
                      : 'white',
                  }}
                  onClick={() => toggleLike(product.id)}
                >
                  {likedProperties.includes(product.id)
                    ? <Favorite />
                    : <FavoriteBorder />}
                </IconButton>

                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: 160,
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />


                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Tsh {product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ color: '#06923E', fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {product.rating ?? 4.5}
                      </Typography>
                    </Box>
                  </Box>

                  {product.discount > 0 && (
                    <Typography
                      variant="body2"
                      sx={{ color: 'red', textDecoration: 'line-through', fontWeight: 'bold' }}
                    >
                      {product.discount}% off
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UserHome;

