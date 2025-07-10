// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   IconButton,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { fetchUsers, deleteUser } from '../../services/UserService';
// import AddIcon from '@mui/icons-material/Add';

// export default function Home() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');
//   const MySwal = withReactContent(Swal);

//   useEffect(() => {
//     fetchUsers()
//       .then((usersData) => {
//         if (Array.isArray(usersData)) {
//           setUsers(usersData);
//           setError('');
//         } else {
//           setUsers([]);
//           setError('Invalid response format: expected an array of users.');
//         }
//       })
//       .catch((err) => {
//         setError(err.message || 'Failed to fetch users');
//         setUsers([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleDelete = async (id) => {
//   const result = await MySwal.fire({
//     title: 'Are you sure?',
//     text: 'You won’t be able to revert this!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#06923E',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!',
//   });

//   if (result.isConfirmed) {
//     try {
//       await deleteUser(id);
//       setUsers(users.filter((user) => user.id !== id));

//       MySwal.fire('Deleted!', 'The user has been removed.', 'success');
//     } catch (err) {
//       MySwal.fire('Error!', err.message, 'error');
//     }
//   }
// };

//   return (
//     <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#f5f7fa', minHeight: '82vh' }}>
//       <Paper sx={{ p: 1, maxWidth: 1300, margin: 'auto', borderRadius: 1, boxShadow: 3 }}>
//         <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#06923E' }}>
//           User Management
//         </Typography>

//         {loading ? (
//           <Box display="flex" justifyContent="center" p={4}>
//             <CircularProgress color="primary" />
//           </Box>
//         ) : error ? (
//           <Typography color="error" sx={{ fontWeight: 'medium' }}>
//             {error}
//           </Typography>
//         ) : users.length === 0 ? (
//           <Typography sx={{ fontStyle: 'italic', color: '#666' }}>No users found.</Typography>
//         ) : (
//           <Table sx={{ minWidth: 650, borderRadius: 0, overflow: 'hidden' }}>
//             <TableHead sx={{ backgroundColor: '#06923E' }}>
//               <TableRow>
//                 <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
//                 <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Username</TableCell>
//                 <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
//                 <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
//                 <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow
//                   key={user.id}
//                   sx={{
//                     '&:hover': { backgroundColor: '#e3f2fd' },
//                     cursor: 'default',
//                   }}
//                 >
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.username}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       aria-label="delete"
//                       color="error"
//                       onClick={() => handleDelete(user.id)}
//                       size="small"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </Paper>

//       <Snackbar
//         open={!!successMsg}
//         autoHideDuration={3000}
//         onClose={() => setSuccessMsg('')}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSuccessMsg('')} severity="success" sx={{ width: '100%' }}>
//           {successMsg}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }






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
import { fetchUsers, deleteUser, createUser } from '../../services/UserService';
import RegisterUserDialog from '../../views/admin/RegisterUserDialog';
import Swal from 'sweetalert2';


export default function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });
  const [formError, setFormError] = useState('');
  const [pagination, setPagination] = useState({ page: 1, lastPage: 1 });


//   const handlePageChange = (newPage) => {
//   setLoading(true);
//   fetchUsers(newPage)
//     .then((data) => {
//       setUsers(data.data);
//       setFilteredUsers(data.data);
//       setPagination({ page: data.current_page, lastPage: data.last_page });
//     })
//     .catch((err) => setError(err.message))
//     .finally(() => setLoading(false));
// };

  useEffect(() => {
    setLoading(true);
    fetchUsers(pagination.page)
      .then((usersObj) => {
        if (usersObj && Array.isArray(usersObj.data)) {
          setUsers(usersObj.data);
          setFilteredUsers(usersObj.data);
          setPagination({
            page: usersObj.current_page,
            lastPage: usersObj.last_page,
          });
          setError('');
        } else {
          setUsers([]);
          setFilteredUsers([]);
          setError('Invalid response format: expected Users.data array.');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch users');
        setUsers([]);
        setFilteredUsers([]);
      })
      .finally(() => setLoading(false));
  }, [pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };


  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.username.toLowerCase().includes(lowerSearch) ||
            user.email.toLowerCase().includes(lowerSearch) ||
            user.role.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [searchTerm, users]);

  const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#06923E',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete user',
  }).then((result) => {
    if (result.isConfirmed) {
      setLoading(true);
      deleteUser(id)
        .then(() => {
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          setSuccessMsg('User deleted successfully');
          setError('');
        })
        .catch((err) => {
          setError(err.message || 'Failed to delete user');
        })
        .finally(() => setLoading(false));
    }
  });
};


  const handleOpenDialog = () => {
    setNewUser({ username: '', email: '', role: '' });
    setFormError('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    const { username, email, role } = newUser;
    if (!username || !email || !role) {
      setFormError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      const createdUser = await createUser(newUser);
      const updatedUsers = [...users, createdUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setSuccessMsg('User added successfully');
      setOpenDialog(false);
      setFormError('');
    } catch (err) {
      setFormError(err.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 0, backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <Paper sx={{ p: 3, maxWidth: 1030, margin: 'auto', borderRadius: 0, boxShadow: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#06923E' }}>
            User Management
          </Typography>
          <IconButton onClick={handleOpenDialog} sx={{ color: '#06923E'}} size="large">
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          placeholder="Search by username, email or role"
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
        ) : filteredUsers.length === 0 ? (
          <Typography sx={{ fontStyle: 'italic', color: '#666' }}>No users found.</Typography>
        ) : (
          <Table sx={{ minWidth: 650, borderRadius: 0, overflow: 'hidden' }}>
            <TableHead sx={{ backgroundColor: '#06923E' }}>
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
              {filteredUsers.map((user) => (
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
        <Button
        disabled={pagination.page === 1}
        onClick={() => handlePageChange(pagination.page - 1)}
      >
        Previous
      </Button>
      <Typography mx={2}>
        Page {pagination.page} of {pagination.lastPage}
      </Typography>
      <Button
        disabled={pagination.page === pagination.lastPage}
        onClick={() => handlePageChange(pagination.page + 1)}
      >
        Next
      </Button>

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

      <RegisterUserDialog
        open={openDialog}
        onClose={handleCloseDialog}
        newUser={newUser}
        onChange={handleInputChange}
        onSubmit={handleAddUser}
        formError={formError}
        loading={loading}
      />
    </Box>
  );
}