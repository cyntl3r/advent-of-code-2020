import { getInputPath, readInput } from '../utils.js';

const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 1, y: 1 },
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const adjacentCounter = (area, lineIndex, letterIndex) => {
  const seats = [];

  directions.forEach((dir) => {
    const line = lineIndex + dir.y;
    const letter = letterIndex + dir.x;
    if (area[line]) {
      seats.push(area[line][letter]);
    }
  });

  return seats.filter((s) => s === '#').length;
};

const occupiedInDirectionsCounter = (area, lineIndex, letterIndex) => {
  const seats = [];

  directions.forEach((dir) => {
    let currentLine = lineIndex + dir.y;
    let currentLetter = letterIndex + dir.x;

    while (
      currentLine >= 0 &&
      currentLine < area.length &&
      currentLetter >= 0 &&
      currentLetter < area[currentLine].length
    ) {
      if (area[currentLine][currentLetter] === '#') {
        seats.push(area[currentLine][currentLetter]);
        break;
      }

      if (area[currentLine][currentLetter] === 'L') {
        break;
      }

      currentLine += dir.y;
      currentLetter += dir.x;
    }
  });

  return seats.length;
};

const parseArea = (areaStr) =>
  JSON.parse(areaStr).map((line) => line.split(''));

const strigifyArea = (areaObj) =>
  JSON.stringify(areaObj.map((line) => line.join('')));

const simulateSeatingArea = (areaStr, isLookingForDirections) => {
  const area = parseArea(areaStr);
  const changes = {};

  for (let i = 0; i < area.length; i += 1) {
    for (let j = 0; j < area[i].length; j += 1) {
      if (area[i][j] === 'L') {
        const isValid = isLookingForDirections
          ? occupiedInDirectionsCounter(area, i, j) === 0
          : adjacentCounter(area, i, j) === 0;

        if (isValid) {
          changes[`${i},${j}`] = '#';
        }
      }
      if (area[i][j] === '#') {
        const isValid = isLookingForDirections
          ? occupiedInDirectionsCounter(area, i, j) >= 5
          : adjacentCounter(area, i, j) >= 4;

        if (isValid) {
          changes[`${i},${j}`] = 'L';
        }
      }
    }
  }

  for (const change in changes) {
    const [i, y] = change.split(',');
    area[i][y] = changes[change];
  }

  return strigifyArea(area);
};

const getCountOfOccupiedSeatsAfterSimulation = (
  input,
  isLookingForDirections = false
) => {
  let lastArea = JSON.stringify(input);

  while (true) {
    const area = simulateSeatingArea(lastArea, isLookingForDirections);
    if (area === lastArea) {
      break;
    }

    lastArea = area;
  }

  return lastArea.split('').filter((char) => char === '#').length;
};

export const findResult = (input) => ({
  part1: getCountOfOccupiedSeatsAfterSimulation(input),
  part2: getCountOfOccupiedSeatsAfterSimulation(input, true),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();

const result = findResult(input);

console.log(result.part1, result.part2);
