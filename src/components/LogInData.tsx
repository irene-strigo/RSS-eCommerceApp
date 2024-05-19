import React from 'react';

import Input from './common/Input';

type UserData = {
  email: string;
  password: string;
};

type Props = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

const LogInData = ({ userData, setUserData }: Props) => {
  return (
    <fieldset>
      <legend>Enter your data</legend>
      <Input
        value={userData.email}
        name={'login'}
        placeholder={'Enter your login'}
        type={'text'}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <Input
        value={userData.password}
        name={'password'}
        placeholder={'Enter your password'}
        type={'password'}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
    </fieldset>
  );
};

export default LogInData;
