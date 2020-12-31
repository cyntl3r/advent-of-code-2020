/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/17
 */
import { getInputPath, readInput } from '../utils.js';

const getCountOfCubesLeftAfterSixthCycle = (input) => {
  console.log(input.map((line) => [...line.split('')]));
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
