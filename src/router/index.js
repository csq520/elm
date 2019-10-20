import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/home/Home.vue';
import Goods from '../pages/goods/Goods.vue';
import Ratings from '../pages/ratings/Ratings.vue';
import Sellers from '../pages/sellers/Sellers.vue';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default new Router({
  routes: [
    {
      path: '/',
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
  ],
  mode: 'history',
  linkActiveClass: 'active',
});
