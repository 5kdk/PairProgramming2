const TodoInput = callBackHandler => {
  const $fragment = document.createElement('div');

  $fragment.innerHTML = '<input type="text" class="add" placeholder="Enter a task!"></input>';

  $fragment.firstElementChild.onkeydown = e => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' || !e.target.matches('.add')) return;

    const content = e.target.value.trim();
    e.target.value = '';

    if (content) callBackHandler.addTodo(content);
  };

  return $fragment.firstElementChild;
};

export default TodoInput;
