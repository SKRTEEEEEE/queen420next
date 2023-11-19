import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from 'react-icons/md';

export const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/main/dashboard',
        icon: <MdDashboard />,
      },
      {
        title: 'Users',
        path: '/main/dashboard/users',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Products',
        path: '/main/dashboard/products',
        icon: <MdShoppingBag />,
      },
      {
        title: 'Transactions',
        path: '/main/dashboard/transactions',
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: 'Analytics',
    list: [
      {
        title: 'Revenue',
        path: '/main/dashboard/revenue',
        icon: <MdWork />,
      },
      {
        title: 'Reports',
        path: '/main/dashboard/reports',
        icon: <MdAnalytics />,
      },
      {
        title: 'Teams',
        path: '/main/dashboard/teams',
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />,
      },
      {
        title: 'Help',
        path: '/dashboard/help',
        icon: <MdHelpCenter />,
      },
    ],
  },
];
