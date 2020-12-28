import Login from '../pages/Login';
import Index from '../pages/dashboard/Index'
import products from '../pages/products/List'
import productsEdit from '../pages/products/Edit'
import PageNoFound from '../pages/PageNoFound';
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
  path: '/admin/products',
  component: products,
  exact: true,
  isShow: true,
  title: "商品管理",
  icon: 'ShopOutlined'
}, {
  path: '/admin/products/edit/:id?',
  component: productsEdit,
  isShow: false,
}]