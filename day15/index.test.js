import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 15 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt')
  ).toString();
  const { part1, part2 } = findResult(input);
  expect(part1).toBe(null);
  expect(part2).toBe(null);
});
