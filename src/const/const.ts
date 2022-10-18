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
