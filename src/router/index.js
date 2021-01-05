import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateAccount from '../views/CreateAccount.vue'
import Login from '../views/Login.vue'
import CreatePost from '../views/CreatePost.vue'
import SinglePost from '../views/SinglePost.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: Login
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/create-post/:id',
    name: 'UpadatePost',
    component: CreatePost
  },
  {
    path: '/post/:id',
    name: 'SinglePost',
    component: SinglePost,
    props: true,
  },
]

const router = new VueRouter({
  routes
})

export default router
