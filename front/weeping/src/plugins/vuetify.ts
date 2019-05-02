import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors';
import '../theme/default.styl'
Vue.use(Vuetify, {
  iconfont: 'fa4',
  customProperties: true,
  theme: {
    primary: colors.red,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
})
