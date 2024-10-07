import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { myGeneratorGenerator } from './generator';
import { MyGeneratorGeneratorSchema } from './schema';

describe('my-generator generator', () => {
  let tree: Tree;
  const options: MyGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await myGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });

  it('should create workflow file', async () => {
    await myGeneratorGenerator(tree, options);
    expect(tree.exists('test/src/app/app.workflow.ts')).toBeTruthy();
  });
});
