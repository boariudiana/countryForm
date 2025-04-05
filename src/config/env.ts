interface EnvConfig {
  GEONAMES_USERNAME: string;
}

const env: EnvConfig = {
  GEONAMES_USERNAME: import.meta.env.VITE_GEONAMES_USERNAME || ''
};

if (!env.GEONAMES_USERNAME) {
  console.error('VITE_GEONAMES_USERNAME is not set in .env file');
}

export default env; 