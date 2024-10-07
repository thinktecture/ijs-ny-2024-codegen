import { Tree } from '@nx/devkit';
import { createSourceFile, ScriptTarget } from 'typescript';

export function getSourceFile(tree: Tree, filePath: string) {
  const moduleSrc = tree.read(filePath, 'utf-8');
  return createSourceFile(filePath, moduleSrc, ScriptTarget.Latest, true);
}
