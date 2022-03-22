<template>
  <header>
    <h1>todos</h1>
    <input
      v-model="newTodoItem"
      @keyup.enter="addTodoItem"
      class="new-todo"
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
  computed: {
    todoItems () {
      // store에서 getters를 사용해 todoItems를 가져옴
      return this.$store.getters.todoItems
    }
  },
  methods: {
    addTodoItem () {
      // 로컬스토리지에 todo item 추가
      this.$store.commit('addTodoItem', this.newTodoItem);
      // 입력한 todo item 초기화
      this.newTodoItem = ''
    }
  },
}
</script>