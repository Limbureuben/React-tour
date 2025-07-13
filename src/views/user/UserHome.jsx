// import React, { useEffect, useState } from 'react';
// import {
//   Box, Card, CardContent, CardMedia,
//   Typography, Grid, Container
// } from '@mui/material';
// import { fetchProductUser } from '../../services/UserService'
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
//     <Box sx={{ pt: 6, pb: 4 }}> {/* Add padding top to avoid overlap with UserHeader */}
//       <UserHeader />
//       <Container sx={{ py: 4 }}>
//         {productGroups.map((group, groupIndex) => (
//           <Card key={groupIndex} sx={{ mb: 4, p: 2 }}>
//             <CardContent>
//               <Grid container spacing={2} columns={10}>
//                 {group.map((product, index) => (
//                   <Grid item xs={2} key={index}> {/* 10 columns / 5 cards = 2 columns per card */}
//                     <Card sx={{ height: '100%' }}>
//                       <CardMedia
//                         component="img"
//                         height="120"
//                         image={product.image}
//                         alt={product.name}
//                       />
//                       <CardContent sx={{ p: 1 }}>
//                         <Typography variant="body2" fontWeight="bold" noWrap>
//                           {product.name}
//                         </Typography>
//                         <Typography variant="caption" sx={{ display: 'block' }}>
//                           Tsh {product.price}
//                         </Typography>
//                         {product.discount > 0 && (
//                           <Typography
//                             variant="caption"
//                             sx={{ color: 'red', fontWeight: 'bold' }}
//                           >
//                             {product.discount}% off
//                           </Typography>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </CardContent>
//           </Card>
//         ))}
//       </Container>
//     </Box>
//   );
// }
// export default UserHome;



import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, CardMedia,
  Typography, Grid
} from '@mui/material';
import { fetchProductUser } from '../../services/UserService';
import UserHeader from './UserHeader';

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
    <Box sx={{ pt: 10, px: 8, pb: 4 }}> {/* Padding top for header, px for consistent side space */}
      <UserHeader />
      {productGroups.map((group, groupIndex) => (
        <Grid container spacing={3} columns={10} key={groupIndex} sx={{ mb: 3 }}>
          {group.map((product, index) => (
            <Grid item xs={1} key={index}>
              <Card sx={{ height: '100%', maxHeight: 220, display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="100" // Reduced height from 120
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ p: 1, flexGrow: 1 }}>
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

      ))}
    </Box>
  );
}

export default UserHome;
