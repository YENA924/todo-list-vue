<template>
  <div class="todo__app">
    <todo-header />
    <todo-contents :todo-filter="filter" />
    <todo-footer @todo-filter="todoFilter" />
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue'
import TodoContents from '@/components/TodoContents.vue'
import TodoFooter from '@/components/TodoFooter.vue'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoContents,
    TodoFooter
  },
  data() {
		return {
			filter: { index: 0, title: 'All' }
		}
  },
  methods: {
		todoFilter (value) {
			this.filter = value;
		}
  }
}
</script>

<style lang="scss">
  @import "@/assets/style/main.scss";
</style>