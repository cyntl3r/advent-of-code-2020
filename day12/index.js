/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/12
 */
import { getInputPath, readInput } from '../utils.js';

const getManhattanDistance = (input, isWaypoint = false) => {
  const directions = {
    E: 0,
    N: 1,
    W: 2,
    S: 3,
  };
  const shipPosition = [0, 0];
  let direction = directions.E;
  let waypointPosition = [1, 10];
  for (const instruction of input) {
    const [action, ...value] = instruction.split('');
    const intValue = parseInt(value.join(''), 10);
    switch (action) {
      case 'N': {
        if (isWaypoint) {
          waypointPosition[0] += intValue;
          break;
        }
        shipPosition[0] += intValue;
        break;
      }
      case 'S': {
        if (isWaypoint) {
          waypointPosition[0] -= intValue;
          break;
        }
        shipPosition[0] -= intValue;
        break;
      }
      case 'W': {
        if (isWaypoint) {
          waypointPosition[1] -= intValue;
          break;
        }
        shipPosition[1] -= intValue;
        break;
      }
      case 'E': {
        if (isWaypoint) {
          waypointPosition[1] += intValue;
          break;
        }
        shipPosition[1] += intValue;
        break;
      }
      case 'L': {
        if (isWaypoint) {
          for (let i = 0; i < intValue / 90; i += 1) {
            waypointPosition = waypointPosition.reverse();
            waypointPosition[1] = -1 * waypointPosition[1];
          }
          break;
        }
        direction = (direction + intValue / 90 + 4) % 4;
        break;
      }
      case 'R': {
        if (isWaypoint) {
          for (let i = 0; i < intValue / 90; i += 1) {
            waypointPosition = waypointPosition.reverse();
            waypointPosition[0] = -1 * waypointPosition[0];
          }
          break;
        }
        direction = (direction - intValue / 90 + 4) % 4;
        break;
      }
      case 'F': {
        if (isWaypoint) {
          shipPosition[0] += waypointPosition[0] * intValue;
          shipPosition[1] += waypointPosition[1] * intValue;
          break;
        }
        switch (direction) {
          case directions.N: {
            shipPosition[0] += intValue;
            break;
          }
          case directions.S: {
            shipPosition[0] -= intValue;
            break;
          }
          case directions.W: {
            shipPosition[1] -= intValue;
            break;
          }
          case directions.E: {
            shipPosition[1] += intValue;
            break;
          }
        }
        break;
      }
    }
  }
  return Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]);
};

export const findResult = (input) => ({
  part1: getManhattanDistance(input),
  part2: getManhattanDistance(input, true),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
