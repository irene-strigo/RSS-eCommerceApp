import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/common/CommonStyles';

const EmptyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/main');
  });

  return <PageWrapper></PageWrapper>;
};

export default EmptyPage;
