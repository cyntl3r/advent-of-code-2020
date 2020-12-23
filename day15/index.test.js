/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/15
 */
import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 15 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt')
  ).toString();
  const { part1, part2 } = findResult(input);
  expect(part1).toBe(517);
  expect(part2).toBe(1047739);
});
