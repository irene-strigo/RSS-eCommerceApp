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

const PersonalData = ({ userData, setUserData }: Props) => {
  return (
    <fieldset>
      <legend>Personal Information</legend>
      <Input
        name={'firstName'}
        placeholder={'Enter your first name'}
        type={'text'}
        value={userData.firstName}
        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
      />
      <Input
        value={userData.lastName}
        name={'lastName'}
        placeholder={'Enter your last name'}
        type={'text'}
        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
      />
      <Input
        value={userData.email}
        name={'email'}
        placeholder={'Enter your email'}
        type={'email'}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <Input
        value={userData.password}
        name={'password'}
        placeholder={'Enter your password'}
        type={'password'}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <label>Enter your date of birth:</label>
      <Input
        value={userData.birthDay}
        name={'birthDate'}
        type={'date'}
        onChange={(e) => setUserData({ ...userData, birthDay: e.target.value })}
      />
    </fieldset>
  );
};

export default PersonalData;
