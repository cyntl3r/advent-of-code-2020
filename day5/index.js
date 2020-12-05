/**
 * Advent of Code 2020
 * @author cyntl3r
 * @description https://adventofcode.com/2020/day/5
 */
import { readInput } from '../utils.js';

const calculate = (range, rowInstruction) => {
  for (let letter of rowInstruction) {
    if (['F', 'L'].includes(letter)) {
      range[1] -= Math.ceil((range[1] - range[0]) / 2);
    } else if (['B', 'R'].includes(letter)) {
      range[0] += Math.ceil((range[1] - range[0]) / 2);
    }
  }
  if (range[0] === range[1]) return range[0];
  return false;
};

const calculateRow = (rowInstruction) => calculate([0, 127], rowInstruction);

const calculateColumn = (columnInstruction) =>
  calculate([0, 7], columnInstruction);

const getHighestSeatId = (input) => {
  let highestSeatId = 0;
  for (let instruction of input) {
    const row = calculateRow(instruction.substring(0, 7));
    const column = calculateColumn(instruction.substring(7, 11));
    const seatId = row * 8 + column;
    if (row === 0 && column === 0) {
      console.log('seatId', seatId);
    }
    if (seatId > highestSeatId) {
      highestSeatId = seatId;
    }
  }
  return highestSeatId;
};

const findResult = (input) => ({
  part1: getHighestSeatId(input),
  part2: null,
});

const input = readInput().toString();
const result = findResult(input);
console.log(result.part1, result.part2);
