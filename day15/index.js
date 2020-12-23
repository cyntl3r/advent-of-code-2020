/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/15
 */
import { getInputPath, readInput } from '../utils.js';

const getLastSpokenIndexes = (spokenNumbers, lastSpoken) => {
  const indexes = [];
  spokenNumbers.forEach((num, i) => {
    if (num === lastSpoken) {
      indexes.push(i);
    }
  });
  return indexes;
};

const getSpokenNumber = (input, n) => {
  const startingNumbers = input[0].split(',').map((n) => Number(n));
  const spoken = new Map();
  startingNumbers.forEach((num, i) => spoken.set(num, i + 1));
  let current = 0;
  for (let turn = startingNumbers.length + 1; turn < n; turn += 1) {
    if (spoken.has(current)) {
      const index = spoken.get(current);
      spoken.set(current, turn);
      current = turn - index;
    } else {
      spoken.set(current, turn);
      current = 0;
    }
  }
  return current;
};

export const findResult = (input) => ({
  part1: getSpokenNumber(input, 2020),
  part2: getSpokenNumber(input, 30000000),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
