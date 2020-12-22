/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/5
 */
import { getInputPath, readInput } from '../utils.js';

const calculateRange = (range, rowInstruction) => {
  for (const letter of rowInstruction) {
    if (['F', 'L'].includes(letter)) {
      range[1] -= Math.ceil((range[1] - range[0]) / 2);
    } else if (['B', 'R'].includes(letter)) {
      range[0] += Math.ceil((range[1] - range[0]) / 2);
    }
  }
  return range[0];
};

const calculateRow = (rowInstruction) =>
  calculateRange([0, 127], rowInstruction);

const calculateColumn = (columnInstruction) =>
  calculateRange([0, 7], columnInstruction);

const getSeatId = (instruction) => {
  const row = calculateRow(instruction.substring(0, 7));
  const column = calculateColumn(instruction.substring(7, 11));
  return row * 8 + column;
};

const getHighestSeatId = (input) => {
  let highestSeatId = 0;
  for (const instruction of input) {
    const seatId = getSeatId(instruction);
    if (seatId > highestSeatId) {
      highestSeatId = seatId;
    }
  }
  return highestSeatId;
};

const findMissingSeat = (input) => {
  let seats = [];
  let missingSeat = null;
  input.forEach((instruction) => seats.push(getSeatId(instruction)));
  seats.sort((a, b) => a - b);
  seats.map((seat, index) => {
    if (index > 0 && index < seats.length) {
      if (seat - seats[index - 1] !== 1) {
        missingSeat = seat - 1;
      }
    }
  });
  return missingSeat;
};

export const findResult = (input) => ({
  part1: getHighestSeatId(input),
  part2: findMissingSeat(input),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
