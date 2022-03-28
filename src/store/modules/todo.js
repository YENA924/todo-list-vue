
const state = {
  todoItems: JSON.parse(localStorage.getItem('todos-list-vue2')) || []
}

const getters = {
  todoItems: state => {
    return state.todoItems
  }
}

const mutations = {
  addTodoItem(state, payload) {
    // todo 추가 시 실행되는 로직
    // payload 값으로 item object 복사
    const item = Object.assign({}, {
      id: Math.floor(Math.random() * 1000000001),
      title: payload,
      state: 'active'
    });
    
    state.todoItems.push(item);
    // 로컬 스토리지 아이템 세팅
    localStorage.setItem('todos-list-vue2', JSON.stringify(state.todoItems));
  },
  removeTodoItem(state, payload) {
    // todo 삭제 시 실행되는 로직
    // payload의 id 값으로 todoItems에서 일치하는 id 찾음, 그리고 해당 인덱스로 배열에서 todo 삭제
    state.todoItems.splice(state.todoItems.findIndex(todo => todo.id === payload.id), 1);
    localStorage.setItem('todos-list-vue2', JSON.stringify(state.todoItems));
  },
  completeTodoItem (state, payload) {
    // todo 완료 체크시 실행되는 로직
    if (!state.todoItems.length) return false;

    let sortTodoItem = [];
    
    console.log(payload, Array.isArray(payload));
    if (Array.isArray(payload)) { // 전체 todo 완료 true/false
      sortTodoItem = state.todoItems.map(todo => ({...todo, state: state.todoItems.every(todo => todo.state === 'completed') ? 'active' : 'completed'}));
    } else { // 단일 todo 완료 true/false
      sortTodoItem = state.todoItems.map(todo => ({...todo, state: payload.id === todo.id ? todo.state === 'active' ? 'completed' : 'active' : todo.state}));
    }
    
    state.todoItems = sortTodoItem;
    localStorage.setItem('todos-list-vue2', JSON.stringify(sortTodoItem));
  },
  clearTodoItem (state) {
    // 완료한 todo만 삭제시 실행되는 로직
    // 완료된 todo 필터링
    const sortTodoItem = state.todoItems.filter(todo => todo.state !== 'completed');
    state.todoItems = sortTodoItem;
    localStorage.setItem('todos-list-vue2', JSON.stringify(state.todoItems));
  }
}

export default {
  state,
  getters,
  mutations
}