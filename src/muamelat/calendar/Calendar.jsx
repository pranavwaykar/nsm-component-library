import React from "react";
import "./Calendar.scss";
import { DateRange } from "../../components/Inputs/Inputs";
import {
  classNames,
  firstDayOfWeek,
  formatDate,
  getWeeksInMonth,
  dateKeyYMD,
} from "../../utils/util.services";
import SidebarCalendar from "./SidebarCalendar/SidebarCalendar";
import MonthCalendar from "./MonthCalendar/MonthCalendar";
import data from "./calendarData";
import { expandStyleProps } from "../../utils/styleSystem";

const Calendar = ({
  as,
  style,
  hidden,
  calendarFontFamily,
  calendarFontSize,
  calendarTextColor,
  calendarBgColor,
  headerBgColor,
  prmCalendarHeaderTextColor,
  baseFontFamily,
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
  // date number and task text
  dayNumberFontSize,
  dayNumberColor,
  taskFontSize,
  taskTextColor,
  moreIndicatorTextColor,
  // popover text
  popoverFontSize,
  popoverLabelColor,
  popoverValueColor,
  // task chip and popover container
  taskChipBgColor,
  taskChipTextColor,
  popoverBgColor,
  popoverBorderColor,
  // events
  onDayClick,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [monthData, setMonthData] = React.useState([]);
  const [calendarTasks, setCalendarTasks] = React.useState({});
  const calendarRawData = React.useRef([]);
  const [range, setRange] = React.useState("1y"); // 1y | 6m | 3m | 1m
  const [dateRange, setDateRange] = React.useState({ start: "", end: "" });
  const Container = as || "div";
  const containerStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (calendarFontFamily) containerStyle.fontFamily = calendarFontFamily;
  if (calendarFontSize) containerStyle.fontSize = calendarFontSize;
  if (calendarTextColor) containerStyle.color = calendarTextColor;
  if (calendarBgColor) containerStyle.background = calendarBgColor;
  if (hidden === true && containerStyle.display === undefined)
    containerStyle.display = "none";

  const computeMonthMatrix = (currentDate) => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const weeks = getWeeksInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstOfWeek = firstDayOfWeek(firstDay, 0);
    const month = [];
    Array(weeks)
      .fill("")
      .forEach((_, idx) => {
        const base = new Date(firstOfWeek);
        base.setDate(base.getDate() + idx * 7);
        const week = [];
        Array(7)
          .fill("")
          .forEach((__, di) => {
            const d = new Date(base);
            d.setDate(d.getDate() + di);
            week.push({
              date: d,
              currentMonth: d.getMonth() === selectedDate.getMonth(),
            });
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

  function parseIso(s) {
    if (!s) return null;
    const [y, m, d] = String(s).split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

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
      if (range === "1y") from.setFullYear(from.getFullYear() - 1);
      if (range === "6m") from.setMonth(from.getMonth() - 6);
      if (range === "3m") from.setMonth(from.getMonth() - 3);
      if (range === "1m") from.setMonth(from.getMonth() - 1);
    }
    return (calendarRawData.current || []).filter((t) => {
      const d = new Date(t.created_at);
      return d >= from && d <= to;
    });
  }, [range, dateRange.start, dateRange.end, calendarRawData.current]);

  React.useEffect(() => {
    setCalendarStates(filteredData);
  }, [filteredData]);

  // When a custom month is picked via the month filter, sync the visible month
  React.useEffect(() => {
    if (dateRange?.start) {
      // Robustly parse YYYY-MM or YYYY-MM-DD and construct a local Date.
      // For YYYY-MM (no day), treat the month as ZERO-BASED from month picker,
      // For YYYY-MM-DD (has day), treat it as 1-based month as usual.
      const s = String(dateRange.start).trim();
      const m = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/.exec(s);
      if (m) {
        const y = Number(m[1]);
        const mon = Number(m[2]);
        const day = m[3] ? Number(m[3]) : null;
        if (y && mon >= 0 && mon <= 12) {
          // if day absent, assume zero-based month index coming from month picker
          const monthIndex = day ? mon - 1 : mon;
          setSelectedDate(new Date(y, monthIndex, 1));
          return;
        }
      }
      // fallback
      const d = new Date(dateRange.start);
      if (!isNaN(d))
        setSelectedDate(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  }, [dateRange.start]);

  const highlightDatesByMonth = React.useMemo(() => {
    const months = Array(12)
      .fill("")
      .map((_, idx) => []);
    filteredData.forEach((t) => {
      const d = new Date(t.created_at);
      months[d.getMonth()].push(d.getDate());
    });
    return months.map((arr) => Array.from(new Set(arr)));
  }, [filteredData]);

  return (
    <Container className="calendar-page" style={containerStyle}>
      <div
        className="cp-header"
        style={{ ...(headerBgColor ? { background: headerBgColor } : {}) }}
      >
        <div className="cph-date">
          <DateRange
            value={dateRange}
            onChange={setDateRange}
            granularity="month"
            placeholder="MM/YYYY – MM/YYYY"
          />
        </div>
      </div>
      <div className="cp-body">
        <div className="cpb-sidebar">
          <div className="cpbs-inset">
            <div className="quick-range">
              <button
                className={range === "1y" ? "active" : ""}
                onClick={() => setRange("1y")}
              >
                Last 1 Year
              </button>
              <button
                className={range === "6m" ? "active" : ""}
                onClick={() => setRange("6m")}
              >
                Last 6 Month
              </button>
              <button
                className={range === "3m" ? "active" : ""}
                onClick={() => setRange("3m")}
              >
                Last 3 Month
              </button>
              <button
                className={range === "1m" ? "active" : ""}
                onClick={() => setRange("1m")}
              >
                Monthly
              </button>
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
        <div
          className="cpb-body"
          style={{
            ...(calendarBgColor ? { backgroundColor: calendarBgColor } : {}),
            ...(baseFontFamily ? { fontFamily: baseFontFamily } : {}),
          }}
        >
          <MonthCalendar
            calendarTasks={calendarTasks}
            currentDate={selectedDate}
            monthData={monthData}
            prmCalendarHeaderTextColor={prmCalendarHeaderTextColor}
            headerTextColor={prmCalendarHeaderTextColor}
            baseFontSize={baseFontSize}
            baseFontColor={baseFontColor}
            daysHeaderBgColor={daysHeaderBgColor}
            daysHeaderFontFamily={daysHeaderFontFamily}
            daysHeaderFontSize={daysHeaderFontSize}
            daysHeaderFontWeight={daysHeaderFontWeight}
            dayCellBgColor={dayCellBgColor}
            dayCellDisabledBgColor={dayCellDisabledBgColor}
            dayCellBorderColor={dayCellBorderColor}
            todayBgColor={todayBgColor}
            todayBorderColor={todayBorderColor}
            todayTextColor={todayTextColor}
            dayNumberFontSize={dayNumberFontSize}
            dayNumberColor={dayNumberColor}
            taskFontSize={taskFontSize}
            taskTextColor={taskTextColor}
            moreIndicatorTextColor={moreIndicatorTextColor}
            popoverFontSize={popoverFontSize}
            popoverLabelColor={popoverLabelColor}
            popoverValueColor={popoverValueColor}
            taskChipBgColor={taskChipBgColor}
            taskChipTextColor={taskChipTextColor}
            popoverBgColor={popoverBgColor}
            popoverBorderColor={popoverBorderColor}
            onDayClick={onDayClick}
          />
        </div>
      </div>
    </Container>
  );
};

export default Calendar;
