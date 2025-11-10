import React from 'react';
import './MonthCalendar.scss';
import { classNames, dateKeyYMD } from '../../../utils/util.services';

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
                      tasks={calendarTasks[dateKeyYMD(dayData?.date)]}
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
  const popoverRef = React.useRef(null);
  const [openTaskId, setOpenTaskId] = React.useState(null);
  const isToday =
    currentDate.getDate() === new Date(dayData?.date).getDate() &&
    currentDate.getMonth() === new Date(dayData?.date).getMonth() &&
    currentDate.getFullYear() === new Date(dayData?.date).getFullYear();
  if (isToday) {
    dayRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  const taskList = tasks?.tasks || [];

  React.useEffect(() => {
    const onDocClick = (e) => {
      if (!openTaskId) return;
      const el = popoverRef.current;
      const host = dayRef.current;
      if (!el || !host) return setOpenTaskId(null);
      if (!el.contains(e.target) && !host.contains(e.target)) {
        setOpenTaskId(null);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [openTaskId]);

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
            <div className="ccwd-list">
              {taskList.slice(0, 4).map((t) => (
                <button
                  type="button"
                  className="ccwd-item"
                  key={t.id}
                  title={t.title}
                  onClick={() => setOpenTaskId((cur) => (cur === t.id ? null : t.id))}
                >
                  {t.title}
                </button>
              ))}
              {openTaskId && (
                <div className="ccwd-popover" ref={popoverRef}>
                  {(() => {
                    const t = taskList.find((x) => x.id === openTaskId);
                    if (!t) return null;
                    const created = new Date(t.created_at);
                    const createdText = `${created.toLocaleDateString(undefined, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}`;
                    return (
                      <div className="ccwd-popover-inset">
                        <div className="ccwd-popover-head">
                          <i className="fi fi-rr-file" />
                          <span className="name">{t.documentName || t.title || '-'}</span>
                        </div>
                        <div className="ccwd-popover-row">
                          <span className="lbl">Document Name</span>
                          <span className="val">{t.documentName || '-'}</span>
                        </div>
                        <div className="ccwd-popover-row">
                          <span className="lbl">Subject</span>
                          <span className="val">{t.subject || '-'}</span>
                        </div>
                        <div className="ccwd-popover-row">
                          <span className="lbl">Created User</span>
                          <span className="val">{t.createdUser || '-'}</span>
                        </div>
                        <div className="ccwd-popover-row">
                          <span className="lbl">Created Date</span>
                          <span className="val">{createdText}</span>
                        </div>
                        <div className="ccwd-popover-row">
                          <span className="lbl">From</span>
                          <span className="val">{t.from || '-'}</span>
                        </div>
                        <div className="ccwd-popover-row">
                          <span className="lbl">To</span>
                          <span className="val">{t.to || '-'}</span>
                        </div>
                        <div className="ccwd-popover-row">
                          <span className="lbl">Document Type</span>
                          <span className="val">{t.documentType || '-'}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
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


