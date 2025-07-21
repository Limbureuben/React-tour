import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('authToken');
    navigate('/');
  }
  return logout;
}