<template>
  <div>
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all" @click="completeTodoItems(todoItems)">Mark all as complete</label>
    <ul class="todo-list">
      <li
        v-for="todoItem in computedTodoItems"
        :key="todoItem.id"
        :class="todoItem.completed ? 'completed' : ''"
        >
        <div class="view">
          <input 
            :id="`toggle-${todoItem.id}`"
            class="toggle" type="checkbox"
            :value="todoItem.completed"
            :checked="todoItem.completed"
            @change="completeTodoItems(todoItem)"
          />
          <label :for="`toggle-${todoItem.id}`">{{ todoItem.title }}</label>
          <button class="destroy" @click="removeTodoItem(todoItem)"></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todoFilter: String
  },
  computed: {
    todoItems () {
      return this.$store.getters.todoItems
    },
    computedTodoItems () {
      // props로 받아 todo item 필터링 (all, active, completed)
      return this.$store.getters.todoItems.filter(todo => this.todoFilter === 'active' ? !todo.completed : this.todoFilter === 'completed' ? todo.completed : todo)
    }
  },
  methods: {
    removeTodoItem (item) {
      // todo item 삭제
      this.$store.commit('removeTodoItem', item)
    },
    completeTodoItems (item) {
      // todo item 완료 체크
      this.$store.commit('completeTodoItem', item)
    }
  },
}
</script>

