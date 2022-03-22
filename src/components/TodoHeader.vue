<template>
  <header class="todo__header">
    <h1>todos</h1>
    <input
      v-model="newTodoItem"
      @keyup.enter="addTodoItem"
      class="header__input--new"
      placeholder="What needs to be done?"
      autofocus
    />
  </header>
</template>

<script>
export default {
  name: 'TodoHeader',
  data() {
    return {
      newTodoItem: ''
    }
  },
  methods: {
    addTodoItem () {
      // 로컬스토리지에 todo item 추가
      this.$store.commit('addTodoItem', this.newTodoItem);
      // 입력한 todo item 초기화
      this.newTodoItem = '';
    }
  }
}
</script>
