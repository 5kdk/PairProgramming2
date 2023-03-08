const TodoFilter = state => {
  const { todoFilter, currentTodoFilterId: filterId } = state;
  const $fragment = document.createElement('template');

  // prettier-ignore
  $fragment.innerHTML = `
    <ul class="todo-filter">
    ${todoFilter.map((filter, idx) => `
      <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
    </ul>`;

  return $fragment.content.firstElementChild;
};

export default TodoFilter;
