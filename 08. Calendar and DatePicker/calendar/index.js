// prettier-ignore
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// ---------------------- calendar function --------------------
const Calendar = $container => {
  let state = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  };

  const getEmptyCounts = () => {
    const prevEmptyCount = new Date(state.year, state.month, 1).getDay();
    const nextEmptyCount = 7 - (new Date(state.year, state.month + 1, 0).getDay() + 1);

    return [prevEmptyCount, nextEmptyCount];
  };

  const getFullCalendar = () => {
    const [prevEmptyCount, nextEmptyCount] = getEmptyCounts();

    const prevLastDate = new Date(state.year, state.month, 0).getDate();
    const prevFirstDate = prevLastDate - prevEmptyCount + 1;

    const prevMonth = Array.from({ length: prevEmptyCount }, (_, i) => prevFirstDate + i);
    const month = Array.from({ length: new Date(state.year, state.month + 1, 0).getDate() }, (_, i) => i + 1);
    const nextMonth = Array.from({ length: nextEmptyCount }, (_, i) => i + 1);

    return [prevMonth, month, nextMonth];
  };

  const isToday = day => {
    const today = new Date();
    return state.year === today.getFullYear() && state.month === today.getMonth() && day === today.getDate();
  };

  const isSelected = day => {
    const selected = new Date($container.children[1].value);
    return state.year === selected.getFullYear() && state.month === selected.getMonth() && day === selected.getDate();
  };

  // prettier-ignore
  const renderCalendar = () => {
    const [prevEmptyCount] = getEmptyCounts();
    const [prevMonth, current, nextMonth] = getFullCalendar();
    const $days = [...prevMonth, ...current, ...nextMonth];

    $container.querySelector('.calendar').innerHTML = `
      <nav class="calendar-nav">
        <button class="prev">◀</button>
        <div>
          <p class="current-month">${MONTHS[state.month]}</p>
          <p class="current-year">${state.year}</p>
        </div>
        <button class="next">▶</button>
      </nav>
      <section class="calendar-grid">
        ${WEEKDAYS.map(weekday => `<div class="day">${weekday}</div>`).join('')}
        ${$days.map((day, idx) => idx >= prevEmptyCount && idx < prevEmptyCount + current.length
          ? `<div class="day active ${isToday(day) ? 'today': ''}${idx % 7 === 0 ? 'sunday' : ''}${isSelected(day) ? 'selected' : ''}">${day}</div>`
          : `<div class="day">${day}</div>`).join('')}
      </section>`
    };

  const setState = newState => {
    state = { ...state, ...newState };
    renderCalendar();
  };

  const initialize = () => {
    $container.innerHTML += `<div class="calendar"></div>`;
    renderCalendar();

    if (document.head.querySelector('link[href="calendar/theme.css"]')) return;

    const linkStr = '<link rel="stylesheet" href="calendar/theme.css" />';
    const lastLink = document.querySelector('link:last-of-type');

    lastLink.insertAdjacentHTML('afterend', linkStr);
  };

  const handleCalendar = e => {
    if (!e.target.matches('.active, .prev, .next')) return;

    const goToPrevMonth = () => {
      setState(state.month === 0 ? { year: state.year - 1, month: 11 } : { month: state.month - 1 });
    };

    const goToNextMonth = () => {
      setState(state.month === 11 ? { year: state.year + 1, month: 0 } : { month: state.month + 1 });
    };

    // prettier-ignore
    const handleDayClick = e => {
      const clickedDate = `${state.year}-${(state.month + 1 + '').padStart(2, 0)}-${e.target.textContent.padStart(2, 0)}`;

      document.querySelector('.selected')?.classList.remove('selected')
      e.target.classList.add('selected')

      $container.children[1].value = clickedDate;
    };

    if (e.target.matches('.prev')) goToPrevMonth();
    if (e.target.matches('.next')) goToNextMonth();
    if (e.target.matches('.active')) handleDayClick(e);
  };

  document.addEventListener('DOMContentLoaded', initialize);

  $container.addEventListener('click', handleCalendar);

  $container.addEventListener('calendar-hidden', e => {
    setState({
      year: new Date(e.detail.selectedDate).getFullYear(),
      month: new Date(e.detail.selectedDate).getMonth(),
    });
  });
};

export default Calendar;
