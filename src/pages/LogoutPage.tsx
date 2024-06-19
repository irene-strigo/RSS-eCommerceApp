import React, { useEffect } from 'react';
import { useUser } from '../components/common/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCartItems } from '../components/common/CartItemsContext';

const LogoutPage = () => {
  const authUser = useUser();
  const navigate = useNavigate();
  const { recreateCart } = useCartItems();

  const logout = async () => {
    if (!authUser.checkingAuth) {
      if (authUser.hasAuth) {
        await authUser.logOut();
        await recreateCart();
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
