import { PromiseExecutor } from '@nx/devkit';
import { EchoExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<EchoExecutorSchema> = async (options) => {
  console.log(options.value);
  return {
    success: true,
  };
};

export default runExecutor;
