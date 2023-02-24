// prettier-ignore
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calendar = $container => {
  let state = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  };

  const isToday = (year, month, day) =>
    year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDate();

  $container.innerHTML += `<div class="calendar"></div>`;

  const render = () => {
    const { year, month } = state;

    const prevCount = new Date(year, month, 1).getDay();
    const nextCount = 7 - (new Date(year, month + 1, 0).getDay() + 1);
    const prevDate = new Date(year, month, 0).getDate();

    const prev = new Array(prevCount).fill(prevDate - prevCount + 1).map((ele, idx) => ele + idx);
    const cur = new Array(new Date(state.year, state.month + 1, 0).getDate()).fill('').map((_, idx) => idx + 1);
    const next = new Array(nextCount).fill('').map((_, idx) => idx + 1);

    const dayData = [...prev, ...cur, ...next];

    // prettier-ignore
    document.querySelector('.calendar').innerHTML = `
      <div class="calendar">
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
          ${dayData.map((day, idx) => idx >= prevCount && idx < prevCount + cur.length
            ? `<div class="day active ${isToday(state.year, state.month, day) ? 'today': ''} ${idx % 7 === 0 ? 'sunday' : ''}">${day}</div>`
            : `<div class="day">${day}</div>`).join('')}
        </section>
      </div>`
  };
  const setState = newState => {
    state = { ...state, ...newState };
    render();
  };

  document.addEventListener('DOMContentLoaded', setState);

  $container.addEventListener('click', e => {
    if (!e.target.matches('.active, .prev, .next')) return;

    if (e.target.classList.contains('prev'))
      setState(state.month === 0 ? { year: state.year - 1, month: 11 } : { month: state.month - 1 });
    if (e.target.classList.contains('next'))
      setState(state.month === 11 ? { year: state.year + 1, month: 0 } : { month: state.month + 1 });
    if (e.target.classList.contains('day')) {
      const clickedDate = `${state.year}-${(state.month + 1 + '').padStart(2, 0)}-${e.target.textContent}`;

      console.log(clickedDate);
      document.querySelector('.date-picker-input').value = clickedDate;
    }
  });
};

export default Calendar;
