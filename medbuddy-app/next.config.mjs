/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    FHIR_REDIRECT_URI: 'http://localhost:3000/callback', // default for local dev
    FHIR_CLIENT_ID: 'Il0LuXZwxRaogC9NbOn6BM9DJnYYKhJN',
    FHIR_ISSUER: 'https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDAsMCwwLCJ1c2VyLyouKiBwYXRpZW50LyouKiBvcGVuaWQgcHJvZmlsZSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsIklsMEx1WFp3eFJhb2dDOU5iT242Qk05REpuWVlLaEpOIiwiIiwiIiwiIiwiIiwwLDAsIiJd/fhir',
  },
};

export default nextConfig;
