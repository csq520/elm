import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/home/Home';
import Goods from '../pages/goods/Goods';
import Ratings from '../pages/ratings/Ratings';
import Sellers from '../pages/sellers/Sellers';
import FoodDetail from '../pages/goods/FoodDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Goods',
          name: 'Goods',
          component: Goods,
        },
        {
          path: '/Ratings',
          name: 'Ratings',
          component: Ratings,
        },
        {
          path: '/Sellers',
          name: 'Sellers',
          component: Sellers,
        },
      ],
    },
    {
      path: '/FoodDetail',
      name: 'FoodDetail',
      component: FoodDetail,
    },
  ],
});
