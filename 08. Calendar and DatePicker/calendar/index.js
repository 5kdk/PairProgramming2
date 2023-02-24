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

    const prevLastDay = new Date(state.year, state.month, 0).getDate();

    const prevMonth = new Array(prevEmptyCount).fill(prevLastDay - prevEmptyCount + 1).map((ele, idx) => ele + idx);
    const month = new Array(new Date(state.year, state.month + 1, 0).getDate()).fill('').map((_, idx) => idx + 1);
    const nextMonth = new Array(nextEmptyCount).fill('').map((_, idx) => idx + 1);

    return [prevMonth, month, nextMonth];
  };

  const isToday = (year, month, day) =>
    year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDate();

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
          ? `<div class="day active ${isToday(state.year, state.month, day) ? 'today': ''} ${idx % 7 === 0 ? 'sunday' : ''}">${day}</div>`
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
    const handleDayClick = () => {
      const clickedDate = `${state.year}-${(state.month + 1 + '').padStart(2, 0)}-${e.target.textContent.padStart(2, 0)}`;

      $container.children[1].value = clickedDate;
    };

    if (e.target.matches('.prev')) goToPrevMonth();
    if (e.target.matches('.next')) goToNextMonth();
    if (e.target.matches('.active')) handleDayClick();
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
