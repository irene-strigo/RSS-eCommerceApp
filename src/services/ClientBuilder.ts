import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  Client, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import {
  RefreshAuthMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = `${process.env.CTP_PROJECT_KEY}`;
const scopes = [`${process.env.CTP_SCOPES}`];

// Configure authMiddlewareOptions
const baseAuthMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.eu-central-1.aws.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: `${process.env.CTP_CLIENT_ID}`,
    clientSecret: `${process.env.CTP_CLIENT_SECRET}`,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.eu-central-1.aws.commercetools.com',
  fetch,
};

export default function store(key: string) {
  return {
    get: (): TokenStore => {
      return JSON.parse(localStorage.getItem(key) || 'null');
    },
    set: (val: TokenStore) => {
      localStorage.setItem(key, JSON.stringify(val));
      return val;
    },
  };
}

const defaultClient = new ClientBuilder()
  .withHttpMiddleware(httpMiddlewareOptions)
  .withAnonymousSessionFlow(baseAuthMiddlewareOptions)
  .build();
const passwordClient = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);
const tokenClient = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);

const personalTokenStore = store('PersonalToken');

const getCtpClient = (username?: string, password?: string): Client => {
  const token = personalTokenStore.get();

  if (username && password) {
    const options: PasswordAuthMiddlewareOptions = {
      ...baseAuthMiddlewareOptions,
      credentials: {
        ...baseAuthMiddlewareOptions.credentials,
        user: {
          username,
          password,
        },
      },
      tokenCache: personalTokenStore,
    };

    return passwordClient.withPasswordFlow(options).build();
  } else if (token && token.token) {
    if (new Date().getTime() > token.expirationTime) {
      if (!token.refreshToken) {
        return defaultClient;
      }

      const options: RefreshAuthMiddlewareOptions = {
        ...baseAuthMiddlewareOptions,
        credentials: {
          ...baseAuthMiddlewareOptions.credentials,
        },
        refreshToken: token.refreshToken,
        tokenCache: personalTokenStore,
      };
      return tokenClient.withRefreshTokenFlow(options).build();
    }

    return tokenClient.withExistingTokenFlow(`Bearer ${token.token}`, { force: true }).build();
  }

  return defaultClient;
};

export const getApi = (login?: string, password?: string): ByProjectKeyRequestBuilder => {
  const ctpClient = getCtpClient(login, password);
  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: `${process.env.CTP_PROJECT_KEY}`,
  });
};
