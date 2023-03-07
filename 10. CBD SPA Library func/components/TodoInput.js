const TodoInput = () => {
  const $fragment = document.createElement('template');

  $fragment.innerHTML = '<input type="text" class="add" placeholder="Enter a task!"></input>';

  return $fragment.content.firstElementChild;
};

export default TodoInput;
