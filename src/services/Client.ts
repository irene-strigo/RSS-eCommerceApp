import { ctpClient } from './ClientBuilder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

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

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);
