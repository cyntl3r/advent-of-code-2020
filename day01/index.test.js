import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 01 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt')
  ).toNumber();
  
  const { part1, part2 } = findResult(input);

  expect(part1).toBe(974304);
  expect(part2).toBe(236430480);
});
