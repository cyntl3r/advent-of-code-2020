import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 09 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt')
  ).toNumber();
  const { part1, part2 } = findResult(input);
  expect(part1).toBe(88311122);
  expect(part2).toBe(13549369);
});
