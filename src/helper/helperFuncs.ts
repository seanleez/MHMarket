import {
  FLOOR_MANAGEMENT,
  MARKET_MANAGEMENT,
  RATE_MANAGEMENT,
  ROLE_MANAGEMENT,
  USER_MANAGEMENT,
} from '../const/const';

export const sortDescendingly = (a: any, b: any) => {
  return +(b === null) - +(a === null) || +(b > a) || -(b < a);
};

export const sortAscendingly = (a: any, b: any) => {
  return +(a === null) - +(b === null) || +(a > b) || -(a < b);
};

export const getIdFieldByName = (name: string) => {
  if (name === ROLE_MANAGEMENT) {
    return 'role_id';
  } else if (name === USER_MANAGEMENT) {
    return 'user_id';
  } else if (name === RATE_MANAGEMENT) {
    return 'rate_id';
  } else if (name === MARKET_MANAGEMENT) {
    return 'market_id';
  } else if (name === FLOOR_MANAGEMENT) {
    return 'floor_id';
  } else {
    //
  }
};

export const getSearchField = (name: string) => {
  if (name === ROLE_MANAGEMENT) {
    return 'name';
  } else if (name === USER_MANAGEMENT) {
    return 'first_name';
  } else if (name === RATE_MANAGEMENT) {
    return 'type';
  } else if (name === MARKET_MANAGEMENT) {
    return 'name';
  } else {
    //
  }
};
