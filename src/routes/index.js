import Login from '@/pages/Login';
import Index from '@/pages/dashboard/Index'
import products from '@/pages/products/List'
import productsEdit from '@/pages/products/Edit'
import PageNoFound from '@/pages/PageNoFound';
import Category from '@/pages/category/List.jsx'
import CategoryEdit from '@/pages/category/Edit'
export const mainRoutes = [{
    path: "/login",
    component: Login
  },
  {
    path: "/404",
    component: PageNoFound
  },
]

export const adminRoutes = [{
  path: '/admin/dashboroad',
  component: Index,
  title: "看板页",
  isShow: true,
  icon: "AreaChartOutlined"
}, {
  isShow: true,
  title: "商品管理",
  icon: 'ShopOutlined',
  path: 'products',
  children: [{
      path: '/admin/products',
      component: products,
      exact: true,
      title: "商品列表",
      icon: 'ShopOutlined',
      isShow: true,
    },
    {
      path: '/admin/products/edit/:id?',
      component: productsEdit,
      title: "编辑商品",
      icon: 'ShopOutlined',
      isShow: false,
    },
    {
      path: '/admin/category',
      component: Category,
      title: '分类列表',
      exact: true,
      icon: 'ShopOutlined',
      isShow: true,
    },
    {
      path: '/admin/CategoryEdit/:id?',
      component: CategoryEdit,
      title: "编辑分类",
      icon: 'ShopOutlined',
      isShow: false,
    }
  ]
}, ]