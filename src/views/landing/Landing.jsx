import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Chip,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  Stack
} from '@mui/material';
import {
  Search,
  FavoriteBorder,
  Favorite,
  Star,
  LocationOn,
  Home,
  Apartment,
  Villa,
  Cabin,
  BeachAccess,
  Castle
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const propertyTypes = [
  { icon: <Home />, label: 'Houses' },
  { icon: <Apartment />, label: 'Apartments' },
];

const properties = [
  {
    id: 1,
    title: 'Modern Loft in Downtown',
    location: 'New York, NY',
    price: 120,
    rating: 4.92,
    image: '/assets/images/bed1.jpeg',
    type: 'Apartment'
  },
  {
    id: 2,
    title: 'Beachfront Villa with Pool',
    location: 'Miami, FL',
    price: 350,
    rating: 4.85,
    image: '/assets/images/bed2.jpeg',
    type: 'Villa'
  },
  {
    id: 3,
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, CO',
    price: 180,
    rating: 4.79,
    image: '/assets/images/bed3.jpeg',
    type: 'Cabin'
  },
  {
    id: 4,
    title: 'Stylish City Apartment',
    location: 'Chicago, IL',
    price: 95,
    rating: 4.88,
    image: '/assets/images/bed4.jpeg',
    type: 'Apartment'
  },
  {
    id: 5,
    title: 'Luxury Penthouse with View',
    location: 'Los Angeles, CA',
    price: 400,
    rating: 4.95,
    image: '/assets/images/bed5.jpeg',
    type: 'Apartment'
  },
];

function LandingPage() {
  const [likedProperties, setLikedProperties] = React.useState([]);

  const toggleLike = (propertyId) => {
    if (likedProperties.includes(propertyId)) {
      setLikedProperties(likedProperties.filter(id => id !== propertyId));
    } else {
      setLikedProperties([...likedProperties, propertyId]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static" color="inherit" elevation={0}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography variant="h6" component="div" sx={{ 
                flexGrow: 1,
                fontWeight: 'bold',
                color: 'primary.main'
              }}>
                Booking
              </Typography>
              <Button variant="text" sx={{ fontWeight: 'bold' }}>Become a Host</Button>
              <Button variant="contained" color="primary" sx={{ borderRadius: 20, ml: 2 }}>Sign Up</Button>
            </Toolbar>
          </Container>
        </AppBar>

        <Box sx={{ borderBottom: '1px solid #eee', py: 2 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} sx={{ overflowX: 'auto', flexWrap: 'nowrap', py: 1 }}>
              {propertyTypes.map((type, index) => (
                <Grid item key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IconButton sx={{ 
                    border: '1px solid #ddd',
                    p: 2,
                    color: index === 0 ? 'primary.main' : 'inherit'
                  }}>
                    {type.icon}
                  </IconButton>
                  <Typography variant="caption" sx={{ mt: 1 }}>{type.label}</Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card elevation={0} sx={{ position: 'relative' }}>
                  <IconButton 
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10,
                      color: likedProperties.includes(property.id) ? 'primary.main' : 'white'
                    }}
                    onClick={() => toggleLike(property.id)}
                  >
                    {likedProperties.includes(property.id) ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.image}
                    alt={property.title}
                    sx={{ borderRadius: 2 }}
                  />
                  <CardContent sx={{ p: 0, pt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        ${property.price}
                        <Typography component="span" variant="body2" color="text.secondary"> night</Typography>
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ color: 'primary.main', fontSize: '1rem' }} />
                        <Typography variant="body2">{property.rating}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>{property.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ fontSize: '1rem', mr: 0.5 }} />
                      {property.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;