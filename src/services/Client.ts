import { getApi } from './ClientBuilder';
import { _BaseAddress, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import {
  /*CustomerAddAddressAction,
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerChangeAddressAction,
  CustomerRemoveAddressAction,
  CustomerRemoveBillingAddressIdAction,
  CustomerRemoveShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,*/
  CustomerUpdateAction,
  MyCustomerChangePassword,
  MyCustomerSignin,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

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

const getCustomerById = async (customerId: string): Promise<Customer> => {
  const apiRoot = getApi();

  const customer: Customer = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .get()
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });

  return customer;
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

export const updateCustomerPersonalData = async (
  customerId: string,
  customerDraft: MyCustomerDraft,
): Promise<Customer> => {
  const customer: Customer = await getCustomerById(customerId);

  const apiRoot = getApi();

  const actions: CustomerUpdateAction[] = [];

  if (customerDraft.firstName && customerDraft.firstName !== customer.firstName) {
    actions.push({
      action: 'setFirstName',
      firstName: customerDraft.firstName,
    });
  }

  if (customerDraft.lastName && customerDraft.lastName !== customer.lastName) {
    actions.push({
      action: 'setLastName',
      lastName: customerDraft.lastName,
    });
  }

  if (customerDraft.email && customerDraft.email !== customer.email) {
    actions.push({
      action: 'changeEmail',
      email: customerDraft.email,
    });
  }

  if (customerDraft.dateOfBirth && customerDraft.dateOfBirth !== customer.dateOfBirth) {
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: customerDraft.dateOfBirth,
    });
  }

  if (!actions.length) {
    return customer;
  }

  return apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version: customer.version,
        actions,
      },
    })
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const changeCustomerPassword = async (
  passwordForm: MyCustomerChangePassword,
): Promise<Customer> => {
  const customer = await GetMe();
  if (!customer) {
    throw new Error('customer not logged in');
  }
  const apiRoot = getApi();

  return apiRoot
    .me()
    .password()
    .post({
      body: {
        ...passwordForm,
        version: customer.version,
      },
    })
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const setCustomerAddress = async (
  customerId: string,
  addressType: 'Shipping' | 'Billing',
  address: _BaseAddress,
  setAsDefault: boolean = false,
): Promise<void | Customer> => {
  let customer: Customer = await getCustomerById(customerId);

  const apiRoot = getApi();

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

export type UpdateCustomerAddressPropertiesAction =
  | 'addBillingAddressId'
  | 'addShippingAddressId'
  | 'removeBillingAddressId'
  | 'removeShippingAddressId'
  | 'setDefaultBillingAddress'
  | 'setDefaultShippingAddress';

export const updateCustomerAddressProperties = async (
  customerId: string,
  addressId: string,
  action: UpdateCustomerAddressPropertiesAction,
): Promise<Customer> => {
  const customer: Customer = await getCustomerById(customerId);

  return getApi()
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version: customer.version,
        actions: [
          {
            action,
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

export const deleteCustomerAddress = async (
  customerId: string,
  addressId: string,
): Promise<Customer> => {
  const customer: Customer = await getCustomerById(customerId);

  return getApi()
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version: customer.version,
        actions: [
          {
            action: 'removeAddress',
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

export const addCustomerAddress = async (
  customerId: string,
  address: _BaseAddress,
): Promise<Customer> => {
  const customer: Customer = await getCustomerById(customerId);

  return getApi()
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
};

export const changeCustomerAddress = async (
  customerId: string,
  address: _BaseAddress,
): Promise<Customer> => {
  const customer: Customer = await getCustomerById(customerId);

  return getApi()
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version: customer.version,
        actions: [
          {
            action: 'changeAddress',
            addressId: address.id,
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
};
