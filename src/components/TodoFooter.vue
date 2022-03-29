<template>
  <footer class="todo__footer">
    <span class="footer__count">{{ activeItems.length }} item left</span>
    <ul class="footer__filters">
      <li
        v-for="(buttonItem, index) in data.footerButtonItems" 
        :key="index"
      >
        <a
          :class="data.footerSelectedItem.title === buttonItem.title ? 'selected' : ''"
          @click="selectFilterButton(buttonItem)"
        >
          {{ buttonItem.title }}
        </a>
      </li>
    </ul>
    <button
      v-if="isCompleted"
      class="footer__clear--completed"
      @click="clearTodoItem"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TodoFooter',
  setup (props, context) {
    const store = useStore() // vuex store
    // 선택한 필터링 아이템
    const data = reactive({
      footerButtonItems: [
        {
          index: 0,
          title: 'All'
        },
        {
          index: 1,
          title: 'active'
        },
        {
          index: 2,
          title: 'completed'
        } 
      ],
      footerSelectedItem: { index: 0, title: 'All' }
    })

    // 로컬 스토리지의 todo 아이템들
    const todoItems = computed(() => store.getters.todoItems)
    // todo를 모두 완료했는지 체크
    const isCompleted = computed(() => todoItems.value.some(todo => todo.state === 'completed'))
    // 완료하지 못한 todo 리스트
    const activeItems = computed(() => todoItems.value.filter(todo => todo.state === 'active'))
    
    // 필터링 시 부모 컴포넌트에 이벤트 emit
    const selectFilterButton = (item) => {
      data.footerSelectedItem = item
      context.emit('todoFilter', item)
    }
    // 완료한 todo 삭제
    const clearTodoItem = () => store.commit('clearTodoItem')

    return {
      data,
      todoItems,
      isCompleted,
      activeItems,
      selectFilterButton,
      clearTodoItem
    }
  }
}
</script>
