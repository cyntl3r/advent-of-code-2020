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
          name: key,
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
  const ticketInvalidValues = [];
  const validNearbyTicketsIndexes = [];
  for (let i = 0; i < nearbyTickets.length; i += 1) {
    const ticket = nearbyTickets[i];
    const invalidValues = [];
    for (const value of ticket) {
      const isValueInvalid =
        requirementArr.filter(({ min, max }) => value >= min && value <= max)
          .length === 0;
      if (isValueInvalid) {
        invalidValues.push(value);
      }
    }
    if (invalidValues.length) {
      ticketInvalidValues.push(...invalidValues);
    } else {
      validNearbyTicketsIndexes.push(i);
    }
  }
  return {
    result: ticketInvalidValues.reduce((prev, next) => prev + next, 0),
    validNearbyTickets: nearbyTickets.filter((_ticket, i) =>
      validNearbyTicketsIndexes.includes(i)
    ),
  };
};

const getMultiplyOfDepartureValues = (input, validNearbyTickets) => {
  const { requirements, ticket } = parseInput(input);
  const departureRequirements =
    input.length > 9
      ? requirements.filter(({ name }) => name.includes('departure'))
      : requirements;
  const values = {};
  for (const nearbyTicket of validNearbyTickets) {
    for (let i = 0; i < nearbyTicket.length; i += 1) {
      const value = nearbyTicket[i];
      if (!values[i]) values[i] = [];
      values[i].push(value);
    }
  }
  const valuesIndexes = Object.keys(values);
  const data = {};
  for (const key of valuesIndexes) {
    const valuesArr = values[key];
    let firstName;
    for (const { name, value: validators } of departureRequirements) {
      if (
        valuesArr.every(
          (val) =>
            validators.filter(({ min, max }) => val >= min && val <= max)
              .length > 0
        )
      ) {
        console.log(name, key);
        if (Object.values(data).includes(name)) {
          continue;
        } else {
          firstName = name;
          break;
        }
      }
    }
    if (firstName) {
      data[key] = firstName;
    }
  }
  console.log(data);
  const ticketValues = Object.keys(data)
    .map((key) => Number(key))
    .map((index) => ticket[index]);
  console.log(ticketValues);
  return ticketValues.reduce((prev, next) => prev * next, 1);
};

export const findResult = (input) => {
  const {
    result: ticketScanningErrorRate,
    validNearbyTickets,
  } = getTicketScanningErrorRate(input);
  return {
    part1: ticketScanningErrorRate,
    part2: getMultiplyOfDepartureValues(input, validNearbyTickets),
  };
};

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
