import { ErrorsText, InputElem } from './common/CommonStyles';
import ShowButton from './common/SwitchButton';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MyCustomerDraft } from '@commercetools/platform-sdk';

type Props = {
  register: UseFormRegister<MyCustomerDraft>;
  errors: FieldErrors<MyCustomerDraft>;
};

const LoginData = ({ register, errors }: Props) => {
  const [inputType, setInputType] = useState('password');
  const [btnLabel, setBtnLabel] = useState('show password');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [serverErrorMsg, setServerErrorMsg] = useState('');

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
      <label>Login:</label>
      <InputElem
        {...register('email', {
          required: {
            value: true,
            message: 'this field is required',
          },
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'enter your valid email address',
          },
        })}
      />
      {errors.email && <ErrorsText>{errors.email.message}</ErrorsText>}
      <label>Password:</label>
      <ShowButton
        label={btnLabel}
        disabled={btnDisabled}
        type={'button'}
        onClick={() => togglePassInput()}
      />
      <InputElem
        type={inputType}
        {...register('password', {
          required: {
            value: true,
            message: 'this field is required',
          },
          minLength: {
            value: 8,
            message: 'password must be at least 8 characters long',
          },
          onChange() {
            setBtnDisabled(false);
            console.log(serverErrorMsg);
            setServerErrorMsg('');
          },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/,
            message:
              'password must contain lowercase and uppercase letter, number and special character',
          },
        })}
      />
      {errors.password && <ErrorsText>{errors.password.message}</ErrorsText>}
    </fieldset>
  );
};

export default LoginData;
