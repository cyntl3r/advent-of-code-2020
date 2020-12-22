/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/7
 */
import { getInputPath, readInput } from '../utils.js';

const createBagChildren = (children) =>
  children.map((ch) => {
    const [count, name1, name2] = ch.split(' ');
    return {
      name: [name1, name2].join(' '),
      count: parseInt(count, 10),
    };
  });

const prepareBags = (input) => {
  const bags = new Map();
  input.forEach((line) => {
    const [name, contain] = line.split(' bags contain ');
    bags.set(
      name,
      createBagChildren(
        contain.includes('no other bags')
          ? []
          : contain.split(', ').map((n) => n.replace(/bags?/g, ''))
      )
    );
  });
  return bags;
};

const containShinyGold = (name, bags) => {
  if (name === 'shiny gold') return true;
  if (!bags.has(name)) return false;
  const children = bags.get(name);
  for (const { name } of children) {
    if (containShinyGold(name, bags)) {
      return true;
    }
  }
  return false;
};

const getSumOfShinyGold = (topBag, bags) => {
  if (!topBag.count) return 0;
  const bagsWithin = bags.get(topBag.name);
  let sum = 1;
  for (const bag of bagsWithin) {
    sum += bag.count * getSumOfShinyGold(bag, bags);
  }
  return sum;
};

const getCountOfColorsEventuallyContainShinyGoldBag = (bags) => {
  let count = 0;
  const keys = bags.keys();
  for (const name of keys) {
    if (containShinyGold(name, bags) && name !== 'shiny gold') {
      count += 1;
    }
  }
  return count;
};

const getSumOfShinyGoldContain = (bags) => {
  return getSumOfShinyGold({ name: 'shiny gold', count: 1 }, bags) - 1;
};

export const findResult = (input) => {
  const bags = prepareBags(input);
  return {
    part1: getCountOfColorsEventuallyContainShinyGoldBag(bags),
    part2: getSumOfShinyGoldContain(bags),
  };
};

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();
const result = findResult(input);
console.log(result.part1, result.part2);
