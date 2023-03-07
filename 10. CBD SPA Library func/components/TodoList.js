const TodoList = (state, callBackHandler) => {
  const { todos, currentTodoFilterId: filterId } = state;
  const filtered = todos.filter(todo => (filterId === 2 ? !todo.completed : filterId === 1 ? todo.completed : todo));

  const $fragment = document.createElement('div');

  // prettier-ignore
  $fragment.innerHTML = `
    <ul class="todo-list">
    ${filtered.map(({ id, content, completed }) => `
      <li id="${id}">
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}></input>
        <span class="${completed ? 'completed' : ''}">${content}</span>
        <button class="remove">X</button>
      </li>`).join('')}
    </ul>`;

  $fragment.firstElementChild.onchange = e => {
    if (e.target.classList.contains('toggle')) callBackHandler.toggleTodo(e.target.closest('li').id);
  };

  $fragment.firstElementChild.onclick = e => {
    if (e.target.classList.contains('remove')) callBackHandler.removeTodo(e.target.closest('li').id);
  };

  return $fragment.firstElementChild;
};

export default TodoList;
