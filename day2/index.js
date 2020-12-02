/**
 * Advent of Code 2020
 * @author cyntl3r
 * @description https://adventofcode.com/2020/day/2
 */
import { readInput } from '../utils.js';

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
  for (let passwordLetter of password) {
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

const findResult = (input) => ({
  countOfPasswordsContainPolicy: input.filter(isPasswordContainsPolicy).length,
  countOfPasswordsContainValidPolicyIndexes: input.filter(
    isPasswordContainsValidIndexes
  ).length,
});

const input = readInput().toString();
const result = findResult(input);
console.log(
  result.countOfPasswordsContainPolicy,
  result.countOfPasswordsContainValidPolicyIndexes
);
