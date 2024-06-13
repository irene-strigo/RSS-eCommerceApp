import { getApi } from './ClientBuilder';
import { _BaseAddress, Cart, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import {
  CustomerUpdateAction,
  MyCustomerChangePassword,
  MyCustomerSignin,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { QueryParam } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

export type GetProductsParams = {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
};

export type GetProductsMethodArgs = {
  queryArgs?: GetProductsParams;
  headers?: {
    [key: string]: string | string[];
  };
};

export const getProducts = (params?: GetProductsParams) => {
  const methodArgs: GetProductsMethodArgs = {};
  if (params) {
    methodArgs.queryArgs = params;
  }

  return getApi()
    .productProjections()
    .search()
    .get(methodArgs)
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getProductById = (id: string) => {
  return getApi()
    .productProjections()
    .withId({ ID: id })
    .get()
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getCategories = () => {
  return getApi()
    .categories()
    .get()
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });
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
  const cartId = localStorage.getItem('cartId');
  const result = await getApi(customerSignin.email, customerSignin.password)
    // .me()
    .login()
    .post({
      body: {
        ...customerSignin,
        anonymousCart: {
          id: cartId || '',
          typeId: 'cart',
        },
        anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
        // activeCartSignInMode: 'UseAsNewActiveCustomerCart',
        updateProductData: false,
      },
    })
    .execute()
    .then(({ body }) => {
      if (body.cart?.id) {
        localStorage.setItem('cartId', body.cart.id);
      }
      return body;
    })
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

export const CreateCart = async (): Promise<Cart> => {
  return getApi()
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute()
    .then(({ body }) => {
      localStorage.setItem('cartId', body.id);
      return body;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const GetCart = async (cartId: string): Promise<Cart> => {
  return getApi()
    .me()
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute()
    .then(({ body }) => body)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const UpdateCart = async (
  cartId: string,
  productId: string,
  quantity: number = 1,
): Promise<Cart> => {
  const currentCart = await GetCart(cartId);

  return getApi()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: currentCart.version,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            quantity,
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

export const DeleteProductInCart = async (cartId: string, lineItemId: string): Promise<Cart> => {
  const currentCart = await GetCart(cartId);
  return getApi()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: currentCart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: lineItemId,
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

export const ChangeLineItemQuantity = async (
  cartId: string,
  lineItemId: string,
  quantity: number = 1,
): Promise<Cart> => {
  const currentCart = await GetCart(cartId);
  return getApi()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: currentCart.version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: lineItemId,
            quantity,
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

export const DeleteCart = async (cartId: string): Promise<void> => {
  const currentCart = await GetCart(cartId);
  getApi()
    .me()
    .carts()
    .withId({ ID: cartId })
    .delete({
      queryArgs: {
        version: currentCart.version,
      },
    })
    .execute()
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
