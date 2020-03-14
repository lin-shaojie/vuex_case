import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, step) {
      state.list = step
    },
    inputValeChange(state, step) {
      state.inputValue = step
    },
    // 添加item项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    //根据id删除对应的任务item
    removeItem(state, id) {
      // 根据id查找对应的索引值
      const index = state.list.findIndex(item => {
        return item.id == id
      })
      // 根据索引删除数组中的某一项
      state.list.splice(index, 1)
    },
    //  修改 复选框选中项 的状态
    changeStatus(state, params) {
      const index = state.list.findIndex(x => x.id == params.id)
      if (index != -1) {
        state.list[index].done = params.status
      }
    },
    // 清除已完成的任务
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改 视图关键字
    viewKeyChange(state, key) {
      state.viewKey = key
    }

  },
  actions: {
    async getList(context) {
      const {
        data: res
      } = await axios.get('list.json')
      context.commit('initList', res)
    }
  },
  getters: {
    // 统计为完成任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 筛选 数据
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'unDone') {
        return state.list.filter(x=>x.done === false)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x=>x.done === true)
      }

      return state.list
    }
  },
  modules: {}
})