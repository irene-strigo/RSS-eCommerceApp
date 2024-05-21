import React, { useEffect } from 'react';
import { useUser } from '../components/common/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const authUser = useUser();
  const navigate = useNavigate();

  const logout = async () => {
    if (!authUser.checkingAuth) {
      if (authUser.hasAuth) {
        await authUser.logOut();
      }
      navigate('/main');
    }
  };

  useEffect(() => {
    logout();
  });

  if (authUser.checkingAuth) {
    return <>Loading...</>;
  }

  return;
};

export default LogoutPage;
