

 
import Home from './pages/home';
import Search from './pages/search';
import Login from './pages/login';
import Cart from './pages/cart';
import Fav from './pages/fav';
import ProductDetail from './pages/productDetail';


const routes = [
	{ path: '/',
		exact: true,/* 为了避免home组件一直渲染，我们可以添加属性exact */
		component: Home,
		auth:false,
	},
	{ path: '/home',
		component: Home,
		auth:false,
	},
	{ path: '/login',
		component: Login,
		auth:false,
	},
	{
		path: '/search/:name',
		component: Search,
		auth:false,
	},
	{
		path: '/cart',
		component: Cart,
		auth:true,
	},
	{
		path: '/fav',
		component: Fav,
		auth:false,
	},
	{
		path: '/productDetail/:id',
		component: ProductDetail,
		auth:false,
	}
]
export default routes