import React from 'react';

import Input from './common/Input';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: string;
  country: string;
  postIndex: string;
  city: string;
  street: string;
};

type Props = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

const DeliveryAddress = ({ userData, setUserData }: Props) => {
  return (
    <fieldset>
      <legend>Delivery Address</legend>
      <label>
        Country:{' '}
        <Input
          value={userData.country}
          name={'country'}
          placeholder={'Enter your country'}
          type={'text'}
          onChange={(e) => setUserData({ ...userData, country: e.target.value })}
        />
      </label>
      <label>
        Post index:{' '}
        <Input
          value={userData.postIndex}
          name={'index'}
          placeholder={'Enter your post index'}
          type={'text'}
          onChange={(e) => setUserData({ ...userData, postIndex: e.target.value })}
        />
      </label>
      <label>
        City:{' '}
        <Input
          value={userData.city}
          name={'city'}
          placeholder={'Enter your city'}
          type={'text'}
          onChange={(e) => setUserData({ ...userData, city: e.target.value })}
        />
      </label>
      <label>
        Street:{' '}
        <Input
          value={userData.street}
          name={'street'}
          placeholder={'Enter your street'}
          type={'text'}
          onChange={(e) => setUserData({ ...userData, street: e.target.value })}
        />
      </label>
    </fieldset>
  );
};

export default DeliveryAddress;
