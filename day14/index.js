/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/14
 */
import { getInputPath, readInput } from '../utils.js';

const parseInput = (input, parseAddressToBit = false) => {
  let masks = {};
  let currentMask = '';
  for (const line of input) {
    if (line.includes('mask')) {
      const mask = line.split(' = ')[1];
      currentMask = mask;
      masks[currentMask] = [];
    } else {
      const [address, value] = line.split(' = ');
      const adr = parseInt(address.match(/\d+/)[0], 10);
      const val = parseInt(value, 10);
      masks[currentMask].push({
        address: parseAddressToBit ? adr.toString(2) : adr,
        value: !parseAddressToBit ? val.toString(2) : val,
      });
    }
  }
  return Object.keys(masks).map((key) => ({
    mask: key,
    memoryWrites: masks[key],
  }));
};

const decimalToBits36 = (value) => value.toString().padStart(36, '0');

const bits36ToDecimal = (value) => parseInt(value, 2);

const getFloatingCount = (value) =>
  value.split('').filter((char) => char === 'X').length;

const applyMaskToValue = (value, mask) => {
  let newValue = value.split('');
  mask.split('').forEach((char, i) => {
    if (char !== 'X') {
      newValue[i] = char;
    }
  });
  return newValue.join('');
};

const applyMaskToAddress = (value, mask) => {
  let newValue = value.split('');
  mask.split('').forEach((char, i) => {
    if (char === '1' || char === 'X') {
      newValue[i] = char;
    }
  });
  return newValue.join('');
};

const getSumOfAllMemoryValues = (input) => {
  const data = parseInput(input);
  const memory = {};
  for (const { mask, memoryWrites } of data) {
    for (const { address, value } of memoryWrites) {
      memory[address] = bits36ToDecimal(
        applyMaskToValue(decimalToBits36(value), mask)
      );
    }
  }
  return Object.values(memory).reduce((prev, next) => prev + next, 0);
};

const getSumOfAllValuesLeftInMemory = (input) => {
  const data = parseInput(input, true);
  const memory = {};
  for (const { mask, memoryWrites } of data) {
    for (const { address, value } of memoryWrites) {
      let address36Bit = applyMaskToAddress(decimalToBits36(address), mask);
      const floatingCount = getFloatingCount(address36Bit);
      for (let i = 0; i < Math.pow(2, floatingCount); i += 1) {
        const f = i.toString(2).padStart(floatingCount, '0');
        let ri = 0;
        const newAddress = bits36ToDecimal(
          address36Bit.replace(/X/g, () => f.charAt(ri++))
        );
        memory[newAddress] = value;
      }
    }
  }
  return Object.values(memory).reduce((prev, next) => prev + next, 0);
};

export const findResult = (input) => ({
  part1: getSumOfAllMemoryValues(input),
  part2: getSumOfAllValuesLeftInMemory(input),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
