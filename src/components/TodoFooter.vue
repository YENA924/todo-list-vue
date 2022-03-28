<template>
  <footer class="todo__footer">
    <span class="footer__count">{{ todoItems.length }} item left</span>
    <ul class="footer__filters">
      <li
        v-for="(buttonItem, index) in footerButtonItems" 
        :key="index"
      >
        <a
          :class="footerSelectedItem.title === buttonItem.title ? 'selected' : ''"
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TodoFooter',
  setup () {
    const store = useStore() // vuex store
    // 필터링 아이템 배열
    const footerButtonItems = [
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
    ]
    // 선택한 필터링 아이템
    const footerSelectedItem = ref(footerButtonItems[0])

    // 로컬 스토리지에서 가져온 todo 아이템들
    const todoItems = computed(() => store.getters.todoItems)
    // todo를 모두 완료했는지 체크
    const isCompleted = computed(() => store.getters.todoItems.some(todo => todo.state === 'completed'))
    // 완료한 todo 삭제
    const clearTodoItem = () => store.commit('clearTodoItem')

    return {
      footerSelectedItem,
      footerButtonItems,
      todoItems,
      isCompleted,
      clearTodoItem
    }
  },
  methods: {
    selectFilterButton (item) {
      // 필터링 시 부모 컴포넌트에 이벤트 emit
      this.footerSelectedItem = item;
      this.$emit('todoFilter', item);
    }
  }
}
</script>
