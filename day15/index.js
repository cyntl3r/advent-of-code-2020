/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/15
 */
import { getInputPath, readInput } from '../utils.js';

export const findResult = (input) => ({
  part1: null,
  part2: null,
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
