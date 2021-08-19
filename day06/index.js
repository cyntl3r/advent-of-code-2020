import { getInputPath, readInput } from '../utils.js';

const getCountOfAnyoneYesAnswered = (data) => {
  const answeredLetters = {};

  data
    .split('\n')
    .filter((line) => line)
    .forEach((line) => {
      line.split('').forEach((letter) => {
        answeredLetters[letter] = null;
      });
    });

  return Object.keys(answeredLetters).length;
};

const getCountOfEveryoneYesAnswered = (data) => {
  let allLetters = {};
  let peopleCount = 0;

  data
    .split('\n')
    .filter((line) => line)
    .forEach((line) => {
      peopleCount += 1;
      line.split('').forEach((letter) => {
        if (!allLetters[letter]) allLetters[letter] = 1;
        else allLetters[letter] += 1;
      });
    });

  return Object.keys(allLetters).filter(
    (key) => allLetters[key] === peopleCount
  ).length;
};

export const findResult = (input) => ({
  part1: input
    .map(getCountOfAnyoneYesAnswered)
    .reduce((prev, next) => prev + next, 0),
  part2: input
    .map(getCountOfEveryoneYesAnswered)
    .reduce((prev, next) => prev + next, 0),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt'),
  true
).toString();

const result = findResult(input);

console.log(result.part1, result.part2);
