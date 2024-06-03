import { ErrorsText, InputElem, ToggleButton } from './common/CommonStyles';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MyCustomerDraft } from '@commercetools/platform-sdk';

type Props = {
  register: UseFormRegister<MyCustomerDraft>;
  errors: FieldErrors<MyCustomerDraft>;
};

const LoginData = ({ register, errors }: Props) => {
  const [inputType, setInputType] = useState('password');
  const [btnLabel, setBtnLabel] = useState('show');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [serverErrorMsg, setServerErrorMsg] = useState('');

  const togglePassInput = () => {
    if (inputType === 'password') {
      setInputType('text');
      setBtnLabel('hide');
    } else {
      setInputType('password');
      setBtnLabel('show');
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
      <ToggleButton
        disabled={btnDisabled}
        type={'button'}
        onClick={(evt) => {
          evt.preventDefault();
          togglePassInput();
        }}
      >
        {btnLabel}
      </ToggleButton>
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
