export type EnvVars = 'PORT';

interface EnvVariable {
  PORT: number;
}
type EnvVariableKeys = keyof EnvVariable;

export const getEnvVar = (key: EnvVariableKeys): string => {
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
