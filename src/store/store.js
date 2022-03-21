
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
      const item = Object.assign({}, {
        id: Math.floor(Math.random() * 1000000001),
        title: payload,
        completed: false
      });
      
      state.todoItems.push(item);
      localStorage.setItem('todos-list-vue2', JSON.stringify(state.todoItems));
    },
    removeTodoItem(state, payload) {
      state.todoItems.splice(state.todoItems.findIndex(todo => todo.id === payload.id), 1);
      localStorage.setItem('todos-list-vue2', JSON.stringify(state.todoItems));
    },
    completeTodoItem (state, payload) {
      if (!state.todoItems.length) return false

      let sortTodoItem = [];
      
      if (Array.isArray(payload)) {
        sortTodoItem = state.todoItems.map(todo => ({...todo, completed: state.todoItems.every(todo => todo.completed) ? false : true}));
      } else {
        sortTodoItem = state.todoItems.map(todo => ({...todo, completed: payload.id === todo.id ? !todo.completed : todo.completed}));
      }
      
      state.todoItems = sortTodoItem
      localStorage.setItem('todos-list-vue2', JSON.stringify(sortTodoItem));
    },
    clearTodoItem (state) {
      const sortTodoItem = state.todoItems.filter(todo => !todo.completed);
      state.todoItems = sortTodoItem;
      localStorage.setItem('todos-list-vue2', sortTodoItem);
    }
  }
});