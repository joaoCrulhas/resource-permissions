export interface EnvVariable {
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
