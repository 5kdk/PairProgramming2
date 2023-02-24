/* eslint-disable import/extensions */
import DatePicker from './date-picker/index.js';
import Calendar from './calendar/index.js';

const $calendarApps = [...document.querySelectorAll('.calendar-application')];

$calendarApps.forEach($app => {
  DatePicker($app);
  Calendar($app);
});
