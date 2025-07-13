import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, CardMedia,
  Typography, Grid, Container
} from '@mui/material';
import { fetchProductUser } from '../../services/UserService'

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

function UserHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { products } = await fetchProductUser();
      setProducts(products);
    }
    loadProducts();
  }, []);

  const productGroups = chunkArray(products, 10);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>

      {productGroups.map((group, groupIndex) => (
        <Card key={groupIndex} sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              {group.map((product, index) => (
                <Grid item xs={12} sm={6} md={2.4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="body2" fontWeight="bold" noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        Tsh {product.price}
                      </Typography>
                      {product.discount > 0 && (
                        <Typography
                          variant="caption"
                          sx={{ color: 'red', fontWeight: 'bold' }}
                        >
                          {product.discount}% off
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default UserHome;
