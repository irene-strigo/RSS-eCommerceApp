type Props = {
  token: string;
  id: string | undefined;
};

async function GetProduct({ token, id }: Props) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const response = await fetch(
    `https://api.eu-central-1.aws.commercetools.com/rsschool-ecommerce-application/products/${id}`,
    {
      headers,
      method: 'GET',
    },
  );
  const answer = await response.json();
  return answer;
}

export default GetProduct;
