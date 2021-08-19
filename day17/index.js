import { getInputPath, readInput } from '../utils.js';

const getCountOfCubesLeftAfterSixthCycle = (input) => {
  return null;
};

export const findResult = (input) => ({
  part1: getCountOfCubesLeftAfterSixthCycle(input),
  part2: null,
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();

const result = findResult(input);

console.log(result.part1, result.part2);
