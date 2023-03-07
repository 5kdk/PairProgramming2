const TodoFilter = (state, callBackHandler) => {
  const { todoFilter, currentTodoFilterId: filterId } = state;
  const $fragment = document.createElement('div');

  // prettier-ignore
  $fragment.innerHTML = `
    <ul class="todo-filter">
      ${todoFilter.map((filter, idx) => `
        <li data-filter-id="${idx}" class="${filterId === idx ? 'selected' : ''}">${filter}</li>`).join('')}
    </ul>`.trim();

  $fragment.firstElementChild.onclick = e => {
    if (e.target.matches('.todo-filter > li')) callBackHandler.filterTodos(e.target.dataset.filterId);
  };

  return $fragment.firstElementChild;
};

export default TodoFilter;
