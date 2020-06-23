import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import shangjia from '@/components/shangjia'
import shangping from '@/components/shangping'
import pingjia from '@/components/pingjia'
import gonggao from '@/components/gonggao'
let router=new VueRouter({
	mode:'history',
  routes: [
	{
	  path: '/',
	  component: shangping
	},
	{
	  path: '/shangjia',
	  component: shangjia
	},
	{
	  path: '/pingjia',
	  component: pingjia
	},
	{
	  path: '/gonggao',
	  component: gonggao
	},
  ]
})
export default router
