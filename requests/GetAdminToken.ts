import { Buffer } from 'buffer';

async function GetAdminToken() {
  const headers = new Headers({
    Authorization: `Basic ${Buffer.from('VI_hMRPc5MNAHSICh7Iiqyc9' + ':' + '5eNon3O6zEnc47SQ1Ln2k11c3658o0ko', 'binary').toString('base64')}`,
  });
  const response = await fetch(
    'https://auth.eu-central-1.aws.commercetools.com/oauth/token?grant_type=client_credentials&scope=manage_project:rsschool-ecommerce-application',
    { headers, method: 'POST' },
  );
  const token = await response.json();

  localStorage.setItem('token', JSON.stringify(token.access_token));
}

export default GetAdminToken;
