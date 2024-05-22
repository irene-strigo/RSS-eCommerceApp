import { getApi } from './ClientBuilder';
import { _BaseAddress, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { MyCustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

export const getProducts = () => {
  return getApi()
    .products()
    .get()
    .execute()
    .then(({ body }) => body)
    .catch(console.error);
};

export const GetMe = async (): Promise<void | Customer> => {
  return getApi()
    .me()
    .get()
    .execute()
    .then(({ body }) => body)
    .catch(console.error);
};

export const LogInCustomer = async (customerSignin: MyCustomerSignin): Promise<void | Customer> => {
  const result = await getApi(customerSignin.email, customerSignin.password)
    .me()
    .login()
    .post({
      body: customerSignin,
    })
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });

  return result.customer;
};

export const signInCustomer = async (draft: MyCustomerDraft): Promise<void | Customer> => {
  const result: CustomerSignInResult = await getApi()
    .me()
    .signup()
    .post({
      body: draft,
    })
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });

  await LogInCustomer(draft);

  return result.customer;
};

export const setCustomerAddress = async (
  customerId: string,
  addressType: 'Shipping' | 'Billing',
  address: _BaseAddress,
  setAsDefault: boolean = false,
): Promise<void | Customer> => {
  const apiRoot = getApi();

  let customer: Customer = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .get()
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });

  const existingAddress = customer.addresses.find(
    (a) =>
      a.country === address.country &&
      a.postalCode === address.postalCode &&
      a.city === address.city &&
      a.streetName === address.streetName,
  );

  let addressId = '';

  if (existingAddress && existingAddress.id) {
    addressId = existingAddress.id;
  } else {
    customer = await apiRoot
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version: customer.version,
          actions: [
            {
              action: 'addAddress',
              address,
            },
          ],
        },
      })
      .execute()
      .then(({ body }) => body)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    const addedAddress = customer.addresses.find(
      (a) =>
        a.country === address.country &&
        a.postalCode === address.postalCode &&
        a.city === address.city &&
        a.streetName === address.streetName,
    );

    if (addedAddress && addedAddress.id) {
      addressId = addedAddress.id;
    }
  }

  const registeredAddressIds =
    addressType === 'Shipping' ? customer.shippingAddressIds : customer.billingAddressIds;

  if (addressId && !registeredAddressIds?.includes(addressId)) {
    customer = await getApi()
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version: customer.version,
          actions: [
            {
              action: `add${addressType}AddressId`,
              addressId,
            },
          ],
        },
      })
      .execute()
      .then(({ body }) => body)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  if (!setAsDefault || !addressId) {
    return customer;
  }

  return getApi()
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version: (customer as Customer).version,
        actions: [
          {
            action: `setDefault${addressType}Address`,
            addressId,
          },
        ],
      },
    })
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
