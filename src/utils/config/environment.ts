import dotenv from 'dotenv';
import path from 'path';
if (process.env.NODE_ENV !== 'production') {
  const rootDir = path.resolve(__dirname, '..', '..');
  console.log('🚀 ~ rootDir:', rootDir);

  dotenv.config();
}
// TODO: validate enviroment before returning values & resolve which .env file to use if any
export type Env = {
  PORT: string;
  DB_URI: string;
  // NODE_ENV?: 'production' | 'development' | 'test' | null;
  JWT_SECRET: string;
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
  AWS_REGION: string;
  AWS_BUCKET: string;
  // DEPLOYED_ENV: 'local' | 'dev' | 'stage' | 'prod';
};

export default (): Env => {
  // const defaultNodeEnv = 'development';
  // const defaultDeployedEnv = `local` as Env['DEPLOYED_ENV'];
  return {
    PORT: process.env.PORT ?? '8080',
    DB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/test',
    // NODE_ENV: process.env.NODE_ENV ?? (`development` as Env['NODE_ENV']),
    JWT_SECRET: process.env.JWT_SECRET ?? 'JWT_SECRET',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY ?? 'AWS_ACCESS_KEY',
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY ?? 'AWS_SECRET_KEY',
    AWS_REGION: process.env.AWS_REGION ?? 'AWS_REGION',
    AWS_BUCKET: process.env.AWS_BUCKET ?? 'AWS_BUCKET',
    // DEPLOYED_ENV: process.env.DEPLOYED_ENV ?? defaultDeployedEnv,
  };
};
