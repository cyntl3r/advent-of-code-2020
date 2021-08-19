import { getInputPath, readInput } from '../utils.js';

const getAccumulatorOfExecution = (input) => {
  let accumulator = 0;
  let currentLineIndex = 0;
  const executedLinesIndexes = [];
  let isLastLineExecuted = false;

  while (true) {
    if (executedLinesIndexes.includes(currentLineIndex)) {
      break;
    }

    if (currentLineIndex >= input.length - 1) {
      isLastLineExecuted = true;
      break;
    }

    executedLinesIndexes.push(currentLineIndex);
    const [instruction, value] = input[currentLineIndex].split(' ');
    const intValue = parseInt(value, 10);

    switch (instruction) {
      case 'acc': {
        accumulator += intValue;
        currentLineIndex += 1;
        break;
      }
      case 'jmp': {
        currentLineIndex += intValue;
        break;
      }
      case 'nop':
      default:
        currentLineIndex += 1;
        break;
    }
  }

  return { accumulator, isLastLineExecuted };
};

const getAccumulatorOfExecutionAfterFix = (input) => {
  const allJmpOrNorIndexes = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i].includes('jmp') || input[i].includes('nop')) {
      allJmpOrNorIndexes.push(i);
    }
  }

  for (const index of allJmpOrNorIndexes) {
    const replaceInstruction = input[index].includes('jmp')
      ? input[index].replace('jmp', 'nop')
      : input[index].replace('nop', 'jmp');
    const copyInput = [...input];
    copyInput[index] = replaceInstruction;

    const result = getAccumulatorOfExecution(copyInput);

    if (result.isLastLineExecuted) {
      return result.accumulator;
    }
  }

  return 'error';
};

export const findResult = (input) => ({
  part1: getAccumulatorOfExecution(input).accumulator,
  part2: getAccumulatorOfExecutionAfterFix(input),
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();

const result = findResult(input);

console.log(result.part1, result.part2);
