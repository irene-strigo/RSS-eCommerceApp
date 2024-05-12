import React from 'react';

import Input from './common/Input';

type BillingData = {
  country: string;
  postIndex: string;
  city: string;
  street: string;
};

type Props = {
  billingData: BillingData;
  setBillingData: (billingData: BillingData) => void;
};

const BillingAddress = ({ billingData, setBillingData }: Props) => {
  return (
    <fieldset>
      <legend>Billing Address</legend>
      <div>
        Country:{' '}
        <Input
          value={billingData?.country}
          name={'country'}
          placeholder={'Enter your country'}
          type={'text'}
          onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
        />
      </div>
      <div>
        Post index:{' '}
        <Input
          value={billingData?.postIndex}
          name={'index'}
          placeholder={'Enter your post index'}
          type={'text'}
          onChange={(e) => setBillingData({ ...billingData, postIndex: e.target.value })}
        />
      </div>
      <div>
        City:{' '}
        <Input
          value={billingData?.city}
          name={'city'}
          placeholder={'Enter your city'}
          type={'text'}
          onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
        />
      </div>
      <div>
        Street:{' '}
        <Input
          value={billingData?.street}
          name={'street'}
          placeholder={'Enter your street'}
          type={'text'}
          onChange={(e) => setBillingData({ ...billingData, street: e.target.value })}
        />
      </div>
    </fieldset>
  );
};

export default BillingAddress;
