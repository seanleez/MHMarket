export const sortDescendingly = (a: any, b: any) => {
  return +(b === null) - +(a === null) || +(b > a) || -(b < a);
};

export const sortAscendingly = (a: any, b: any) => {
  return +(a === null) - +(b === null) || +(a > b) || -(a < b);
};
