<template>
  <footer class="footer">
    <span class="todo-count">{{ todoItems.length }} item left</span>
    <ul class="filters">
      <li
        v-for="(buttonItem, index) in footerButtonItems" 
        :key="index"
      >
        <a @click="selectButton(buttonItem)" :class="footerSelectedItem === buttonItem ? 'selected' : ''">{{ buttonItem }}</a>
      </li>
    </ul>
    <button
      class="clear-completed"
      v-if="$store.getters.isAllCompleted"
      @click="clearTodoItem"
    >Clear completed
    </button>
  </footer>
</template>

<script>
export default {
  name: 'TodoFooter',
  data() {
    return {
      footerSelectedItem: 'All',
      footerButtonItems: ['All', 'active', 'completed']
    }
  },
  computed: {
    todoItems () {
      return this.$store.getters.todoItems;
    }
  },
  methods: {
    selectButton (item) {
      this.footerSelectedItem = item;
      this.$emit('todoFilter', item);
    },
    clearTodoItem () {
      this.$store.commit('clearTodoItem');
    }
  }
}
</script>
