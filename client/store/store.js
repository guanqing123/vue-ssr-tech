import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutation'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev, // 开发的时候可以打开,规范开发人员操作store
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
