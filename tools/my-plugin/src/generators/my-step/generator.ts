import { Tree } from '@nx/devkit';
import { dasherize } from '@nx/devkit/src/utils/string-utils';
import { wrapAngularDevkitSchematic } from 'nx/src/adapter/ngcli-adapter';
import { MyStepGeneratorSchema } from './schema';

export async function myStepGenerator(
  tree: Tree,
  options: MyStepGeneratorSchema
) {
  const componentSchematic = wrapAngularDevkitSchematic(
    '@schematics/angular',
    'component'
  );
  await componentSchematic(tree, {
    name: dasherize(options.name),
    project: options.project,
  });
}

export default myStepGenerator;
