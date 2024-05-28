type Props = {
  token: string;
};

async function GetProducts({ token }: Props) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const response = await fetch(
    'https://api.eu-central-1.aws.commercetools.com/rsschool-ecommerce-application/products',
    {
      headers,
      method: 'GET',
    },
  );
  const answer = await response.json();
  console.log(answer);
}

export default GetProducts;
