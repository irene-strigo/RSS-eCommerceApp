import { ErrorsText, InputElem } from './common/CommonStyles';
import ShowButton from './common/SwitchButton';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MyCustomerChangePassword } from '@commercetools/platform-sdk';

type Props = {
  register: UseFormRegister<MyCustomerChangePassword>;
  errors: FieldErrors<MyCustomerChangePassword>;
};

export const ChangePasswordData = ({ register, errors }: Props) => {
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
      <legend>Change password:</legend>

      <label>Old password:</label>

      <InputElem
        type={inputType}
        {...register('currentPassword', {
          required: {
            value: true,
            message: 'this field is required',
          },
          minLength: {
            value: 8,
            message: 'password must be at least 8 characters long',
          },

          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/,
            message:
              'password must contain lowercase and uppercase letter, number and special character',
          },
        })}
      />
      {errors.currentPassword && <ErrorsText>{errors.currentPassword.message}</ErrorsText>}

      <label>New password:</label>
      <ShowButton
        label={btnLabel}
        disabled={btnDisabled}
        type={'button'}
        onClick={() => togglePassInput()}
      />
      <InputElem
        type={inputType}
        {...register('newPassword', {
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
          },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/,
            message:
              'password must contain lowercase and uppercase letter, number and special character',
          },
        })}
      />
      {errors.newPassword && <ErrorsText>{errors.newPassword.message}</ErrorsText>}
    </fieldset>
  );
};
