import { DefaultCheckboxLabel, ErrorsText, InputElem, SelectElem } from './common/CommonStyles';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { _BaseAddress } from '@commercetools/platform-sdk';
import { COUNTRIES } from '../Countries';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  register: UseFormRegister<_BaseAddress>;
  trigger: UseFormTrigger<_BaseAddress>;
  getValues: UseFormGetValues<_BaseAddress>;
  watch: UseFormWatch<_BaseAddress>;
  errors: FieldErrors<_BaseAddress>;
  mode: 'Billing' | 'Shipping';
  setUseAsDefaultAddress: Dispatch<SetStateAction<boolean>>;
  setAddBillingAddress: Dispatch<SetStateAction<boolean>>;
};

export const AddressData = ({
  register,
  trigger,
  errors,
  getValues,
  watch,
  mode,
  setUseAsDefaultAddress,
  setAddBillingAddress,
}: Props) => {
  useEffect(() => {
    trigger('postalCode');
  }, [watch('country')]);

  return (
    <fieldset>
      <legend>{mode} address</legend>

      <DefaultCheckboxLabel>
        <input type={'checkbox'} onChange={(e) => setUseAsDefaultAddress(e.target.checked)} />
        Make it default
      </DefaultCheckboxLabel>

      <label>Country: </label>
      <SelectElem
        defaultValue={COUNTRIES[0].code}
        {...register('country', {
          required: {
            value: true,
            message: 'this field is required',
          },
        })}
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </SelectElem>
      {errors.country && <ErrorsText>{errors.country.message}</ErrorsText>}
      <label>Post index:</label>
      <InputElem
        {...register('postalCode', {
          required: {
            value: true,
            message: 'this field is required',
          },
          pattern: {
            value: new RegExp(
              COUNTRIES.find((c) => c.code === getValues().country)?.zipRegexp || '',
              'gm',
            ),
            message: 'post index does not correspond to the selected country',
          },
        })}
      />
      {errors.postalCode && <ErrorsText>{errors.postalCode.message}</ErrorsText>}
      <label>City:</label>
      <InputElem
        {...register('city', {
          required: {
            value: true,
            message: 'this field is required',
          },
          pattern: {
            value: /^[^\d%\\&?,';:!-+!@#$^*)(]{1,50}$/gm,
            message: 'wrong city name',
          },
        })}
      />
      {errors.city && <ErrorsText>{errors.city.message}</ErrorsText>}

      <label>Street:</label>
      <InputElem
        type={'text'}
        {...register('streetName', {
          required: {
            value: true,
            message: 'this field is required',
          },
        })}
      />
      {errors.streetName && <ErrorsText>{errors.streetName.message}</ErrorsText>}

      {mode === 'Shipping' && (
        <DefaultCheckboxLabel>
          <input type={'checkbox'} onChange={(e) => setAddBillingAddress(e.target.checked)} />
          Add billing address
        </DefaultCheckboxLabel>
      )}
    </fieldset>
  );
};
