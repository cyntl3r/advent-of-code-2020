/**
 * Advent of Code 2020
 * @author cyntl3r
 * @description https://adventofcode.com/2020/day/3
 */
import { readInput } from '../utils.js';

const isTreeInPattern = (pattern, index) =>
  [...Array(Math.ceil(index / pattern.length)).keys()].reduce(
    (prev) => prev + pattern,
    pattern
  )[index] === '#';

const getCountOfTrees = (input, right, down) => {
  let counter = 0,
    currentXIndex = right;
  for (let i = down; i < input.length; i += down) {
    if (isTreeInPattern(input[i], currentXIndex)) {
      counter += 1;
    }
    currentXIndex += right;
  }
  return counter;
};

const findResult = (input) => ({
  part1: getCountOfTrees(input, 3, 1),
  part2: [
    getCountOfTrees(input, 1, 1),
    getCountOfTrees(input, 3, 1),
    getCountOfTrees(input, 5, 1),
    getCountOfTrees(input, 7, 1),
    getCountOfTrees(input, 1, 2),
  ].reduce((prev, next) => prev * next, 1),
});

const input = readInput().toString();
const result = findResult(input);
console.log(result.part1, result.part2);
