<template>
  <div class="todo__contents">
    <input
      id="todo__toggle--all"
      class="todo__toggle--all"
      type="checkbox" 
    />
    <label
      for="toggle--all"
      :class="!!computedTodoItems.length ? '' : 'hidden'"
      @click="completeTodoItems(todoItems)"
    >
      Mark all as complete
    </label>
    <ul class="todo__list">
      <li
        v-for="todoItem in computedTodoItems"
        :key="todoItem.id"
        :class="todoItem.completed ? '--completed' : ''"
        >
        <div class="todo__item">
          <input 
            class="todo__toggle"
            type="checkbox"
            :id="`todo__toggle--${todoItem.id}`"
            :value="todoItem.completed"
            :checked="todoItem.completed"
            @change="completeTodoItems(todoItem)"
          />
          <label :for="`todo__toggle--${todoItem.id}`">{{ todoItem.title }}</label>
          <button class="todo__remove" @click="removeTodoItem(todoItem)"></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoContents',
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
      this.$store.commit('removeTodoItem', item);
    },
    completeTodoItems (item) {
      // todo item 완료 체크
      this.$store.commit('completeTodoItem', item);
    }
  },
}
</script>
