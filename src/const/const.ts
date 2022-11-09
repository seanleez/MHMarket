export const rootURL = 'http://103.162.20.141:8000/api/v2';

export const NAVIGATION_LIST = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'System Mantenance',
    nestedList: [
      { title: 'RoleManagement', url: '/role-management' },
      { title: 'UserManagement', url: '/user-management' },
      { title: 'Rate Management', url: '/rate-management' },
      { title: 'Workflow Management', url: '/workflow-management' },
    ],
  },
  {
    title: 'Submit Application Online',
    url: '/submit-application-online',
  },
  {
    title: 'View Application List',
    url: '/view-application-list',
  },
  {
    title: 'Lease Management',
    url: '/lease-management',
  },
  {
    title: 'Market Management',
    url: '/market-management',
  },
  {
    title: 'Analytics and Report',
    url: '/analytics-reports',
  },
];

export const STATE_VALUES = [
  {
    value: 1,
    label: 'active',
  },
  {
    value: 0,
    label: 'inactive',
  },
];

export const RATE_TYPE = [
  {
    type: 0,
    value: 'Stall Rental Rate',
  },
  {
    type: 1,
    value: 'Stall Rights Rate',
  },
  {
    type: 2,
    value: 'Stall Security Rate',
  },
  {
    type: 3,
    value: 'Other Rate',
  },
];

export const MARKET_TYPE = [
  {
    type: 1,
    value: 'Public Market',
  },
  {
    type: 2,
    value: 'Private Market',
  },
  {
    type: 3,
    value: 'Private Talipapa',
  },
  {
    type: 4,
    value: 'Hawking/Vending Site',
  },
];

export const OTHER_RATE_DETAIL = [
  {
    detail: null,
    value: '',
  },
  {
    detail: 0,
    value: 'New Stall Application Fee',
  },
  {
    detail: 1,
    value: 'Renewal Stall Application Fee',
  },
  {
    detail: 2,
    value: 'Transfer Stall Application Fee',
  },
  {
    detail: 3,
    value: 'Transfer Fee',
  },
  {
    detail: 4,
    value: 'Repair Permit Fee',
  },
];

export const CLASS_RENTAL_AMOUNT = [
  {
    value: 1,
    label: 'Class A',
  },
  {
    value: 2,
    label: 'Class B',
  },
  {
    value: 3,
    label: 'Class C',
  },
];

export const INIT_TABLE_ROWS_NUMBER = 5;
export const ROWS_PER_PAGE_OPTION = [INIT_TABLE_ROWS_NUMBER, 10, 20];
export const RATE_MANAGEMENT = 'RATE MANAGEMENT';
export const ROLE_MANAGEMENT = 'ROLE MANAGEMENT';
export const USER_MANAGEMENT = 'USER MANAGEMENT';
export const MARKET_MANAGEMENT = 'MARKET MANAGEMENT';
export const FLOOR_MANAGEMENT = 'FLOOR MANAGEMENT';
export const LIST_TABLE_NAME = [
  'Role Management',
  'User Management',
  'Rate Management',
  'Market Management',
  'Floor Management',
];
