/**
 * Advent of Code 2020
 * @author cyntl3r
 * @description https://adventofcode.com/2020/day/9
 */
import { getInputPath, readInput } from '../utils.js';

const currentPreambleChecker = (initialArr) => {
  const arr = initialArr;
  return {
    sumExists(number) {
      for (let i = 0; i < arr.length; i += 1) {
        for (let y = i + 1; y < arr.length; y += 1) {
          if (arr[i] + arr[y] === number) {
            return true;
          }
        }
      }
      return false;
    },
    push(number) {
      arr.shift();
      arr.push(number);
    },
  };
};

const getTheFirstNumberIsNotSum = (input) => {
  const preamble = input.length > 20 ? 25 : 5;
  const arr = input.slice(0, preamble);
  const checker = currentPreambleChecker(arr);
  let invalid;
  for (let i = preamble; i < input.length; i += 1) {
    const num = input[i];
    if (checker.sumExists(num)) {
      checker.push(num);
    } else {
      invalid = num;
      break;
    }
  }
  return invalid;
};

const encryptionWeaknessFinder = (input, invalidNumber) => {
  let arr = [];
  for (let i = 0; i < input.length; i++) {
    arr.push(input[i]);
    const restOfArr = input.slice(i + 1);
    for (const item of restOfArr) {
      arr.push(item);
      if (arr.reduce((prev, next) => prev + next, 0) === invalidNumber) {
        return arr;
      }
    }
    arr = [];
  }
};

const findEncryptionWeakness = (input, invalidNumber) => {
  const arr = encryptionWeaknessFinder(input, invalidNumber);
  return Math.min(...arr) + Math.max(...arr);
};

export const findResult = (input) => {
  const part1Result = getTheFirstNumberIsNotSum(input);
  return {
    part1: part1Result,
    part2: findEncryptionWeakness(input, part1Result),
  };
};

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toNumber();
const result = findResult(input);
console.log(result.part1, result.part2);
