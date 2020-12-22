/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/13
 */
import { getInputPath, readInput } from '../utils.js';

const getEarliestBus = (input) => {
  const timestamp = parseInt(input[0], 10);
  const busesIds = input[1]
    .split(',')
    .filter((b) => b !== 'x')
    .map((b) => Number(b));
  const maxBusId = Math.max(...busesIds);
  const buses = {};
  for (let i = timestamp; i <= timestamp + maxBusId; i += 1) {
    for (const busId of busesIds) {
      if (!buses[busId]) buses[busId] = [];
      if (i % busId === 0) {
        buses[busId].push(i);
      }
    }
  }
  const earliestTimestamp = Object.values(buses)
    .reduce((prev, next) => [...prev, ...next], [])
    .sort((a, b) => a - b)[0];
  const earliestId = parseInt(
    Object.keys(buses).find((key) => buses[key].includes(earliestTimestamp)),
    10
  );
  return (earliestTimestamp - timestamp) * earliestId;
};

const getEarliestTimestamp = (input) => {
  const busesIds = input[1].split(',').map((b) => Number(b));
  const departMoves = [];
  for (let i = 0; i < busesIds.length; i += 1) {
    if (!isNaN(busesIds[i])) {
      departMoves.push([busesIds[i], i]);
    }
  }
  let timestamp = departMoves[0][0],
    step = departMoves[0][0];
  for (let i = 1; i < departMoves.length; i += 1) {
    const [busId, index] = departMoves[i];
    while ((timestamp + index) % busId !== 0) {
      timestamp += step;
    }
    step = step * busId;
  }
  return timestamp;
};

export const findResult = (input) => ({
  part1: getEarliestBus(input),
  part2: getEarliestTimestamp(input),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
