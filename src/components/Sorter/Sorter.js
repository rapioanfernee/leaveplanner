export const genericSorter = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const dateSorter = (a, b) => {
  if (new Date(a) < new Date(b)) {
    return -1;
  }
  if (new Date(a) > new Date(b)) {
    return 1;
  }
  return 0;
};
