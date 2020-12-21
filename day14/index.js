/**
 * Advent of Code 2020
 * @author cyntl3r
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
      masks[currentMask].push({
        address: parseAddressToBit ? adr.toString(2) : adr,
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
  [...new Array(36 - value.length)].map(() => '0').join('') + value;

const bits36ToDecimal = (value) => parseInt(value, 2);

const getFloatingLength = (value) =>
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
      const floatingLength = getFloatingLength(address36Bit);
      let addressSplit = address36Bit.split('');
      let changedIndexes = [];
      for (let i = 1; i <= Math.pow(2, floatingLength); i += 1) {
        console.log(addressSplit.join(''));
        for (let y = 0; y < addressSplit.length; y += 1) {
          const char = addressSplit[y];
          if (char === '0' && changedIndexes.includes(y)) {
            addressSplit[y] = '1';
            const newAddressValue = bits36ToDecimal(addressSplit);
            if (!memory[newAddressValue]) {
              memory[newAddressValue] = [];
            }
            memory[newAddressValue].push(value);
            break;
          }
          if (char === 'X') {
            addressSplit[y] = '0';
            changedIndexes.push(y);
            const newAddressValue = bits36ToDecimal(addressSplit);
            if (!memory[newAddressValue]) {
              memory[newAddressValue] = [];
            }
            memory[newAddressValue].push(value);
          }
        }
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
