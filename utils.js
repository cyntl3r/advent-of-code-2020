import { readFileSync } from 'fs';

export const readInput = (splitByNewLine = false) => {
  const fileContent = readFileSync('./input.txt', 'utf-8')
    .split(splitByNewLine ? /\n{2,}/g : '\n')
    .filter((value) => (splitByNewLine ? true : value !== ''));
  return {
    toString: () => fileContent,
    toNumber: () => fileContent.map(Number),
  };
};
