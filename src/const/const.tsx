import HomeIcon from '@mui/icons-material/Home';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaidIcon from '@mui/icons-material/Paid';
import SchemaIcon from '@mui/icons-material/Schema';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PublishIcon from '@mui/icons-material/Publish';
import ApprovalIcon from '@mui/icons-material/Approval';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export const rootURL = 'http://103.162.20.141:8000/api/v2';

export const NAVIGATION_LIST = [
  {
    title: 'Home',
    url: '/home',
    icon: <HomeIcon />,
  },
  {
    title: 'System Mantenance',
    nestedList: [
      {
        title: 'Role Management',
        url: '/role-management',
        icon: <ManageSearchIcon />,
      },
      {
        title: 'User Management',
        url: '/user-management',
        icon: <ManageAccountsIcon />,
      },
      { title: 'Rate Management', url: '/rate-management', icon: <PaidIcon /> },
      {
        title: 'Workflow Management',
        url: '/workflow-management',
        icon: <SchemaIcon />,
      },
    ],
    icon: <SettingsSuggestIcon />,
  },
  {
    title: 'Submit Application',
    url: '/submit-application',
    icon: <PublishIcon />,
  },
  {
    title: 'View Application List',
    url: '/view-application-list',
    icon: <ApprovalIcon />,
  },
  {
    title: 'Lease Management',
    url: '/lease-management',
    icon: <PaymentIcon />,
  },
  {
    title: 'Market Management',
    url: '/market-management',
    icon: <LocalConvenienceStoreIcon />,
  },
  {
    title: 'Analytics and Report',
    url: '/analytics-reports',
    icon: <SignalCellularAltIcon />,
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

export const STALL_STATUS = [
  {
    value: 1,
    label: 'Inactive',
  },
  {
    value: 2,
    label: 'Active',
  },
];

export const STALL_TYPE = [
  {
    value: 1,
    label: 'Temporary',
  },
  {
    value: 2,
    label: 'Permanent',
  },
];

export const STALL_CLASS = [
  {
    value: 1,
    label: 'Regular',
  },
  {
    value: 2,
    label: 'Front Corner',
  },
  {
    value: 3,
    label: 'Front',
  },
  {
    value: 4,
    label: 'Inside Corner',
  },
];

export const LEASE_STATUS = [
  {
    value: 0,
    label: 'Waiting',
  },
  {
    value: 1,
    label: 'Active',
  },
  {
    value: 2,
    label: 'For Termination',
  },
  {
    value: 3,
    label: 'Terminated',
  },
  {
    value: 4,
    label: 'Inactive',
  },
];

export const SEX = [
  {
    value: 0,
    label: 'Male',
  },
  {
    value: 1,
    label: 'Female',
  },
];

export const CIVIL_STATUS = [
  {
    value: 0,
    label: 'Single',
  },
  {
    value: 1,
    label: 'Married',
  },
  {
    value: 2,
    label: 'Seperated',
  },
  {
    value: 3,
    label: 'Widow',
  },
];

export const INIT_TABLE_ROWS_NUMBER = 5;
export const ROWS_PER_PAGE_OPTION = [INIT_TABLE_ROWS_NUMBER, 10, 20];
export const RATE_MANAGEMENT = 'RATE MANAGEMENT';
export const ROLE_MANAGEMENT = 'ROLE MANAGEMENT';
export const USER_MANAGEMENT = 'USER MANAGEMENT';
export const MARKET_MANAGEMENT = 'MARKET MANAGEMENT';
export const FLOOR_MANAGEMENT = 'FLOOR MANAGEMENT';
export const LEASE_MANAGEMENT = 'LEASE MANAGEMENT';

const SCROLL_BAR_WIDTH = 15;
export const CONTAINER_WIDTH = 0.9 * window.innerWidth - SCROLL_BAR_WIDTH;
export const CONTAINER_HEIGHT = 0.7 * window.innerHeight;
