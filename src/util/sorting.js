const sortArrayAscending = (arr) => {
  return [...arr].sort((a, b) => a - b);
};

const sortArrayDescending = (arr) => {
  return [...arr].sort((a, b) => b - a);
};

export { sortArrayAscending, sortArrayDescending };
