import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App.vue';
import router from './router/index';
// import './assets/styles/border.css';
import './assets/styles/reset.css';
import './assets/styles/iconfont.css';
import 'swiper/dist/css/swiper.css';

Vue.use(VueAwesomeSwiper);

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
