import { ctpClient } from './ClientBuilder';
import {
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  _BaseAddress,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: `${process.env.CTP_PROJECT_KEY}`,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = () => {
  return apiRoot.get().execute();
};

export const getProducts = () => {
  return apiRoot
    .products()
    .get()
    .execute()
    .then(({ body }) => body)
    .catch(console.error);
};

export const signInCustomer = async (
  draft: CustomerDraft,
): Promise<void | CustomerSignInResult> => {
  return apiRoot
    .customers()
    .post({
      body: draft,
    })
    .execute()
    .then(({ body }) => body)
    .catch(console.error);
};

export const setCustomerAddress = async (
  customerId: string,
  version: number,
  addressType: 'Shipping' | 'Billing',
  address: _BaseAddress,
  setAsDefault: boolean = false,
): Promise<void | Customer> => {
  let customer = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
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
    .catch(console.error);

  if (!(customer && customer.addresses.length)) {
    return customer;
  }

  const addedAddress = customer.addresses.find(
    (a) =>
      a.country === address.country &&
      a.postalCode === address.postalCode &&
      a.city === address.city &&
      a.streetName === address.streetName,
  );

  if (!addedAddress) {
    return customer;
  }

  customer = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version: customer.version,
        actions: [
          {
            action: `add${addressType}AddressId`,
            addressId: addedAddress.id,
          },
        ],
      },
    })
    .execute()
    .then(({ body }) => body)
    .catch(console.error);

  if (!setAsDefault) {
    return customer;
  }

  return apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version: (customer as Customer).version,
        actions: [
          {
            action: `setDefault${addressType}Address`,
            addressId: addedAddress.id,
          },
        ],
      },
    })
    .execute()
    .then(({ body }) => body)
    .catch(console.error);
};

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);
