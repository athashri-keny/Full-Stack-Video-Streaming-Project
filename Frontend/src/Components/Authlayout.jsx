import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log('authStatus:', authStatus);
    if (authStatus === undefined) {
      return;
    }
    
  
    if (authentication && !authStatus) {
      console.log('Redirecting to /login');
      navigate('/login');
    } else if (!authentication && authStatus) {
      console.log('Redirecting to /');
      navigate('/');
    }
  
    setLoading(false);
  }, [authStatus, navigate, authentication]);
  
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
