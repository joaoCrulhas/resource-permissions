import { EnvVariable, getEnvVar } from '@config/get-env-vars';

const envVars: EnvVariable = {
  PORT: Number(getEnvVar('PORT')) || 3005,
};

export default envVars;
