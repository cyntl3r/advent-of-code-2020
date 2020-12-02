import { readFileSync } from 'fs';

export const readInput = () => {
  const fileContent = readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .filter((value) => value);
  return {
    toString: () => fileContent,
    toNumber: () => fileContent.map(Number),
  };
};
