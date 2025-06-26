import React from 'react';
import { 
  Box,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import { 
  Search,
  ShoppingCart,
  Person,
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';

const featuredPackages = [
  {
    id: 1,
    title: 'Premium Web Design Package',
    description: 'Complete website design with 5 pages, responsive layout, and SEO optimization',
    price: '$499',
    image: 'https://source.unsplash.com/random/300x200/?webdesign'
  },
  {
    id: 2,
    title: 'Social Media Marketing Bundle',
    description: '30 days of social media management for 3 platforms',
    price: '$299',
    image: 'https://source.unsplash.com/random/300x200/?socialmedia'
  },
  {
    id: 3,
    title: 'Professional Photography Package',
    description: '2-hour photoshoot with 50 edited high-res images',
    price: '$349',
    image: 'https://source.unsplash.com/random/300x200/?photography'
  }
];

const BusinessPlatformLanding = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header/Navigation */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PackageMarket
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit">Browse Packages</Button>
            <Button color="inherit">Sell Packages</Button>
            <Button color="inherit">How It Works</Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <ShoppingCart />
            </IconButton>
            <IconButton color="inherit">
              <Person />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Buy & Sell Business Packages
              </Typography>
              <Typography variant="h5" gutterBottom>
                Discover ready-to-use service packages or monetize your expertise
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button variant="contained" color="secondary" size="large">
                  Browse Packages
                </Button>
                <Button variant="outlined" color="inherit" size="large">
                  Sell Your Package
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={6} sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    borderRadius: 1
                  }}
                  src="https://source.unsplash.com/random/600x400/?business"
                  alt="Business packages"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search Section */}
      <Box sx={{ py: 4, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom align="center">
              Find the Perfect Business Package
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search packages..."
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1 }} />
                }}
              />
              <Button variant="contained" color="primary" size="large">
                Search
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Featured Packages */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Packages
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
          Discover popular service packages from trusted providers
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {featuredPackages.map((pkg) => (
            <Grid item key={pkg.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={pkg.image}
                  alt={pkg.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {pkg.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {pkg.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {pkg.price}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button fullWidth variant="contained">
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" size="large">
            View All Packages
          </Button>
        </Box>
      </Container>

      {/* How It Works */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ mb: 2 }}>1</Typography>
                <Typography variant="h5" gutterBottom>Create Your Package</Typography>
                <Typography>
                  Define your service package with clear deliverables, pricing, and timeline
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ mb: 2 }}>2</Typography>
                <Typography variant="h5" gutterBottom>List on Our Platform</Typography>
                <Typography>
                  Publish your package to our marketplace where businesses can discover it
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ mb: 2 }}>3</Typography>
                <Typography variant="h5" gutterBottom>Get Customers</Typography>
                <Typography>
                  Manage orders, deliver your services, and get paid securely
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Grow Your Business?
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Join thousands of professionals selling their service packages
          </Typography>
          <Button variant="contained" color="secondary" size="large">
            Get Started - It's Free
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                PackageMarket
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The premier marketplace for buying and selling business service packages
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                <Link href="#" color="inherit">About Us</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                <Link href="#" color="inherit">Careers</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                <Link href="#" color="inherit">Contact</Link>
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                <Link href="#" color="inherit">Blog</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                <Link href="#" color="inherit">Help Center</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                <Link href="#" color="inherit">Pricing</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1 }} /> contact@packagemarket.com
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1 }} /> (555) 123-4567
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1 }} /> 123 Business Ave, Suite 100
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
                <IconButton color="primary">
                  <Twitter />
                </IconButton>
                <IconButton color="primary">
                  <Instagram />
                </IconButton>
                <IconButton color="primary">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} PackageMarket. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default BusinessPlatformLanding;