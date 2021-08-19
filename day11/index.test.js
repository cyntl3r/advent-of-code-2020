import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 11 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt')
  ).toString();

  const { part1, part2 } = findResult(input);
  
  expect(part1).toBe(2489);
  expect(part2).toBe(2180);
});
