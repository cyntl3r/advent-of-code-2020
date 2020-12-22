/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/1
 */
import { getInputPath, readInput } from '../utils.js';

const isNumbersSum2020 = (...nums) =>
  nums.reduce((prev, current) => prev + current, 0) === 2020;

export const findResult = (input) => {
  let resultOfTwoNumbersSum = 0;
  let resultOfThreeNumbersSum = 0;
  for (const num1 of input) {
    if (resultOfTwoNumbersSum > 0 && resultOfThreeNumbersSum > 0) break;
    for (const num2 of input) {
      if (isNumbersSum2020(num1, num2)) {
        resultOfTwoNumbersSum = num1 * num2;
      }
      for (const num3 of input) {
        if (isNumbersSum2020(num1, num2, num3)) {
          resultOfThreeNumbersSum = num1 * num2 * num3;
        }
      }
    }
  }
  return {
    part1: resultOfTwoNumbersSum,
    part2: resultOfThreeNumbersSum,
  };
};

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toNumber();
const result = findResult(input);
console.log(result.part1, result.part2);
