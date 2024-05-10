import React from 'react';

import { Header, Footer, PageWrapper } from '../components';

/*const handleSubmit = () => {
  console.log('Submit');
};*/

const MainPage = () => {
  return (
    <>
      <PageWrapper>
        <Header />
        <div>Main Page</div>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default MainPage;
