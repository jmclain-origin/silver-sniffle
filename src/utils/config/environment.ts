import dotenv from 'dotenv';
import path from 'path';
import paths from './paths';

const NODE_ENV = process.env.NODE_ENV;
const DEPLOYED_ENV = process.env.DEPLOYED_ENV;

if (NODE_ENV !== 'production' || DEPLOYED_ENV === 'local') {
  dotenv.config({
    path: path.join(
      paths.ROOT_DIR,
      `${DEPLOYED_ENV !== null ? DEPLOYED_ENV : ''}.env`,
    ),
  });
}

// TODO: update typing do not include strings
type NodeEnv = 'development' | 'production' | 'test' | string;
type DeployedEnv = 'dev' | 'stage' | 'prod' | 'test' | string;

interface EnvType extends NodeJS.ProcessEnv {
  NODE_ENV: NodeEnv;
  PORT: string;
  DB_URI: string;
  JWT_SECRET: string;
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
  AWS_REGION: string;
  AWS_BUCKET: string;
  DEPLOYED_ENV: DeployedEnv;
}

// TODO: validate enviroment before returning values & resolve which .env file to use if any

export default (): EnvType => {
  // const defaultNodeEnv = 'development';
  // const defaultDeployedEnv = `local` as Env['DEPLOYED_ENV'];
  return {
    PORT: process.env.PORT ?? '8080',
    DB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/test',
    NODE_ENV: process.env.NODE_ENV ?? (`development` as NodeEnv),
    JWT_SECRET: process.env.JWT_SECRET ?? 'JWT_SECRET',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY ?? 'AWS_ACCESS_KEY',
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY ?? 'AWS_SECRET_KEY',
    AWS_REGION: process.env.AWS_REGION ?? 'AWS_REGION',
    AWS_BUCKET: process.env.AWS_BUCKET ?? 'AWS_BUCKET',
    DEPLOYED_ENV: process.env.DEPLOYED_ENV ?? ('development' as DeployedEnv),
  };
};
