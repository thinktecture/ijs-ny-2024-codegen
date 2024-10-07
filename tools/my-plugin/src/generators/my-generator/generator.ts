import { applicationGenerator } from '@nx/angular/generators';
import { addImportToComponent } from '@nx/angular/src/utils';
import { generateFiles, joinPathFragments, readProjectConfiguration, Tree } from '@nx/devkit';
import { insertImport } from '@nx/js';
import { getSourceFile } from '../utils/get-source-file';
import { MyGeneratorGeneratorSchema } from './schema';

export async function myGeneratorGenerator(
  tree: Tree,
  options: MyGeneratorGeneratorSchema
) {
  await applicationGenerator(tree, {
    name: options.name,
    routing: true,
    prefix: options.name,
    style: 'scss',
  });

  const sourceDir = joinPathFragments(__dirname, 'files');
  const projectDir = readProjectConfiguration(tree, options.name).root;
  const destinationDir = joinPathFragments(projectDir, 'src', 'app');
  generateFiles(tree, sourceDir, destinationDir, {});

  const appComponentPath = joinPathFragments(destinationDir, 'app.component.ts');
  addImportToComponent(tree, getSourceFile(tree, appComponentPath), appComponentPath, 'MyLibraryComponent');
  insertImport(tree, getSourceFile(tree, appComponentPath), appComponentPath, 'MyLibraryComponent', '@my-workspace/my-library');
}

export default myGeneratorGenerator;
