/**
 * Advent of Code 2020
 * @author cyntl3r
 * @description https://adventofcode.com/2020/day/1
 */
import { readInput } from '../utils.js';

const isNumbersSum2020 = (...nums) =>
  nums.reduce((prev, current) => prev + current, 0) === 2020;

const findResult = (input) => {
  let resultOfTwoNumbersSum = 0;
  let resultOfThreeNumbersSum = 0;
  for (let num1 of input) {
    if (resultOfTwoNumbersSum > 0 && resultOfThreeNumbersSum > 0) break;
    for (let num2 of input) {
      if (isNumbersSum2020(num1, num2)) {
        resultOfTwoNumbersSum = num1 * num2;
      }
      for (let num3 of input) {
        if (isNumbersSum2020(num1, num2, num3)) {
          resultOfThreeNumbersSum = num1 * num2 * num3;
        }
      }
    }
  }
  return {
    resultOfTwoNumbersSum,
    resultOfThreeNumbersSum,
  };
};

const input = readInput().toNumber();
const result = findResult(input);
console.log(result.resultOfTwoNumbersSum, result.resultOfThreeNumbersSum);
