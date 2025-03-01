export const isInRange = (value, min, max) => value >= min && value <= max;

export const isMoreThanMax = (value, max) => value > max;

export const isLessThanMin = (value, min) => value < min;

export const isDuplicated = (arr) => new Set(arr).size !== arr.length;

export const isNumber = (number) => !Number.isNaN(number);

export const isInteger = (number) => Number.isInteger(number);

export const isMultipleOfUnit = (number, unit) => number % unit === 0;

export const isValidArrayLength = (arr, value) => arr.length === value;

export const isIncludesInArray = (arr, value) => arr.includes(value);

export const isOneOf = (value, candidates) => candidates.includes(value);
