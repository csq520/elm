import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import './common/styles/reset.css';
import './common/styles/border.css';
import './common/styles/iconfont.css';


/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

router.push('/Goods');
