import React from 'react';
import Button from '../Button';  // Assume this renders a <button> element
import { useNavigate } from 'react-router-dom';

function UserInfoButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/userinfo');
  };

  return (
    <Button onClick={handleClick}>
    </Button>
  );
}

export default UserInfoButton;
