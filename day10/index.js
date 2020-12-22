/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/10
 */
import { getInputPath, readInput } from '../utils.js';

const countDifferences = (lines, joltNumber) => {
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i + 1] - lines[i] === joltNumber) {
      count += 1;
    }
  }
  return count + 1;
};

const findMultiply1And3Differences = (lines) =>
  countDifferences(lines, 1) * countDifferences(lines, 3);

const combination = (arr, cache = {}) => {
  const key = arr.join(',');
  if (key in cache) {
    return cache[key];
  }
  let result = 1;
  for (let i = 1; i < arr.length - 1; i += 1) {
    if (arr[i + 1] - arr[i - 1] <= 3) {
      const newArr = [arr[i - 1], ...arr.slice(i + 1)];
      result += combination(newArr, cache);
    }
  }
  cache[key] = result;
  return result;
};

const getTotalNumberOfConnectWays = (lines) => {
  const min = 0;
  const max = Math.max(...input) + 3;
  const arr = [min, ...lines, max];
  return combination(arr);
};

export const findResult = (input) => {
  const lines = [...input];
  lines.sort((a, b) => a - b);
  return {
    part1: findMultiply1And3Differences(lines),
    part2: getTotalNumberOfConnectWays(lines),
  };
};

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toNumber();
const result = findResult(input);
console.log(result.part1, result.part2);
