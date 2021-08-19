import { getInputPath, readInput } from '../utils.js';

const splitPolicyAndPassword = (policyAndPassword) => {
  const [policy, password] = policyAndPassword.split(': ');
  const [policyRange, policyLetter] = policy.split(' ');
  const [policyRangeFrom, policyRangeTo] = policyRange.split('-');

  return { password, policyLetter, policyRangeFrom, policyRangeTo };
};

const isPasswordContainsPolicy = (policyAndPassword) => {
  const {
    password,
    policyLetter,
    policyRangeFrom,
    policyRangeTo,
  } = splitPolicyAndPassword(policyAndPassword);
  let counter = 0;

  for (const passwordLetter of password) {
    if (passwordLetter === policyLetter) {
      counter += 1;
    }
  }

  return counter >= policyRangeFrom && counter <= policyRangeTo;
};

const isPasswordContainsValidIndexes = (policyAndPassword) => {
  const {
    password,
    policyLetter,
    policyRangeFrom,
    policyRangeTo,
  } = splitPolicyAndPassword(policyAndPassword);
  let counter = 0;

  for (let i = 0; i < password.length; i += 1) {
    if (i === policyRangeFrom - 1 && password[i] === policyLetter) {
      counter += 1;
    }

    if (i === policyRangeTo - 1 && password[i] === policyLetter) {
      counter += 1;
    }
  }

  return counter === 1;
};

export const findResult = (input) => ({
  part1: input.filter(isPasswordContainsPolicy).length,
  part2: input.filter(isPasswordContainsValidIndexes).length,
});

const input = readInput(
  getInputPath(import.meta.url, './input.txt')
).toString();

const result = findResult(input);

console.log(result.part1, result.part2);
