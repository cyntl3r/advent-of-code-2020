/**
 * Advent of Code 2020
 * @author cyntler
 * @description https://adventofcode.com/2020/day/4
 */
export const validationSchema = [
  {
    field: 'byr',
    validator: (value) =>
      value.length === 4 &&
      parseInt(value, 10) >= 1920 &&
      parseInt(value, 10) <= 2002,
  },
  {
    field: 'iyr',
    validator: (value) =>
      value.length === 4 &&
      parseInt(value, 10) >= 2010 &&
      parseInt(value, 10) <= 2020,
  },
  {
    field: 'eyr',
    validator: (value) =>
      value.length === 4 &&
      parseInt(value, 10) >= 2020 &&
      parseInt(value, 10) <= 2030,
  },
  {
    field: 'hgt',
    validator: (value) =>
      value.includes('cm')
        ? parseInt(value, 10) >= 150 && parseInt(value, 10) <= 193
        : value.includes('in')
        ? parseInt(value, 10) >= 59 && parseInt(value, 10) <= 76
        : false,
  },
  {
    field: 'hcl',
    validator: (value) => /#([a-f0-9]{3}){1,2}\b/i.test(value),
  },
  {
    field: 'ecl',
    validator: (value) =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  },
  {
    field: 'pid',
    validator: (value) => /^[0-9]{9}$/.test(value),
  },
  {
    field: 'cid',
    validator: () => true,
    optional: true,
  },
];
