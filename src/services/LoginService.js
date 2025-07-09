import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../api/UserApi'
import { toast } from 'react-toastify';
import { Password } from "@mui/icons-material";

export default function LoginRegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
        try {
        const result = await loginUser(formData);

        if (result.success) {
           localStorage.setItem('authToken', result.token);
           localStorage.setItem('user', JSON.stringify(result.user));

          toast.success('Login successful!');

          const role = result.user.role;

          if(role === 'staff') {
            navigate('/admin-dashboard');
          } else if (role === 'user') {
            navigate('/user-dashboard');
          } else {
            navigate('/');
          }
        } else {
          console.error('Login failed:', result.message);
          setErrors(result.errors || { form: result.message });
          toast.error(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        
        const errorMessage = error.response?.data?.message
        || error.message
        || 'Login failed. Please try again.';
        
        setErrors({ form: errorMessage });
        toast.error(errorMessage);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return {
    formData,
    errors,
    isSubmitting,
    showPassword,
    handleChange,
    handleSubmit,
    handleClickShowPassword,
  };
}