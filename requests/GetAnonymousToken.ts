import { Buffer } from 'buffer';

async function GetAnonymousToken() {
  const headers = new Headers({
    Authorization: `Basic ${Buffer.from('VI_hMRPc5MNAHSICh7Iiqyc9' + ':' + '5eNon3O6zEnc47SQ1Ln2k11c3658o0ko', 'binary').toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  const response = await fetch(
    'https://auth.eu-central-1.aws.commercetools.com/oauth/rsschool-ecommerce-application/anonymous/token?grant_type=client_credentials&scope=manage_project:rsschool-ecommerce-application',
    {
      headers,
      method: 'POST',
    },
  );
  const token = await response.json();

  localStorage.setItem('anonymousToken', JSON.stringify(token.access_token));
}

export default GetAnonymousToken;
