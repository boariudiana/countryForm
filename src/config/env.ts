interface EnvConfig {
  GEONAMES_USERNAME: string;
}

const env: EnvConfig = {
  GEONAMES_USERNAME: import.meta.env.VITE_GEONAMES_USERNAME || ''
};

export default env; 