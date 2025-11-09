import React from 'react';
import './MonthCalendar.scss';
import { classNames, formatDate } from '../../../utils/util.services';

const weekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MonthCalendar = ({ monthData = [], currentDate = new Date(), calendarTasks = {}, loading = false }) => {
  return (
    <div className="month-calendar-comp">
      <div className="cc-days">
        {weekEn.map((day, index) => (
          <div className="ccd-day" key={`ccd-day-${index + 1}`}>
            <div className="ccdd-inset">{day}</div>
          </div>
        ))}
      </div>
      <div className="mcc-body">
        <div className="mccb-inset">
          {loading
            ? null
            : monthData?.map((week, index) => (
                <div className="cc-week" key={`cc-week-${index}`}>
                  {week?.map((dayData, dayIndex) => (
                    <CalendarDayCard
                      dayData={dayData}
                      key={`ccw-day-${index}-${dayIndex + 1}`}
                      currentDate={currentDate}
                      tasks={calendarTasks[formatDate(dayData?.date)]}
                    />
                  ))}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const CalendarDayCard = ({ dayData, currentDate = new Date(), tasks = {} }) => {
  const dayRef = React.useRef(null);
  const isToday =
    currentDate.getDate() === new Date(dayData?.date).getDate() &&
    currentDate.getMonth() === new Date(dayData?.date).getMonth() &&
    currentDate.getFullYear() === new Date(dayData?.date).getFullYear();
  if (isToday) {
    dayRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const taskList = tasks?.tasks || [];
  return (
    <div className={classNames('ccw-day', dayData?.currentMonth ? '' : 'disabled')} ref={dayRef}>
      <div className={classNames('ccw-day-inset', isToday ? 'currentDate' : '')}>
        {isToday && <ShrededBg />}
        {!dayData?.currentMonth && <ShrededBg disabled={true} />}
        {dayData?.currentMonth && (
          <>
            <div className="ccwd-date">
              <div className="ccwdd-main">{new Date(dayData?.date).getDate()}</div>
              <div className="ccwdd-more">{taskList?.length > 4 ? `+${taskList?.length - 4} More` : ''}</div>
            </div>
            <div className="ccwd-list"></div>
          </>
        )}
      </div>
    </div>
  );
};

const ShrededBg = ({ disabled = false }) => {
  return (
    <div className="shreded-bg">
      <div className="sbg-inset">
        {Array(100)
          .fill('')
          .map((_, index) => (
            <div className={classNames('sbgi-line', disabled ? 'disabled' : '')} key={`index-${index + 1}`}></div>
          ))}
      </div>
    </div>
  );
};

export default MonthCalendar;


