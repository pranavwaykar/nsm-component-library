import React from 'react';
import './Calendar.scss';
import { DateRange } from '../../components/Inputs/Inputs';
import { classNames, firstDayOfWeek, formatDate, getWeeksInMonth, dateKeyYMD } from '../../utils/util.services';
import SidebarCalendar from './SidebarCalendar/SidebarCalendar';
import MonthCalendar from './MonthCalendar/MonthCalendar';
import data from './calendarData';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [monthData, setMonthData] = React.useState([]);
  const [calendarTasks, setCalendarTasks] = React.useState({});
  const calendarRawData = React.useRef([]);
  const [range, setRange] = React.useState('1y'); // 1y | 6m | 3m | 1m
  const [dateRange, setDateRange] = React.useState({ start: '', end: '' });

  const computeMonthMatrix = (currentDate) => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const weeks = getWeeksInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstOfWeek = firstDayOfWeek(firstDay, 0);
    const month = [];
    Array(weeks)
      .fill('')
      .forEach((_, idx) => {
        const base = new Date(firstOfWeek);
        base.setDate(base.getDate() + idx * 7);
        const week = [];
        Array(7)
          .fill('')
          .forEach((__, di) => {
            const d = new Date(base);
            d.setDate(d.getDate() + di);
            week.push({ date: d, currentMonth: d.getMonth() === selectedDate.getMonth() });
          });
        month.push(week);
      });
    return month;
  };

  const setCalendarStates = (tasksArray = []) => {
    const map = new Map();
    tasksArray.forEach((t) => {
      const key = dateKeyYMD(new Date(t.created_at));
      const val = map.get(key);
      if (val) map.set(key, { date: key, tasks: [...val.tasks, t] });
      else map.set(key, { date: key, tasks: [t] });
    });
    setCalendarTasks(Object.fromEntries(map.entries()));
  };

  React.useEffect(() => {
    // mock tasks
    calendarRawData.current = data;
    setCalendarStates(data);
  }, []);

  React.useEffect(() => {
    setMonthData(computeMonthMatrix(selectedDate));
  }, [selectedDate]);

  function parseIso(s){ if(!s) return null; const [y,m,d] = String(s).split('-').map(Number); if(!y||!m||!d) return null; return new Date(y, m-1, d); }

  const filteredData = React.useMemo(() => {
    const now = new Date();
    let from = new Date(now);
    let to = now;

    // If user picked a date range, prefer that
    const pickedStart = parseIso(dateRange.start);
    const pickedEnd = parseIso(dateRange.end);
    if (pickedStart && pickedEnd) {
      from = pickedStart;
      to = pickedEnd;
    } else {
      if (range === '1y') from.setFullYear(from.getFullYear() - 1);
      if (range === '6m') from.setMonth(from.getMonth() - 6);
      if (range === '3m') from.setMonth(from.getMonth() - 3);
      if (range === '1m') from.setMonth(from.getMonth() - 1);
    }
    return (calendarRawData.current || []).filter((t) => {
      const d = new Date(t.created_at);
      return d >= from && d <= to;
    });
  }, [range, dateRange.start, dateRange.end, calendarRawData.current]);

  React.useEffect(() => {
    setCalendarStates(filteredData);
  }, [filteredData]);

  const highlightDatesByMonth = React.useMemo(() => {
    const months = Array(12)
      .fill('')
      .map((_, idx) => []);
    filteredData.forEach((t) => {
      const d = new Date(t.created_at);
      months[d.getMonth()].push(d.getDate());
    });
    return months.map((arr) => Array.from(new Set(arr)));
  }, [filteredData]);

  return (
    <div className="calendar-page">
      <div className="cp-header">
        <div className="cph-date">
          <DateRange value={dateRange} onChange={setDateRange} granularity="month" placeholder="MM/YYYY – MM/YYYY" />
        </div>
      </div>
      <div className="cp-body">
        <div className="cpb-sidebar">
          <div className="cpbs-inset">
            <div className="quick-range">
              <button className={range === '1y' ? 'active' : ''} onClick={() => setRange('1y')}>Last 1 Year</button>
              <button className={range === '6m' ? 'active' : ''} onClick={() => setRange('6m')}>Last 6 Month</button>
              <button className={range === '3m' ? 'active' : ''} onClick={() => setRange('3m')}>Last 3 Month</button>
              <button className={range === '1m' ? 'active' : ''} onClick={() => setRange('1m')}>Monthly</button>
            </div>
            <SidebarCalendar
              currentYear={selectedDate.getFullYear()}
              highlightDates={highlightDatesByMonth}
              selectedDate={selectedDate}
              onSelect={(d) => setSelectedDate(new Date(d))}
              onSelectMonth={(m) => setSelectedDate(new Date(m))}
            />
          </div>
        </div>
        <div className="cpb-body">
          <MonthCalendar calendarTasks={calendarTasks} currentDate={selectedDate} monthData={monthData} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;


