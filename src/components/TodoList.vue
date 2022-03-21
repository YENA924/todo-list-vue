<template>
  <div>
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all" @click="completeTodoItems(todoItems)">Mark all as complete</label>
    <ul class="todo-list">
      <li
        v-for="todoItem in todoItems"
        :key="todoItem.id"
        :class="todoItem.completed ? 'completed' : ''"
        >
        <div class="view">
          <input class="toggle" type="checkbox" @change="completeTodoItems(todoItem)"/>
          <label>{{ todoItem.title }}</label>
          <button class="destroy" @click="removeTodoItem(todoItem)"></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  computed: {
    todoItems () {
      return this.$store.getters.todoItems
    }
  },
  methods: {
    removeTodoItem (item) {
      this.$store.commit('removeTodoItem', item)
    },
    completeTodoItems (item) {
      this.$store.commit('completeTodoItem', item)
    }
  },
}
</script>

