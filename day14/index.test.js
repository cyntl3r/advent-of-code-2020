/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/14
 */
import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 14 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt')
  ).toString();
  const { part1, part2 } = findResult(input);
  expect(part1).toBe(10035335144067);
  expect(part2).toBe(3817372618036);
});
