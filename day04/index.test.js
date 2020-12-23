/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/4
 */
import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 04 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt'),
    true
  ).toString();
  const { part1, part2 } = findResult(input);
  expect(part1).toBe(230);
  expect(part2).toBe(156);
});
