import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import NotFound_404 from '../pages/404_NotFound';
import Directory from '../pages/Directory';
import Login from '../pages/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },{
      path: '/404',
      component: NotFound_404
    },{
      path: '/home',
      component: Home
    },{
      path: '/shoppingCar',
      component: NotFound_404
    },{
      path: '/user',
      component: NotFound_404
    },{
      path: '/more',
      component: NotFound_404
    },{
      path: '/directory',
      component: Directory
    },{
      path: '/login',
      component: Login
    }
  ]
})
