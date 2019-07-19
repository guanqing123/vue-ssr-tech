import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  // return new Vuex.Store({
  const store = new Vuex.Store({
    strict: isDev, // 开发的时候可以打开,规范开发人员操作store
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('my plugin invoked')
      }
    ],
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 'texta'
        },
        mutations: {
          updateText (state, text) {
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + rootState.count + rootState.b.text
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            // debugger // eslint-disable-line
            // commit('updateText', rootState.count)
            commit('updateCount', {num: 56789}, {root: true})
          }
        }
      },
      b: {
        state: {
          text: 'textb'
        },
        actions: {
          testAction ({ commit }) {
            // 如果b没有加 namespaced,那么不用加 {root: true}也可以调用a的mutations
            commit('a/updateText', 'b.actions.textAction')
          }
        }
      }
    }
  })

  if (module.hot) {
    // debugger  // eslint-disable-line
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
