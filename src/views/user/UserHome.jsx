// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Box, Card, CardContent, CardMedia, Typography, IconButton
// } from '@mui/material';
// import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
// import { fetchProductUser } from '../../services/UserService';
// import UserHeader from './UserHeader';

// function UserHome() {
//   const [products, setProducts] = useState([]);
//   const [likedProperties, setLikedProperties] = useState([]);
//   const slideRef = useRef(null);

//   useEffect(() => {
//     async function loadProducts() {
//       const { products } = await fetchProductUser();
//       setProducts(products);
//     }
//     loadProducts();
//   }, []);

//   const toggleLike = (productId) => {
//     setLikedProperties((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   return (
//     <Box sx={{ pt: 1 }}>
//       <UserHeader />

//       <Box sx={{ width: '100%', overflowY: 'visible', mt: 10, px: 3 }}>
//         <Box
//           sx={{
//             display: 'flex',
//             width: '100%',
//             transform: 'translateX(0%)',
//           }}
//           ref={slideRef}
//         >
//           {products.map((product, index) => (
//             <Box
//               key={product.id + '-' + index}
//               sx={{
//                 flex: '0 0 20%',
//                 px: 1,
//                 boxSizing: 'border-box',
//                 display: 'flex',
//                 justifyContent: 'center',
//               }}
//             >
//               <Card
//                 elevation={0}
//                 sx={{
//                   position: 'relative',
//                   width: '100%',
//                   maxWidth: 250,
//                   height: '100%',
//                   boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
//                 }}
//               >
//                 <IconButton
//                   sx={{
//                     position: 'absolute',
//                     top: 10,
//                     right: 10,
//                     color: likedProperties.includes(product.id)
//                       ? '#06923E'
//                       : 'white',
//                   }}
//                   onClick={() => toggleLike(product.id)}
//                 >
//                   {likedProperties.includes(product.id)
//                     ? <Favorite />
//                     : <FavoriteBorder />}
//                 </IconButton>

//                 <CardMedia
//                   component="img"
//                   image={product.image}
//                   alt={product.name}
//                   sx={{
//                     height: 160,
//                     width: '100%',
//                     objectFit: 'cover',
//                     borderRadius: 1,
//                   }}
//                 />


//                 <CardContent sx={{ p: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                       Tsh {product.price}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Star sx={{ color: '#06923E', fontSize: '1rem' }} />
//                       <Typography variant="body2">
//                         {product.rating ?? 4.5}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {product.discount > 0 && (
//                     <Typography
//                       variant="body2"
//                       sx={{ color: 'red', textDecoration: 'line-through', fontWeight: 'bold' }}
//                     >
//                       {product.discount}% off
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default UserHome;


// import React, { useEffect, useState } from 'react';
// import {
//   Box, Card, CardContent, CardMedia, Typography,
//   IconButton, Pagination, Grid
// } from '@mui/material';
// import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
// import { fetchProductUser } from '../../services/UserService';
// import UserHeader from './UserHeader';

// const PRODUCTS_PER_PAGE = 10;

// function UserHome() {
//   const [products, setProducts] = useState([]);
//   const [likedProperties, setLikedProperties] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     async function loadProducts() {
//       const { products } = await fetchProductUser();
//       setProducts(products);
//     }
//     loadProducts();
//   }, []);

//   const toggleLike = (productId) => {
//     setLikedProperties((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
//   const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
//   const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

//   // Split into two rows
//   const firstRow = currentProducts.slice(0, 5);
//   const secondRow = currentProducts.slice(5, 10);

//   const renderProductCard = (product, index) => (
//     <Grid item xs={12} sm={6} md={2.4} key={product.id + '-' + index}>
//       <Card
//         elevation={0}
//         sx={{
//           position: 'relative',
//           maxWidth: 250,
//           height: '100%',
//           boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
//         }}
//       >
//         <IconButton
//           sx={{
//             position: 'absolute',
//             top: 10,
//             right: 10,
//             color: likedProperties.includes(product.id) ? '#06923E' : 'white',
//           }}
//           onClick={() => toggleLike(product.id)}
//         >
//           {likedProperties.includes(product.id) ? <Favorite /> : <FavoriteBorder />}
//         </IconButton>

//         <CardMedia
//           component="img"
//           image={product.image}
//           alt={product.name}
//           sx={{
//             height: 160,
//             width: '100%',
//             objectFit: 'cover',
//             borderRadius: 1,
//           }}
//         />

//         <CardContent sx={{ p: 1 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//               Tsh {product.price}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Star sx={{ color: '#06923E', fontSize: '1rem' }} />
//               <Typography variant="body2">
//                 {product.rating ?? 4.5}
//               </Typography>
//             </Box>
//           </Box>
//           {product.discount > 0 && (
//             <Typography
//               variant="body2"
//               sx={{
//                 color: 'red',
//                 textDecoration: 'line-through',
//                 fontWeight: 'bold',
//               }}
//             >
//               {product.discount}% off
//             </Typography>
//           )}
//         </CardContent>
//       </Card>
//     </Grid>
//   );

//   return (
//     <Box sx={{ pt: 1 }}>
//       <UserHeader />

//       <Box sx={{ mt: 10, px: 3 }}>
//         <Grid container spacing={2} justifyContent="center">
//           {firstRow.map(renderProductCard)}
//         </Grid>

//         <Grid container spacing={2} justifyContent="center" sx={{ mt: 1 }}>
//           {secondRow.map(renderProductCard)}
//         </Grid>

//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={(e, page) => setCurrentPage(page)}
//             color="primary"
//             shape="rounded"
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default UserHome;




import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, CardMedia, Typography,
  IconButton, Pagination, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
import StarRating from '../admin/Product/StarRating'
import { fetchProductUser } from '../../services/UserService';
import UserHeader from './UserHeader';

const PRODUCTS_PER_PAGE = 10;

function UserHome() {
  const [products, setProducts] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const openDialog = (product) => {
    setSelectedProduct(product);
    setOpenRatingDialog(true);
  };

  const closeDialog = () => {
    setOpenRatingDialog(false);
    setSelectedProduct(null);
  };

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const rows = [currentProducts.slice(0, 5), currentProducts.slice(5, 10)];

  return (
    <Box sx={{ pt: 1 }}>
      <UserHeader />

      <Box sx={{ width: '100%', overflowY: 'visible', mt: 10, px: 3 }}>
        {rows.map((row, rowIndex) => (
          <Box
            key={`row-${rowIndex}`}
            sx={{
              display: 'flex',
              width: '100%',
              mb: 2,
            }}
          >
            {row.map((product, index) => (
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Tsh {product.price}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => openDialog(product)}>
                        <Star sx={{ color: '#06923E', fontSize: '1rem', mr: 0.5 }} />
                        <Typography variant="body2">
                          {product.average_rating?.toFixed(1) ?? '0.0'}
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 1, color: '#06923E', fontWeight: 'bold' }}>
                          (Rate)
                        </Typography>
                      </Box>
                    </Box>

                    {product.discount > 0 && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'red',
                          textDecoration: 'line-through',
                          fontWeight: 'bold'
                        }}
                      >
                        {product.discount}% off
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Box>

      {/* Rating Dialog */}
      <Dialog open={openRatingDialog} onClose={closeDialog}>
        <DialogTitle>Rate {selectedProduct?.name}</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <StarRating
              productId={selectedProduct.id}
              initialRating={selectedProduct.average_rating}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserHome;

