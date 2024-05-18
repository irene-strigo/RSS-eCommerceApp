import { Buffer } from 'buffer';

type Props = {
  email: string;
  password: string;
};

async function GetAccessAndRefreshToken({ email, password }: Props) {
  const headers = new Headers({
    Authorization: `Basic ${Buffer.from('VI_hMRPc5MNAHSICh7Iiqyc9' + ':' + '5eNon3O6zEnc47SQ1Ln2k11c3658o0ko', 'binary').toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  const data = {
    email,
    password,
  };

  const response = await fetch(
    `https://auth.eu-central-1.aws.commercetools.com/oauth/rsschool-ecommerce-application/customers/token?grant_type=password&username=${email}&password=${password}&scope=manage_project:rsschool-ecommerce-application`,
    {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  const signInResponse = await response.json();

  localStorage.removeItem('anonymousToken');
  localStorage.setItem('accessToken', JSON.stringify(signInResponse.access_token));
  localStorage.setItem('refreshToken', JSON.stringify(signInResponse.refresh_token));
}

export default GetAccessAndRefreshToken;
