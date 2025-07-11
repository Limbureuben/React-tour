import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { fetchProducts, createProduct } from '../../../services/ProductService';
import RegisterProductDialog from './RegisterProduct';
import Swal from 'sweetalert2';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', discount: '', stock: '', image: ''
  });
  const [formError, setFormError] = useState('');
  const [pagination, setPagination] = useState({ page: 1, lastPage: 1 });

  useEffect(() => {
    setLoading(true);
    fetchProducts(pagination.page)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setPagination({
          page: res.current_page,
          lastPage: res.last_page
        });
        setError('');
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, [pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerSearch) ||
            product.description.toLowerCase().includes(lowerSearch) ||
            product.price.toString().includes(lowerSearch)
        )
      );
    }
  }, [searchTerm, products]);

  const handleOpenDialog = () => {
    setNewProduct({ name: '', description: '', price: '', discount: '', stock: '', image: '' });
    setFormError('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    const { name, description, price, discount, stock, image } = newProduct;
    if (!name || !description || !price || !stock) {
        setFormError('Please fill all required fields');
        return;
    }

    setLoading(true);
    try {
        const response = await createProduct({ name, description, price, discount, stock, image }); // ✅ include discount
        const updated = [...products, response.product];
        setProducts(updated);
        setFilteredProducts(updated);
        setSuccessMsg('Product added successfully');
        setOpenDialog(false);
    } catch (err) {
        setFormError(err.message || 'Error adding product');
    } finally {
        setLoading(false);
    }
    };


  return (
    <Box sx={{ flexGrow: 1, p: 0, backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <Paper sx={{ p: 3, maxWidth: 1030, margin: 'auto', borderRadius: 0, boxShadow: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#06923E' }}>
            Product Management
          </Typography>
          <IconButton onClick={handleOpenDialog} sx={{ color: '#06923E' }} size="large">
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          placeholder="Search by name, description or price"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ fontWeight: 'medium' }}>
            {error}
          </Typography>
        ) : filteredProducts.length === 0 ? (
          <Typography sx={{ fontStyle: 'italic', color: '#666' }}>No products found.</Typography>
        ) : (
          <Table sx={{ minWidth: 650, borderRadius: 0, overflow: 'hidden' }}>
            <TableHead sx={{ backgroundColor: '#06923E' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Stock</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Discount</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.discount}%</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={2}>
          <Button
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </Button>
          <Typography>
            Page {pagination.page} of {pagination.lastPage}
          </Typography>
          <Button
            disabled={pagination.page === pagination.lastPage}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMsg('')} severity="success" sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>

      <RegisterProductDialog
        open={openDialog}
        onClose={handleCloseDialog}
        newProduct={newProduct}
        onChange={handleInputChange}
        onSubmit={handleAddProduct}
        formError={formError}
        loading={loading}
      />
    </Box>
  );
}
