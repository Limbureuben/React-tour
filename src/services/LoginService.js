// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from '../api/UserApi';
// import { toast } from 'react-toastify';

// export default function LoginRegistrationForm() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.username) newErrors.username = 'Username is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const result = await loginUser(formData);

//       if (result.success) {
//         localStorage.setItem('authToken', result.token);
//         localStorage.setItem('user', JSON.stringify(result.user));

//         toast.success('Login successful!');

//         // Navigate based on role
//         if (result.user.role === 'staff') {
//           navigate('/admin-dashboard');
//         } else if (result.user.role === 'user') {
//           navigate('/user-dashboard');
//         } else {
//           // Default or unknown role
//           navigate('/');
//         }
//       } else {
//         setErrors(result.errors || { form: result.message });
//         toast.error(result.message || 'Login failed');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message || 'Login failed';
//       setErrors({ form: errorMessage });
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//     setFormData({ username: '', password: '' });
//   };

//   const handleClickShowPassword = () => setShowPassword((prev) => !prev);

//   return {
//     formData,
//     errors,
//     isSubmitting,
//     showPassword,
//     handleChange,
//     handleSubmit,
//     handleClickShowPassword,
//   };
// }




// LoginService.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/UserApi";
import { toast } from "react-toastify";

export default function LoginRegistrationForm(onClose) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await loginUser(formData);

      if (result.success) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Login successful!");

        // 🔥 Navigate based on role
        if (result.user.role === "staff") {
          navigate("/admin-dashboard");
        } else if (result.user.role === "user") {
          navigate("/user-dashboard");
        } else {
          navigate("/");
        }
        onClose?.();
      } else {
        setErrors(result.errors || { form: result.message });
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      setErrors({ form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }

    setFormData({ username: "", password: "" });
  };

  const handleClickShowPassword = () =>
    setShowPassword((prev) => !prev);

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

