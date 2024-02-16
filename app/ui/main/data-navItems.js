import {
  MdAttachMoney,
  MdDashboard,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from 'react-icons/md';

export const menuItems = [
  {
    title: 'main navlinks',
    list: [
      {
        title: 'Dashboard',
        path: '/main/dashboard',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Agora',
        path: '/main/agora',
        icon: <MdDashboard />,
      },
      {
        title: 'Products',
        path: '/main/products',
        icon: <MdShoppingBag />,
      },
      {
        title: 'Transactions',
        path: '/main/dashboard/transactions',
        icon: <MdAttachMoney />,
      },
    ],
  },
];
