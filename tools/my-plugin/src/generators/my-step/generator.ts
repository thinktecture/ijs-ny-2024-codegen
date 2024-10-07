import {
  applyChangesToString,
  ChangeType,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { classify, dasherize } from '@nx/devkit/src/utils/string-utils';
import { wrapAngularDevkitSchematic } from 'nx/src/adapter/ngcli-adapter';
import { Identifier, isIdentifier, isVariableStatement } from 'typescript';
import { getSourceFile } from '../utils/get-source-file';
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

  const projectDir = readProjectConfiguration(tree, options.project).root;
  const workflowFileName = joinPathFragments(
    projectDir,
    'src',
    'app',
    'app.workflow.ts'
  );
  const sourceFile = getSourceFile(tree, workflowFileName);

  const stepsDeclaration = sourceFile.statements
    .filter(isVariableStatement)
    .map((s) => s.declarationList.declarations[0])
    .filter((d) => isIdentifier(d.name))
    .find((d) => (d.name as Identifier).escapedText === 'loginSteps');

  const stepToAdd = `"${classify(options.name)}",`;
  const newContents = applyChangesToString(sourceFile.text, [
    {
      type: ChangeType.Insert,
      index: stepsDeclaration.end - 1,
      text: stepToAdd
    },
  ]);
  tree.write(workflowFileName, newContents);
}

export default myStepGenerator;
