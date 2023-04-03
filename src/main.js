import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
//引入api
import API from '@/api';
Vue.prototype.$API = API;
//全局组件
import CategonrySelect from '@/components/CategonrySelect';
Vue.component(CategonrySelect.name,CategonrySelect);

import HintButton from "@/components/HintButton";
Vue.component(HintButton.name,HintButton);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
