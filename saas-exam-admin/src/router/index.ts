import { userStore } from "@/store/userStore";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: '/clockin',
    component:()=>import('@/views/clockIn.vue')
  },
  {
    path: '/design/create',
    component: () => import('@/views/design/create.vue')
  },
  {
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    component: () => import('@/layout/content.vue'),
    redirect: '/index/dashboard',
    children: [
      {
        path: '/index/dashboard',
        component: () => import('@/views/dashboard.vue')
      }, {
        path: '/exam/exam/:id?/:type?',
        component: () => import('@/views/exam/exam.vue')
      },{
        path:'/upload/upload',
        component:()=>import('@/views/upload/upload.vue')
      },{
        path:'/exam/questionbank',
        component:()=>import('@/views/exam/question_bank.vue')
      },
      {
        path:'/exam/question_list',
        component:()=>import('@/views/exam/question_list.vue')
      },
      {
        path: '/exam/exam_list',
        component: () => import('@/views/exam/exam_list.vue')
      },
      {
        path: '/exam/create_exam/:id?',
        component: () => import('@/views/exam/create_exam.vue')
      },
      {
        path: '/data/design',
        component: () => import('@/views/data/design.vue')
      },
      {
        path: '/data/tablePage',
        component: () => import('@/views/data/tablepage.vue')
      },
      
    ]
  }, 
  {
        path:"/reserve/design",
        component:()=>import('@/views/reserve/design.vue')
      },
  {
    path: '/exam/create_question/:id?',
    component: () => import('@/views/exam/create_question.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login'),
  }
]

export const route = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

route.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) {
    if(to.fullPath  != '/login'){
      route.push('/login')
    }
  }else{
    const user = userStore()
    if (!user.isUserInfo){
      user.getUserInfo()
    }
  }
  next()
})

// route.afterEach(() => {
  
// })