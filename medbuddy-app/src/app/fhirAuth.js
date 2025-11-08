import FHIR from 'fhirclient';

export const connectToFHIR = async () => {
  try {
    // Initiate SMART on FHIR OAuth2 login
    await FHIR.oauth2.authorize({
      clientId: process.env.FHIR_CLIENT_ID,
      scope: 'patient/*.* openid profile',
      redirectUri: process.env.FHIR_REDIRECT_URI,
      iss: process.env.FHIR_ISSUER,
    });
  } catch (error) {
    console.error('FHIR authentication failed:', error);
    return null;
  }
};
