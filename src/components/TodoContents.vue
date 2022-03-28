<template>
  <div class="todo__contents">
    <input
      id="todo__toggle--all"
      class="todo__toggle--all"
      type="checkbox" 
    >
    <label
      for="toggle--all"
      @click="completeTodoItem(todoItems)"
    >
      Mark all as complete
    </label>
    <ul class="todo__list">
      <li
        v-for="todoItem in filterTodoItems"
        :key="todoItem.id"
        :class="todoItem.state === 'completed' ? '--completed' : ''"
      >
        <div class="todo__item">
          <input 
            :id="`todo__toggle--${todoItem.id}`"
            class="todo__toggle"
            type="checkbox"
            :value="todoItem.state"
            :checked="todoItem.state === 'completed'"
            @change="completeTodoItem(todoItem)"
          >
          <label :for="`todo__toggle--${todoItem.id}`">{{ todoItem.title }}</label>
          <button
            class="todo__remove"
            @click="removeTodoItem(todoItem)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TodoContents',
  props: {
    todoFilter: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const todoItems = computed(() => store.getters.todoItems)
    // 필터링한 todo 리스트
    const filterTodoItems = computed(() => {
      return store.getters.todoItems.filter(todo => props.todoFilter.title === 'All' ? todo : props.todoFilter.title === todo.state)
    })
    
    // todo 삭제
    const removeTodoItem = (item) => store.commit('removeTodoItem', item)
    // todo 완료 (단일/전체)
    const completeTodoItem = (item) => store.commit('completeTodoItem', item)
    
    return {
      todoItems,
      filterTodoItems,
      removeTodoItem,
      completeTodoItem
    }
  }
}
</script>
