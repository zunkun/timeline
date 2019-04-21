import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store';

Vue.use(Router)

const router =  new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isAuth: true,
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue'),
      meta: {
        isAuth: true,
      }
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('./views/Project.vue'),
      meta: {
        isAuth: true,
      }
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('./views/Todos.vue'),
      meta: {
        isAuth: true,
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('./views/Calendar.vue'),
      meta: {
        isAuth: true,
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isAuth)) {
    let expire = Number(localStorage.getItem('expire')) ||0;
    let isSignin = false;
    let user = localStorage.getItem('user');
    if( user && expire > Date.now()) {
      isSignin = true;
    }

    if (!isSignin) {
      store.commit('setSignin', false);
      store.commit('setUser', null);
      next({
        path: '/signin',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
