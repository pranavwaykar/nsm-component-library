import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import './SidebarCalendar.scss';
import { classNames, firstDayOfWeek, getWeeksInMonth } from '../../../utils/util.services';

const SidebarCalendar = ({ currentYear = new Date().getFullYear(), highlightDates = [], selectedDate, onSelect = () => {}, onSelectMonth = () => {} }) => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const monthList = [];
    Array(12)
      .fill('')
      .forEach((_, index) => {
        const monthData = new Date(`${index + 1}-1-${currentYear}`);
        monthList.push(getData(monthData, highlightDates[index] || []));
      });
    setMonths(monthList);
  }, [highlightDates, currentYear]);

  const getData = (currentDatex, highlights = []) => {
    var currentDatee = new Date(currentDatex);
    const addDaysOfDay = (date = new Date()) => {
      const week = [];
      Array(7)
        .fill('')
        .forEach((_, index) => {
          const daysss = new Date(date);
          daysss.setDate(daysss.getDate() + index);
          const currentDateMonth = currentDatee?.getMonth();
          const obj = {
            date: daysss,
            list: [],
            currentMonth: currentDateMonth == daysss?.getMonth(),
            highlight: highlights.includes(daysss.getDate()),
          };
          week.push(obj);
        });
      return week;
    };
    var firstDay = new Date(currentDatee.getFullYear(), currentDatee.getMonth(), 1);
    const weeks = getWeeksInMonth(currentDatee.getFullYear(), currentDatee.getMonth());
    const firstDayOfWeekInMonth = firstDayOfWeek(new Date(firstDay), 0);
    const month = [];
    Array(weeks)
      .fill('')
      .forEach((_, index) => {
        const weekNumber = index;
        const daysss = new Date(firstDayOfWeekInMonth);
        daysss.setDate(daysss.getDate() + 7 * weekNumber);
        month.push(addDaysOfDay(daysss));
      });
    return month;
  };

  return (
    <div className="sidebar-calendar-comp">
      {months.map((dateList, index) => (
        <MiniCalendar
          dateList={dateList}
          key={`mini-calendar-comp-${index}`}
          month={new Date(`${index + 1}-1-${currentYear}`)}
          selectedDate={selectedDate}
          onSelect={onSelect}
          onSelectMonth={onSelectMonth}
        />
      ))}
    </div>
  );
};

const MiniCalendar = ({ dateList, month, selectedDate, onSelect = () => {}, onSelectMonth = () => {} }) => {
  const calendarRef = useRef();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [isSelectedMonth, setIsSelectedMonth] = useState(false);
  useLayoutEffect(() => {
    const dateBoxDate = new Date(month);
    const dateBoxDateString = `${dateBoxDate.getMonth()}-${dateBoxDate.getFullYear()}`;
    const selectedDateObj = new Date(selectedDate);
    const selectedDateObjString = `${selectedDateObj.getMonth()}-${selectedDateObj.getFullYear()}`;
    const selected = dateBoxDateString === selectedDateObjString;
    if (selected) calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsSelectedMonth(selected);
  }, [selectedDate, month]);
  return (
    <div className={classNames('mini-calendar', isSelectedMonth ? 'selected-month' : '')} ref={calendarRef}>
      <div className="mc-header">
        <div className="mch-date">{`${months[month.getMonth()]} ${month.getFullYear()}`}</div>
        <div className="mch-arrow" onClick={() => onSelectMonth(month)}>
          <i className="icon-arrow-up-right" />
        </div>
      </div>
      <div className="mc-days">
        {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day, index) => (
          <div className="mcd-day" key={`${index}-${months[month.getMonth()]}`}>{day}</div>
        ))}
      </div>
      <div className="mc-dates">
        {dateList.map((dateRow, index) => (
          <div className="mcd-row" key={`${months[month.getMonth()]} ${month.getFullYear()}-${index}`}>
            {dateRow.map((date) => (
              <DateBox
                onSelectMonth={onSelectMonth}
                month={month}
                date={date}
                selectedDate={selectedDate}
                key={`${new Date(date.date).getDate()}-${new Date(date.date).getMonth()}-${new Date(date.date).getFullYear()}`}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const DateBox = ({ onSelectMonth, month, date, selectedDate, onSelect = () => {} }) => {
  const [dateMonth, setDateMonth] = useState(true);
  const getToday = () => {
    const dateBoxDate = new Date(date.date);
    const dateBoxDateString = `${dateBoxDate.getDate()}-${dateBoxDate.getMonth()}-${dateBoxDate.getFullYear()}`;
    const selectedDateObj = new Date();
    const selectedDateObjString = `${selectedDateObj.getDate()}-${selectedDateObj.getMonth()}-${selectedDateObj.getFullYear()}`;
    return dateBoxDateString == selectedDateObjString;
  };
  const isToday = getToday();
  const getSelecteDay = () => {
    const dateBoxDate = new Date(date.date);
    const dateBoxDateString = `${dateBoxDate.getDate()}-${dateBoxDate.getMonth()}-${dateBoxDate.getFullYear()}`;
    const selectedDateObj = new Date(selectedDate);
    const selectedDateObjString = `${selectedDateObj.getDate()}-${selectedDateObj.getMonth()}-${selectedDateObj.getFullYear()}`;
    return dateBoxDateString == selectedDateObjString;
  };
  const isDateSelectedDay = selectedDate ? getSelecteDay() : false;
  const toggleMonthDateHandlaer = () => {
    setDateMonth((prev) => !prev);
    if (dateMonth) {
      date?.currentMonth && onSelect(date.date);
    } else {
      onSelectMonth(month);
    }
  };
  return (
    <div className={classNames('msd-date')}>
      <div
        className={classNames('msd-date-box', date?.highlight ? 'highlight' : '', date?.currentMonth ? '' : 'not-currentmonth', isToday ? 'today' : '', isDateSelectedDay ? 'selected-date' : '')}
        onClick={() => toggleMonthDateHandlaer()}
      >
        {new Date(date.date).getDate()}
      </div>
    </div>
  );
};

export default SidebarCalendar;


