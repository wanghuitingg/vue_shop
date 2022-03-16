import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 消息提示 需要挂载到全局Vue才能使用
import {Message} from 'element-ui'
Vue.prototype.$message = Message

Vue.use(Element)
