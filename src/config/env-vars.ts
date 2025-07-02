export type EnvVars = 'PORT';

interface EnvVariable {
  PORT: number;
}

export const getEnvVar = (key: EnvVars): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const envVars: EnvVariable = {
  PORT: Number(getEnvVar('PORT')) || 3005,
};

export default envVars;
