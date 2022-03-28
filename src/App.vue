<template>
  <div class="todo__app">
    <todo-header />
    <todo-contents :todo-filter="data.filter" />
    <todo-footer @todo-filter="todoFilter" />
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue'
import TodoContents from '@/components/TodoContents.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import { reactive } from 'vue'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoContents,
    TodoFooter
  },
  setup () {
    const data = reactive({
      filter: { index: 0, title: 'All' }
    })
    const todoFilter = (value) => data.filter = value
    
    return {
      data,
      todoFilter
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/style/main.scss";
</style>