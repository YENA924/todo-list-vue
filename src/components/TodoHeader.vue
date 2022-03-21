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
      return this.$store.getters.todoItems
    }
  },
  methods: {
    addTodoItem () {
      this.$store.commit('addTodoItem', this.newTodoItem);
      this.newTodoItem = ''
    }
  },
}
</script>