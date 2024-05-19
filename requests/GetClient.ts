async function GetCustomer() {
  const headers = new Headers({
    Authorization: `Bearer wzzCIDQMwRWFGEVFQE9BccvY7bGamQ4L`,
  });

  const response = await fetch(
    'https://api.eu-central-1.aws.commercetools.com/rsschool-ecommerce-application/customers/d3d23abd-8d09-4ada-9e46-f8a28e09862c',
    {
      headers,
      method: 'GET',
    },
  );
  const answer = await response.json();
  console.log(answer);
}

export default GetCustomer;
