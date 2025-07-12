import React, { useState, useEffect, useRef } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardMedia, CardContent, Box,IconButton, Dialog, DialogContent
} from '@mui/material';
import { FavoriteBorder,Favorite,Star,LocalShipping,LocationOn,Category,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RegistrationForm from '../shared/registration'
import AuthModal from '../shared/AuthMode'
import { landingproductAPI } from '../../api/UserApi'


const theme = createTheme({
  palette: {
    primary: {
      main: '#ff385c',
    },
    secondary: {
      main: '#000000',
    },
  },
});


// function LandingPage() {
//   const [authOpen, setAuthOpen] = useState(false);
//   const [likedProperties, setLikedProperties] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const toggleLike = (propertyId) => {
//     setLikedProperties((prev) =>
//       prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
//     );
//   };

//   useEffect(() => {
//     async function loadLandingProducts() {
//       try {
//         const result = await landingproductAPI();
//         setProducts(result);
//       } catch (err) {
//         console.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadLandingProducts();
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <div className="App">
//         <AppBar position="static" color="inherit" elevation={0}>
//           <Container maxWidth="lg">
//             <Toolbar disableGutters>
//               <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#06923E' }}>
//                 Available Products
//               </Typography>
//               <Button
//                 variant="contained"
//                 sx={{
//                   borderRadius: 0,
//                   ml: 4,
//                   backgroundColor: '#06923E',
//                   color: '#fff',
//                   '&:hover': {
//                     backgroundColor: '#057A34',
//                   },
//                 }}
//                 onClick={() => setAuthOpen(true)}
//               >
//                 Sign Up
//               </Button>
//               <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
//             </Toolbar>
//           </Container>
//         </AppBar>

//         <Box sx={{ borderBottom: '1px solid #eee', py: 2 }}>
//           <Container maxWidth="lg">
//             <Grid container spacing={2} sx={{ overflowX: 'auto', flexWrap: 'nowrap', py: 1 }}>
//               {propertyTypes.map((type, index) => (
//                 <Grid key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                   <IconButton sx={{ border: '1px solid #ddd', p: 2, color: index === 0 ? '#06923E' : 'inherit' }}>
//                     {type.icon}
//                   </IconButton>
//                   <Typography variant="caption" sx={{ mt: 1 }}>
//                     {type.label}
//                   </Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </Box>

//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           {loading ? (
//             <Typography variant="h6">Loading products...</Typography>
//           ) : (
//             <Grid container spacing={4}>
//               {products.map((product) => (
//                 <Grid xs={12} sm={6} md={4} key={product.id}>
//                   <Card elevation={0} sx={{ position: 'relative' }}>
//                     <IconButton
//                       sx={{
//                         position: 'absolute',
//                         top: 10,
//                         right: 10,
//                         color: likedProperties.includes(product.id) ? '#06923E' : 'white',
//                       }}
//                       onClick={() => toggleLike(product.id)}
//                     >
//                       {likedProperties.includes(product.id) ? <Favorite /> : <FavoriteBorder />}
//                     </IconButton>
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={product.image}
//                       alt={product.name}
//                       sx={{ borderRadius: 2 }}
//                     />
//                     <CardContent sx={{ p: 0, pt: 1 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                           ${product.price}
//                           <Typography component="span" variant="body2" color="text.secondary">
//                             {' '}
//                             night
//                           </Typography>
//                         </Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Star sx={{ color: '#06923E', fontSize: '1rem' }} />
//                           <Typography variant="body2">{product.rating ?? 4.5}</Typography>
//                         </Box>
//                       </Box>
//                       <Typography variant="body1" sx={{ mt: 0.5 }}>
//                         {product.name}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
//                         <LocationOn sx={{ fontSize: '1rem', mr: 0.5 }} />
//                         {product.location ?? 'No location'}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Container>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default LandingPage;





function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [likedProperties, setLikedProperties] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidePosition, setSlidePosition] = useState(0);
  const slideRef = useRef(null);

  const toggleLike = (propertyId) => {
    setLikedProperties((prev) =>
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  useEffect(() => {
    async function loadLandingProducts() {
      try {
        const result = await landingproductAPI();
        const fullList = [...result];
        while (fullList.length < 5) fullList.push(...result);
        setProducts(fullList.slice(0, 5));
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadLandingProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setSlidePosition((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  const getTranslatedProducts = () =>
    products.slice(slidePosition).concat(products.slice(0, slidePosition));

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6">Loading products...</Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', pb: 8 }}>
        {/* Hero Header */}
        <Box
          sx={{
            py: 1,
            background: 'linear-gradient(to right, #06923E, #057A34)',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            Welcome to Our Product Showcase
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Discover great deals, beautiful homes, and more!
          </Typography>
        </Box>

        {/* Top Navigation Bar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #06923E, #057A34)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Available Products
            </Typography>

            <Button
              variant="contained"
              sx={{
                borderRadius: '999px',
                backgroundColor: '#06923E',
                color: '#fff',
                textTransform: 'none',
                px: 4,
                '&:hover': {
                  backgroundColor: '#057A34',
                },
              }}
              onClick={() => setAuthOpen(true)}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>

        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

        

        {/* Product Cards (unchanged) */}
        <Box sx={{ width: '100%', overflow: 'hidden', mt: 10 }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              transition: 'transform 0.8s ease-in-out',
              transform: 'translateX(0%)',
            }}
            ref={slideRef}
          >
            {getTranslatedProducts().map((product, index) => (
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
                <Card elevation={0} sx={{ position: 'relative', width: '100%', maxWidth: 250 }}>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      color: likedProperties.includes(product.id) ? '#06923E' : 'white',
                    }}
                    onClick={() => toggleLike(product.id)}
                  >
                    {likedProperties.includes(product.id) ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ borderRadius: 2 }}
                  />
                  <CardContent sx={{ p: 0, pt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Tsh {product.price}
                        <Typography component="span" variant="body2" color="text.secondary">
                          {' '}night
                        </Typography>
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ color: '#06923E', fontSize: '1rem' }} />
                        <Typography variant="body2">{product.rating ?? 4.5}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>{product.name}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;