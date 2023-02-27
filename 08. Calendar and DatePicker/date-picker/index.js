const DatePicker = $container => {
  const initialize = () => {
    $container.innerHTML = `
      <h1>Date Picker</h1>
      <input class="date-picker-input" placeholder="Select a date" readonly>
    `;

    if (document.head.querySelector('link[href="date-picker/theme.css"]')) return;

    const linkStr = '<link rel="stylesheet" href="date-picker/theme.css" />';
    const lastLink = document.querySelector('link:last-of-type');

    lastLink.insertAdjacentHTML('afterend', linkStr);
  };

  document.addEventListener('DOMContentLoaded', initialize);

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
