type Props = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  setIsUserAuth: (id: string) => void;
};

async function SignUpCustomer({ email, password, firstName, lastName, setIsUserAuth }: Props) {
  const token = JSON.parse(localStorage.getItem('anonymousToken') || 'null');

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  const data = {
    email,
    firstName,
    lastName,
    password,
  };

  const response = await fetch(
    'https://api.eu-central-1.aws.commercetools.com/rsschool-ecommerce-application/customers ',
    {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  const signUpResponse = await response.json();
  setIsUserAuth(signUpResponse.customer.id);

  if (signUpResponse.message) throw new Error(signUpResponse.message);

  localStorage.removeItem('anonymousToken');
  localStorage.setItem('customerId', JSON.stringify(signUpResponse.customer.id));
}

export default SignUpCustomer;
