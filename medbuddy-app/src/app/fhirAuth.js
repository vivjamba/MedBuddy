import FHIR from 'fhirclient';

export const authorizeFHIR = async () => {
  try {
    // This triggers the standalone OAuth2 login flow
    await FHIR.oauth2.authorize({
      clientId: process.env.FHIR_CLIENT_ID,
      scope: 'patient/*.* openid profile',
      redirectUri: process.env.FHIR_REDIRECT_URI,
      iss: process.env.FHIR_ISSUER,
    });
  } catch (error) {
    console.error('FHIR authorization failed:', error);
    return null;
  }
};

export const getClient = async () => {
  try {
    // Returns a FHIR client if user is already logged in
    const client = await FHIR.oauth2.ready();
    return client;
  } catch (error) {
    console.warn('FHIR client not ready:', error);
    return null;
  }
};
