<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleValueChange" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="(e)=>{
         cbStatuesChange(e,item.id) }"
        >{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey=='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey=='unDone'?'primary':'default'" @click="changeList('unDone')">未完成</a-button>
          <a-button :type="viewKey=='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    //  将指定的 mutations 函数，映射为当前组件的 methods 函数
    ...mapMutations(['inputValeChange', 'addItem', 'removeItem', 'cleanDone']),
    // 监听文本框内容的变化
    handleValueChange(e) {
      this.$store.commit('inputValeChange', e.target.value)
    },
    // 向列表中添加item项
    addItemToList() {
      // 如果文本框的值为空的时候不进行添加item项目
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空')
      }
      // 触发mutations中的addItem函数
      this.$store.commit('addItem')
    },
    // 根据id删除任务item项
    removeItemById(id) {
      this.$store.commit('removeItem', id)
    },
    // 复选框状态值发生变化触发的函数
    cbStatuesChange(e, id) {
      // 复选框的状态值
      // console.log(e.target.checked)
      // console.log(id)
      const params = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', params)
    },
    // 清除已完成到item项
    clean() {
      this.$store.commit('cleanDone')
    },
    // 修改页面列表展示的数据
    changeList(key) {
      this.$store.commit('viewKeyChange', key)
    }
  },
  computed: {
    //  将全局数据，映射为当前组件的计算属性
    ...mapState(['list', 'inputValue', 'viewKey']),

    ...mapGetters(['unDoneLength','infoList'])
  },
  created() {
    this.$store.dispatch('getList')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>