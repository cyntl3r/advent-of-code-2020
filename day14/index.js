/**
 * Advent of Code 2020
 * @author cyntl3r
 * @description https://adventofcode.com/2020/day/14
 */
import { getInputPath, readInput } from '../utils.js';

const parseInput = (input) => {
  let masks = {};
  let currentMask = '';
  for (const line of input) {
    if (line.includes('mask')) {
      const mask = line.split(' = ')[1];
      currentMask = mask;
      masks[currentMask] = [];
    } else {
      const [address, value] = line.split(' = ');
      masks[currentMask].push({
        address: parseInt(address.match(/\d+/)[0], 10),
        value: parseInt(value, 10).toString(2),
      });
    }
  }
  return Object.keys(masks).map((key) => ({
    mask: key,
    memoryWrites: masks[key],
  }));
};

const decimalToBits36 = (value) =>
  [...Array(36 - value.length)].map(() => '0').join('') + value;

const bits36ToDecimal = (value) => parseInt(value, 2);

const getFloating = (value) => {
  const floating = [];
  address36.split('').forEach((char, i) => {
    if (char === 'X') {
      floating.push(i);
    }
  });
  return floating;
};

const getSumOfAllMemoryValues = (input) => {
  const data = parseInput(input);
  const memory = {};
  for (const { mask, memoryWrites } of data) {
    for (const { address, value } of memoryWrites) {
      let value36Bit = decimalToBits36(value);
      mask.split('').forEach((char, i) => {
        const replace = value36Bit.split('');
        if (char !== 'X') {
          replace[i] = char;
        }
        value36Bit = replace.join('');
      });
      memory[address] = bits36ToDecimal(value36Bit);
    }
  }
  return Object.values(memory).reduce((prev, next) => prev + next, 0);
};

const getSumOfAllValuesLeftInMemory = (input) => {
  const data = parseInput(input);
  const memory = {};
  for (const { mask, memoryWrites } of data) {
    for (const { address } of memoryWrites) {
      let address36 = decimalToBits36(address);
      mask.split('').forEach((char, i) => {
        const replace = address36.split('');
        if (char === '1' || char === 'X') {
          replace[i] = char;
        }
        address36 = replace.join('');
      });
      const floating = getFloating(address36);
      let sum = 0;
      floating.forEach((index) => {});
      if (!memory[mask]) memory[mask] = [];
      memory[mask] = parseInt(address36, 2);
    }
  }
  return null;
};

export const findResult = (input) => ({
  part1: getSumOfAllMemoryValues(input),
  part2: null,
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
