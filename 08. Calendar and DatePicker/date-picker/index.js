const DatePicker = $container => {
  $container.innerHTML = `
    <h1>Date Picker</h1>
    <input class="date-picker-input" placeholder="Select a date" readonly>
  `;

  $container.addEventListener('click', e => {
    if (e.target.closest('.calendar')) return;

    const $calendar = $container.querySelector('.calendar');

    if (e.target.matches('.date-picker-input')) $calendar.classList.toggle('hidden');
    else $calendar.classList.add('hidden');

    if (!e.target.value) return;

    const customEvent = new CustomEvent('calendar-hidden', { detail: { selectedDate: e.target.value } });
    $container.dispatchEvent(customEvent);
  });
};

export default DatePicker;
