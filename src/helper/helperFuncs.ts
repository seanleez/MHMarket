import {
  FLOOR_MANAGEMENT,
  LEASE_MANAGEMENT,
  MARKET_MANAGEMENT,
  RATE_MANAGEMENT,
  ROLE_MANAGEMENT,
  USER_MANAGEMENT,
  VIEW_APPLICATION_LIST,
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
  } else if (name === LEASE_MANAGEMENT) {
    return 'application_id';
  } else if (name === VIEW_APPLICATION_LIST) {
    return 'application_id';
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

export const convertDateFormat = (originDate: string | number) => {
  const date = new Date(originDate);
  const d =
    date.getDate() < 10 ? '0' + String(date.getDate()) : String(date.getDate());
  const m =
    date.getMonth() + 1 < 10
      ? '0' + String(date.getMonth() + 1)
      : String(date.getMonth() + 1);
  const y = String(date.getFullYear());
  return `${m}/${d}/${y}`;
};
