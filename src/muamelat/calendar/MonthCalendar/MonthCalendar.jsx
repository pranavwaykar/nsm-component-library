import React from "react";
import "./MonthCalendar.scss";
import { classNames, dateKeyYMD } from "../../../utils/util.services";

const weekEn = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MonthCalendar = ({
  monthData = [],
  currentDate = new Date(),
  calendarTasks = {},
  loading = false,
  prmCalendarHeaderTextColor,
  headerTextColor,
  baseFontSize,
  baseFontColor,
  // weekday header row
  daysHeaderBgColor,
  daysHeaderFontFamily,
  daysHeaderFontSize,
  daysHeaderFontWeight,
  // day cell styling
  dayCellBgColor,
  dayCellDisabledBgColor,
  dayCellBorderColor,
  todayBgColor,
  todayBorderColor,
  todayTextColor,
  // texts
  dayNumberFontSize,
  dayNumberColor,
  taskFontSize,
  taskTextColor,
  moreIndicatorTextColor,
  popoverFontSize,
  popoverLabelColor,
  popoverValueColor,
  // chips
  taskChipBgColor,
  taskChipTextColor,
  // popover container
  popoverBgColor,
  popoverBorderColor,
  // events
  onDayClick,
}) => {
  return (
    <div className="month-calendar-comp">
      <div className="cc-days">
        {weekEn.map((day, index) => (
          <div className="ccd-day" key={`ccd-day-${index + 1}`}>
            <div
              className="ccdd-inset"
              style={{
                ...(prmCalendarHeaderTextColor
                  ? { color: prmCalendarHeaderTextColor }
                  : {}),
                ...(headerTextColor ? { color: headerTextColor } : {}),
                ...(baseFontSize ? { fontSize: baseFontSize } : {}),
                ...(baseFontColor ? { color: baseFontColor } : {}),
                ...(daysHeaderBgColor ? { background: daysHeaderBgColor } : {}),
                ...(daysHeaderFontFamily ? { fontFamily: daysHeaderFontFamily } : {}),
                ...(daysHeaderFontSize ? { fontSize: daysHeaderFontSize } : {}),
                ...(daysHeaderFontWeight ? { fontWeight: daysHeaderFontWeight } : {}),
              }}
            >
              {day}
            </div>
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
                      baseFontSize={baseFontSize}
                      baseFontColor={baseFontColor}
                      dayNumberFontSize={dayNumberFontSize}
                      dayNumberColor={dayNumberColor}
                      taskFontSize={taskFontSize}
                      taskTextColor={taskTextColor}
                      moreIndicatorTextColor={moreIndicatorTextColor}
                      popoverFontSize={popoverFontSize}
                      popoverLabelColor={popoverLabelColor}
                      popoverValueColor={popoverValueColor}
                      dayCellBgColor={dayCellBgColor}
                      dayCellDisabledBgColor={dayCellDisabledBgColor}
                      dayCellBorderColor={dayCellBorderColor}
                      todayBgColor={todayBgColor}
                      todayBorderColor={todayBorderColor}
                      todayTextColor={todayTextColor}
                      taskChipBgColor={taskChipBgColor}
                      taskChipTextColor={taskChipTextColor}
                      popoverBgColor={popoverBgColor}
                      popoverBorderColor={popoverBorderColor}
                      onDayClick={onDayClick}
                    />
                  ))}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const CalendarDayCard = ({
  dayData,
  currentDate = new Date(),
  tasks = {},
  baseFontSize,
  baseFontColor,
  dayNumberFontSize,
  dayNumberColor,
  taskFontSize,
  taskTextColor,
  popoverFontSize,
  popoverLabelColor,
  popoverValueColor,
  dayCellBgColor,
  dayCellDisabledBgColor,
  dayCellBorderColor,
  todayBgColor,
  todayBorderColor,
  todayTextColor,
  taskChipBgColor,
  taskChipTextColor,
  moreIndicatorTextColor,
  popoverBgColor,
  popoverBorderColor,
  onDayClick,
}) => {
  const dayRef = React.useRef(null);
  const popoverRef = React.useRef(null);
  const [openTaskId, setOpenTaskId] = React.useState(null);
  const [placement, setPlacement] = React.useState({ x: "right", y: "bottom" });
  const isToday =
    currentDate.getDate() === new Date(dayData?.date).getDate() &&
    currentDate.getMonth() === new Date(dayData?.date).getMonth() &&
    currentDate.getFullYear() === new Date(dayData?.date).getFullYear();
  if (isToday) {
    dayRef.current?.scrollIntoView({ behavior: "smooth" });
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
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openTaskId]);

  React.useEffect(() => {
    if (!openTaskId) return;
    const host = dayRef.current;
    if (!host) return;
    const container = host.closest(".month-calendar-comp");
    if (!container) return;
    const r = host.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    const midX = cr.left + cr.width / 2;
    const midY = cr.top + cr.height / 2;
    const centerX = (r.left + r.right) / 2;
    const centerY = (r.top + r.bottom) / 2;
    const x = centerX < midX ? "right" : "left";
    const y = centerY < midY ? "bottom" : "top";
    setPlacement({ x, y });
  }, [openTaskId]);

  return (
    <div
      className={classNames("ccw-day", dayData?.currentMonth ? "" : "disabled")}
      ref={dayRef}
    >
      <div
        className={classNames("ccw-day-inset", isToday ? "currentDate" : "")}
        onClick={() => { if (onDayClick) onDayClick(new Date(dayData?.date)); }}
        style={{
          ...(dayData?.currentMonth
            ? (dayCellBgColor ? { background: dayCellBgColor } : {})
            : (dayCellDisabledBgColor ? { background: dayCellDisabledBgColor } : {})),
          ...(dayCellBorderColor ? { borderColor: dayCellBorderColor } : {}),
          ...(isToday && todayBgColor ? { background: todayBgColor } : {}),
          ...(isToday && todayBorderColor ? { borderColor: todayBorderColor } : {}),
          ...(isToday && todayTextColor ? { color: todayTextColor } : {}),
        }}
      >
        {isToday && <ShrededBg />}
        {!dayData?.currentMonth && <ShrededBg disabled={true} />}
        {dayData?.currentMonth && (
          <>
            <div className="ccwd-date" >
              <div
                className="ccwdd-main"
                style={{
                  ...(dayNumberFontSize
                    ? { fontSize: dayNumberFontSize }
                    : baseFontSize
                    ? { fontSize: baseFontSize }
                    : {}),
                  ...(isToday && todayTextColor
                    ? { color: todayTextColor }
                    : dayNumberColor
                    ? { color: dayNumberColor }
                    : baseFontColor
                    ? { color: baseFontColor }
                    : {}),
                }}
              >
                {new Date(dayData?.date).getDate()}
              </div>
              <div
                className="ccwdd-more"
                style={{
                  ...(isToday && todayTextColor ? { color: todayTextColor } : {}),
                  ...(moreIndicatorTextColor ? { color: moreIndicatorTextColor } : {}),
                }}
              >
                {taskList?.length > 4 ? `+${taskList?.length - 4} More` : ""}
              </div>
            </div>
            <div className="ccwd-list">
              {taskList.slice(0, 4).map((t) => (
                <button
                  type="button"
                  className="ccwd-item"
                  key={t.id}
                  title={t.title}
                  onClick={() =>
                    setOpenTaskId((cur) => (cur === t.id ? null : t.id))
                  }
                  style={{
                    ...(taskChipBgColor ? { background: taskChipBgColor } : {}),
                    ...(taskChipTextColor ? { color: taskChipTextColor } : {}),
                    ...(taskFontSize
                      ? { fontSize: taskFontSize }
                      : baseFontSize
                      ? { fontSize: baseFontSize }
                      : {}),
                    ...(isToday && todayTextColor
                      ? { color: todayTextColor }
                      : taskTextColor
                      ? { color: taskTextColor }
                      : baseFontColor
                      ? { color: baseFontColor }
                      : {}),
                  }}
                >
                  {t.title}
                </button>
              ))}
            </div>
            {openTaskId && (
              <div
                className={`ccwd-popover pos-x-${placement.x} pos-y-${placement.y}`}
                ref={popoverRef}
              >
                {(() => {
                  const t = taskList.find((x) => x.id === openTaskId);
                  if (!t) return null;
                  const created = new Date(t.created_at);
                  const createdText = `${created.toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`;
                  return (
                    <div
                      className="ccwd-popover-inset"
                      style={{
                        ...(popoverBgColor ? { background: popoverBgColor } : {}),
                        ...(popoverBorderColor ? { borderColor: popoverBorderColor } : {}),
                      }}
                    >
                      <div className="ccwd-popover-head">
                        <i className="fi fi-rr-file" />
                        <span
                          className="name"
                          style={{
                            ...(popoverFontSize
                              ? { fontSize: popoverFontSize }
                              : baseFontSize
                              ? { fontSize: baseFontSize }
                              : {}),
                            ...(popoverValueColor
                              ? { color: popoverValueColor }
                              : baseFontColor
                              ? { color: baseFontColor }
                              : {}),
                          }}
                        >
                          {t.documentName || t.title || "-"}
                        </span>
                      </div>
                      <div className="ccwd-popover-row">
                        <span
                          className="lbl"
                          style={{
                            ...(popoverFontSize
                              ? { fontSize: popoverFontSize }
                              : baseFontSize
                              ? { fontSize: baseFontSize }
                              : {}),
                            ...(popoverLabelColor
                              ? { color: popoverLabelColor }
                              : baseFontColor
                              ? { color: baseFontColor }
                              : {}),
                          }}
                        >
                          Document Name
                        </span>
                        <span
                          className="val"
                          style={{
                            ...(popoverFontSize
                              ? { fontSize: popoverFontSize }
                              : baseFontSize
                              ? { fontSize: baseFontSize }
                              : {}),
                            ...(popoverValueColor
                              ? { color: popoverValueColor }
                              : baseFontColor
                              ? { color: baseFontColor }
                              : {}),
                          }}
                        >
                          {t.documentName || "-"}
                        </span>
                      </div>
                      <div className="ccwd-popover-row">
                        <span className="lbl" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverLabelColor ? { color: popoverLabelColor } : baseFontColor ? { color: baseFontColor } : {}) }}>Subject</span>
                        <span className="val" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverValueColor ? { color: popoverValueColor } : baseFontColor ? { color: baseFontColor } : {}) }}>{t.subject || "-"}</span>
                      </div>
                      <div className="ccwd-popover-row">
                        <span className="lbl" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverLabelColor ? { color: popoverLabelColor } : baseFontColor ? { color: baseFontColor } : {}) }}>Created User</span>
                        <span className="val" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverValueColor ? { color: popoverValueColor } : baseFontColor ? { color: baseFontColor } : {}) }}>{t.createdUser || "-"}</span>
                      </div>
                      <div className="ccwd-popover-row">
                        <span className="lbl" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverLabelColor ? { color: popoverLabelColor } : baseFontColor ? { color: baseFontColor } : {}) }}>Created Date</span>
                        <span className="val" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverValueColor ? { color: popoverValueColor } : baseFontColor ? { color: baseFontColor } : {}) }}>{createdText}</span>
                      </div>
                      <div className="ccwd-popover-row">
                        <span className="lbl" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverLabelColor ? { color: popoverLabelColor } : baseFontColor ? { color: baseFontColor } : {}) }}>From</span>
                        <span className="val" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverValueColor ? { color: popoverValueColor } : baseFontColor ? { color: baseFontColor } : {}) }}>{t.from || "-"}</span>
                      </div>
                      <div className="ccwd-popover-row">
                        <span className="lbl" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverLabelColor ? { color: popoverLabelColor } : baseFontColor ? { color: baseFontColor } : {}) }}>To</span>
                        <span className="val" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverValueColor ? { color: popoverValueColor } : baseFontColor ? { color: baseFontColor } : {}) }}>{t.to || "-"}</span>
                      </div>
                      <div className="ccwd-popover-row">
                        <span className="lbl" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverLabelColor ? { color: popoverLabelColor } : baseFontColor ? { color: baseFontColor } : {}) }}>Document Type</span>
                        <span className="val" style={{ ...(popoverFontSize ? { fontSize: popoverFontSize } : baseFontSize ? { fontSize: baseFontSize } : {}), ...(popoverValueColor ? { color: popoverValueColor } : baseFontColor ? { color: baseFontColor } : {}) }}>{t.documentType || "-"}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
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
          .fill("")
          .map((_, index) => (
            <div
              className={classNames("sbgi-line", disabled ? "disabled" : "")}
              key={`index-${index + 1}`}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default MonthCalendar;
