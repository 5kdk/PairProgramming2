const DatePicker = $container => {
  $container.innerHTML = `
    <h1>Date Picker</h1>
    <input class="date-picker-input" placeholder="Select a date" readonly>
  `;

  $container.addEventListener('click', e => {
    if (!e.target.matches('.date-picker-input')) return;

    $container.querySelector('.calendar').classList.toggle('hidden');

    if (!e.target.value) return;

    const customEvent = new CustomEvent('calendar-hidden', { detail: { selectedDate: e.target.value } });
    $container.dispatchEvent(customEvent);
  });
};

export default DatePicker;
