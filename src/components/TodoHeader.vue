<template>
  <header class="todo__header">
    <h1>todos</h1>
    <input
      v-model="data.newTodoItem"
      class="header__input--new"
      placeholder="What needs to be done?"
      autofocus
      @keyup.enter="addTodoItem"
    >
  </header>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TodoHeader',
  setup () {
    const store = useStore()
    // data
    // 새로운 todo 아이템
    const data = reactive({ newTodoItem: '' })

    // todo 추가
    const addTodoItem = () => {
      store.commit('addTodoItem', data.newTodoItem);
      data.newTodoItem = ''
    }
    
    return {
      data,
      addTodoItem
    }
  }
}
</script>
