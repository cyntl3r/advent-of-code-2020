/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/17
 */
import { getInputPath, readInput } from '../utils.js';

const initMap = (input) => {
  const map = new Map();
  const data = input.map((line) => [...line.split('')]);
  data.forEach((line, y) => {
    line.forEach((field, x) => {
      map.set(`${x},${y},0`, field);
    });
  });
  return map;
};

const getCountOfCubesLeftAfterSixthCycle = (input) => {
  const map = initMap(input);
  console.log(map);
  return null;
};

export const findResult = (input) => ({
  part1: getCountOfCubesLeftAfterSixthCycle(input),
  part2: null,
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
