import React, { useState } from 'react';

import Input from './common/Input';
import ShowButton from './common/ShowButton';

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/;
type UserData = {
  login: string;
  password: string;
};

type Props = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

type Errors = Partial<Record<keyof UserData, string>>;
//type Touched = Partial<Record<keyof UserData, boolean>>

const LogInData = ({ userData, setUserData }: Props) => {
  const [errors, setErrors] = useState<Errors>({});
  const newErrors: Errors = {};

  const validate = (formInputs: UserData): Errors => {
    if (EMAIL_REGEXP.test(formInputs.login) === false && formInputs.login != '') {
      newErrors.login = 'Please enter a valid login.';
    }
    if (PASSWORD_REGEXP.test(formInputs.password) === false && formInputs.password != '') {
      newErrors.password = 'Please enter a valid password.';
    }
    return newErrors;
  };

  //const [touched, setTouched] = useState<Touched>({})
  //console.log(touched)
  const [inputType, setInputType] = useState('password');
  const [btnLabel, setBtnLabel] = useState('show password');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const togglePassInput = () => {
    if (inputType === 'password') {
      setInputType('text');
      setBtnLabel('hide password');
    } else {
      setInputType('password');
      setBtnLabel('show password');
    }
  };

  return (
    <fieldset>
      <legend>Enter your data</legend>
      <Input
        value={userData.login}
        name={'login'}
        placeholder={'Enter your login'}
        type={'text'}
        onError={errors.login}
        //onBlur={() => setTouched({ ...touched, login: true })}
        onChange={(e) => {
          setUserData({ ...userData, login: e.target.value });
          setErrors(validate({ ...userData, login: e.target.value }));
        }}
      />
      <ShowButton
        label={btnLabel}
        onClick={() => {
          togglePassInput();
        }}
        type="button"
        disabled={btnDisabled}
      ></ShowButton>

      <Input
        value={userData.password}
        name={'password'}
        placeholder={'Enter your password'}
        type={inputType}
        onError={errors.password}
        //onBlur={() => setTouched({ ...touched, password: true })}
        onChange={(e) => {
          setBtnDisabled(false);
          setUserData({ ...userData, password: e.target.value });
          setErrors(validate({ ...userData, password: e.target.value }));
        }}
      />
    </fieldset>
  );
};

export default LogInData;
