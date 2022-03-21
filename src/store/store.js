
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex);
 
export const store = new Vuex.Store({
  state: {
    todoItems: JSON.parse(localStorage.getItem('todos-list-vue2')) || []
  },
  getters: {
    todoItems: state => {
      return state.todoItems
    },
    isAllCompleted: state => {
      return state.todoItems.some(todo => todo.completed)
    }
  },
  mutations: {
    addTodoItem(state, payload) {
      const todoArray = state.todoItems ? state.todoItems : []
      const item = Object.assign({}, {
        id: payload,
        title: payload,
        completed: false
      });
      
      todoArray.push(item);
      localStorage.setItem('todos-list-vue2', JSON.stringify(todoArray));
    },
    removeTodoItem(state, payload) {
      state.todoItems.splice(payload.id, 1);
      const sortTodoItem = state.todoItems.map((todo, idx) => ({...todo, id: idx}));
      localStorage.setItem('todos-list-vue2', JSON.stringify(sortTodoItem));
    },
    completeTodoItem (state, payload) {
      if (!state.todoItems.length) return false

      if (Array.isArray(payload)) {
        const sortTodoItem = state.todoItems.map(todo => ({...todo, completed: !todo.completed}));
        state.todoItems = sortTodoItem
        localStorage.setItem('todos-list-vue2', JSON.stringify(sortTodoItem));
      } else {
        const sortTodoItem = state.todoItems.map(todo => ({...todo, completed: payload.id === todo.id ? !todo.completed : todo.completed}));
        state.todoItems = sortTodoItem
        localStorage.setItem('todos-list-vue2', JSON.stringify(sortTodoItem));
      }
      console.log(state, payload);
    },
    clearTodoItem (state) {
      const sortTodoItem = state.todoItems.filter(todo => !todo.completed);
      state.todoItems = sortTodoItem;
      localStorage.setItem('todos-list-vue2', sortTodoItem);
    }
  }
});