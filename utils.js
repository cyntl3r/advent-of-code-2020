import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

export const getInputPath = (metaUrl, fileName) =>
  join(dirname(fileURLToPath(metaUrl)), fileName);

export const readInput = (filePath, splitByNewLine = false) => {
  const fileContent = readFileSync(filePath, 'utf-8')
    .split(splitByNewLine ? /\n{2,}/g : '\n')
    .filter((value) => (splitByNewLine ? true : value !== ''));
  return {
    toString: () => fileContent,
    toNumber: () => fileContent.map(Number),
  };
};
