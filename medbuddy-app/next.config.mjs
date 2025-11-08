/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    FHIR_REDIRECT_URI: 'http://localhost:3000', // Your local or production redirect URI
    FHIR_CLIENT_ID: 'Il0LuXZwxRaogC9NbOn6BM9DJnYYKhJN', // From SMART on FHIR demo server
    FHIR_ISSUER: 'https://r4.smarthealthit.org', // SMART on FHIR demo server
  },
};

export default nextConfig;
