import { joinPathFragments, PromiseExecutor, runExecutor as run } from '@nx/devkit';
import { EchoExecutorSchema } from './schema';
import { promisify } from 'util';
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';

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

  if (options.createGitHash) {
    const execPromise = promisify(exec);
    const execResult = await execPromise('git rev-parse HEAD');

    const path = joinPathFragments(context.root, 'dist', 'apps', context.projectName, 'browser', 'hash.txt');
    await writeFile(path, execResult.stdout);
  }

  return {
    success: true,
  };
};

export default runExecutor;
