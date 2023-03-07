const TodoList = state => {
  const { todos, currentTodoFilterId: filterId } = state;
  const filtered = todos.filter(todo => (filterId === 2 ? !todo.completed : filterId === 1 ? todo.completed : todo));

  const $fragment = document.createElement('template');

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

  return $fragment.content.firstElementChild;
};

export default TodoList;
