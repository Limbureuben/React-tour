import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../api/UserApi'
import { toast } from 'react-toastify';

export default function useRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
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
      const result = await registerUser(formData);
      
      if (result.success) {
        console.log('Registration successful:', result);
        toast.success('Registration successful!');
        // Redirect or perform post-registration actions
        navigate('/dashboard'); // Example using react-router
      } else {
        console.error('Registration failed:', result.message);
        setErrors(result.errors || { form: result.message });
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      const errorMessage = error.response?.data?.message
        || error.message
        || 'Registration failed. Please try again.';
        
      setErrors({ form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return {
    formData,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSubmit,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  };
}