/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/16
 */
import { getInputPath, readInput } from '../utils.js';

const parseInput = (input) => {
  const requirements = [];
  let ticket = [];
  const nearbyTickets = [];
  let current = null;
  for (const line of input) {
    const [key, value] = line.split(':');
    if (key.includes('your ticket')) {
      current = 'your ticket';
      continue;
    } else if (key.includes('nearby tickets')) {
      current = 'nearby tickets';
      continue;
    }
    switch (current) {
      case 'your ticket': {
        ticket = key.split(',').map((val) => Number(val));
        break;
      }
      case 'nearby tickets': {
        nearbyTickets.push(key.split(',').map((val) => Number(val)));
        break;
      }
      default: {
        requirements.push({
          key,
          value: value
            .split(' or ')
            .map((val) => val.trim())
            .map((val) => {
              const [min, max] = val.split('-').map((val) => Number(val));
              return { min, max };
            }),
        });
        break;
      }
    }
  }
  return { requirements, ticket, nearbyTickets };
};

const getTicketScanningErrorRate = (input) => {
  const { requirements, nearbyTickets } = parseInput(input);
  const requirementArr = requirements
    .map(({ value }) => value)
    .reduce((prev, next) => [...prev, ...next], []);
  let ticketInvalidValues = [];
  for (const ticket of nearbyTickets) {
    const invalidValues = [];
    for (const value of ticket) {
      const isValueInvalid =
        requirementArr.filter(({ min, max }) => value >= min && value <= max)
          .length === 0;
      if (isValueInvalid) {
        invalidValues.push(value);
      }
    }
    ticketInvalidValues.push(...invalidValues);
  }
  return ticketInvalidValues.reduce((prev, next) => prev + next, 0);
};

export const findResult = (input) => ({
  part1: getTicketScanningErrorRate(input),
  part2: null,
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
