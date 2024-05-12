import React from 'react';

import Input from './common/Input';

type UserData = {
  login: string;
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
        value={userData.login}
        name={'login'}
        placeholder={'Enter your login'}
        type={'text'}
        onChange={(e) => setUserData({ ...userData, login: e.target.value })}
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
