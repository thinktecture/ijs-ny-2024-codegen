import { PromiseExecutor, runExecutor as run } from '@nx/devkit';
import { EchoExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<EchoExecutorSchema> = async (options, context) => {
  console.log(options.value);

  const result = await run({
    target: 'build',
    project: context.projectName,
    configuration: 'production'
  }, {}, context);

  for await (const res of result) {
    if (!res.success) return res;
  }

  return {
    success: true,
  };
};

export default runExecutor;
