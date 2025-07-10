import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUsers, deleteUser } from '../../services/UserService';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchUsers()
      .then((usersData) => {
        if (Array.isArray(usersData)) {
          setUsers(usersData);
          setError('');
        } else {
          setUsers([]);
          setError('Invalid response format: expected an array of users.');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch users');
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
  const result = await MySwal.fire({
    title: 'Are you sure?',
    text: 'You won’t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));

      MySwal.fire('Deleted!', 'The user has been removed.', 'success');
    } catch (err) {
      MySwal.fire('Error!', err.message, 'error');
    }
  }
};

  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Paper sx={{ p: 3, maxWidth: 900, margin: 'auto', borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          User Management
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ fontWeight: 'medium' }}>
            {error}
          </Typography>
        ) : users.length === 0 ? (
          <Typography sx={{ fontStyle: 'italic', color: '#666' }}>No users found.</Typography>
        ) : (
          <Table sx={{ minWidth: 650, borderRadius: 2, overflow: 'hidden' }}>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    '&:hover': { backgroundColor: '#e3f2fd' },
                    cursor: 'default',
                  }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
    </Box>
  );
}