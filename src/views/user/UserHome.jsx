// import React, { useEffect, useState } from 'react';
// import {
//   Box, Card, CardContent, CardMedia,
//   Typography, Grid
// } from '@mui/material';
// import { fetchProductUser } from '../../services/UserService';
// import UserHeader from './UserHeader';

// const chunkArray = (array, size) => {
//   return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
//     array.slice(i * size, i * size + size)
//   );
// };

// function UserHome() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function loadProducts() {
//       const { products } = await fetchProductUser();
//       setProducts(products);
//     }
//     loadProducts();
//   }, []);

//   const productGroups = chunkArray(products, 10);

//   return (
//     <Box sx={{ pt: 10, px: 8, pb: 8 }}>
//       <UserHeader />
//       {productGroups.map((group, groupIndex) => (
//         <Grid container spacing={2} columns={10} key={groupIndex} sx={{ mb: 3 }}>
//           {group.map((product, index) => (
//             <Grid item xs={1} key={index} sx={{ py: 2 }}>
//               <Card sx={{ height: '100%', maxHeight: 260, display: 'flex', flexDirection: 'column' }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={product.image}
//                   alt={product.name}
//                 />
//                 <CardContent sx={{ p: 1, flexGrow: 1 }}>
//                   <Typography variant="body2" fontWeight="bold" noWrap>
//                     {product.name}
//                   </Typography>
//                   <Typography variant="caption" sx={{ display: 'block' }}>
//                     Tsh {product.price}
//                   </Typography>
//                   {product.discount > 0 && (
//                     <Typography
//                       variant="caption"
//                       sx={{ color: 'red', fontWeight: 'bold' }}
//                     >
//                       {product.discount}% off
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//       ))}
//     </Box>
//   );
// }

// export default UserHome;




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
    <Box sx={{ pt: 10 }}>
      <UserHeader />

      <Box sx={{ width: '100%', overflow: 'hidden', mt: 10, px: 3 }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            transform: 'translateX(0%)', // removed animation
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
                elevation={1}
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 250,
                  height: '100%',
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
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ borderRadius: 2 }}
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
                      sx={{ color: 'red', fontWeight: 'bold' }}
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

