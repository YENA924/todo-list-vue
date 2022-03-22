<template>
  <div class="todo__app">
    <todo-header></todo-header>
		<todo-contents :todoFilter="filter"></todo-contents>
		<todo-footer @todoFilter="todoFilter"></todo-footer>
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
			filter: 'All'
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
  @import "@/assets/css/main.scss";
</style>