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
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//需引入默认样式
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import ViewUiPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';

const app = createApp(App);
app.use(ViewUiPlus)
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
