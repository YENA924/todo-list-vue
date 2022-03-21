<template>
  <footer class="footer">
    <span class="todo-count">{{ this.todoItems.length }} item left</span>
    <ul class="filters">
      <li v-for="(buttonItem, index) in footerButtonItems" :key="index">
        <a @click="selectButton(buttonItem)">{{ buttonItem }}</a>
      </li>
    </ul>
    <button class="clear-completed" v-if="this.$store.getters.isAllCompleted" @click="clearTodoItem">Clear completed</button>
  </footer>
</template>

<script>
export default {
  name: 'TodoFooter',
  data() {
    return {
      footerButtonItems: ['All', 'active', 'completed']
    }
  },
  computed: {
    todoItems () {
      return this.$store.getters.todoItems
    }
  },
  methods: {
    selectButton (item) {
      console.log(item);
    },
    clearTodoItem () {
      this.$store.commit('clearTodoItem');
    }
  }
}
</script>
