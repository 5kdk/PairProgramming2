/* eslint-disable import/extensions */
import DatePicker from './date-picker/index.js';
import Calendar from './calendar/index.js';

const $calendarApps = [...document.querySelectorAll('.calendar-application')];
const CALENDAR_WIDTH = '350px';

$calendarApps.forEach($app => {
  DatePicker($app);
  Calendar($app, CALENDAR_WIDTH);
});
