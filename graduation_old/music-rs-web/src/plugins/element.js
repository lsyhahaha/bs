import ElementPlus from 'element-plus'
// 新版的element-plus样式文件
import 'element-plus/dist/index.css'
// 旧版的element-plus样式文件
// import 'element-plus/lib/theme-chalk/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app) => {
//   app.use(ElementPlus, { locale })
  app.use(ElementPlus)
}
