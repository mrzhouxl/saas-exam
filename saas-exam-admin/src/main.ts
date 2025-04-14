import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import { route } from './router/index'
import { createPinia } from 'pinia';
import { registerCom } from '@/views/design/component/js/comRegister';
import eventBus from 'vue3-eventbus'
import './style.css'
import '@/assets/css/style.css'
// import '@/assets/css/theme.css'
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@nutui/icons-vue/dist/style_iconfont.css'

const app = createApp(App);
registerCom(app)
app.directive('pointer', {
  mounted: (el: any) => {
    el.style = "cursor:pointer;"
  }
})
// const app = createApp(App)
app.use(createPinia())
app.use(TDesign)
app.use(eventBus)
app.use(route)
app.mount('#app');
