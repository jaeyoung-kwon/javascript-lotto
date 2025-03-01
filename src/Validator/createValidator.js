import { throwCustomError } from "../util/throwCustomError";

export const createValidator = (rules, value) => {
  rules.forEach(([validateFunction, errorMessage]) => {
    if (!validateFunction(value)) {
      throwCustomError(errorMessage);
    }
  });
};
