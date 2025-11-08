/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    FHIR_REDIRECT_URI: 'http://localhost:3000/callback', // default for local dev
    FHIR_CLIENT_ID: 'Il0LuXZwxRaogC9NbOn6BM9DJnYYKhJN',
    FHIR_ISSUER: 'https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDAsMCwwLCJ1c2VyLyouKiBwYXRpZW50LyouKiBvcGVuaWQgcHJvZmlsZSBmaGlyVXNlciBNZWRpY2F0aW9uUmVxdWVzdC5yZWFkIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2NhbGxiYWNrIiwiSWwwTHVYWnd4UmFvZ0M5TmJPbjZCTTlESm5ZWUtoSk4iLCIiLCIiLCIiLCIiLDAsMCwiIl0/fhir',
  },
};

export default nextConfig;
