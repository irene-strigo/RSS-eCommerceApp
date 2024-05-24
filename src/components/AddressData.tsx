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
  mode: 'Billing' | 'Shipping' | 'Edit';
  setUseAsDefaultAddress?: Dispatch<SetStateAction<boolean>>;
  setAddBillingAddress?: Dispatch<SetStateAction<boolean>>;
  hideCheckboxes?: boolean;
  country?: string;
  postalCode?: string;
  city?: string;
  streetName?: string;
  id?: string;
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
  country,
  postalCode,
  city,
  streetName,
  id,
  hideCheckboxes,
}: Props) => {
  useEffect(() => {
    trigger('postalCode');
  }, [watch().country]);

  return (
    <fieldset>
      <legend>{mode} address</legend>

      {!hideCheckboxes && (
        <DefaultCheckboxLabel>
          <input type={'checkbox'} onChange={(e) => setUseAsDefaultAddress?.(e.target.checked)} />
          Make it default
        </DefaultCheckboxLabel>
      )}

      <InputElem type="hidden" value={id || ''} {...register('id')} />

      <label>Country: </label>
      <SelectElem
        defaultValue={COUNTRIES[0].code}
        {...register('country', {
          required: {
            value: true,
            message: 'this field is required',
          },
          value: (country || COUNTRIES[0].code) as string,
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
          value: (postalCode || '') as string,
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
          value: (city || '') as string,
        })}
      />
      {errors.city && <ErrorsText>{errors.city.message}</ErrorsText>}

      <label>Street:</label>
      <InputElem
        {...register('streetName', {
          required: {
            value: true,
            message: 'this field is required',
          },
          value: (streetName || '') as string,
        })}
      />
      {errors.streetName && <ErrorsText>{errors.streetName.message}</ErrorsText>}

      {!hideCheckboxes && mode === 'Shipping' && (
        <DefaultCheckboxLabel>
          <input type={'checkbox'} onChange={(e) => setAddBillingAddress?.(e.target.checked)} />
          Add billing address
        </DefaultCheckboxLabel>
      )}
    </fieldset>
  );
};
