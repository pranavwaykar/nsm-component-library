import React from 'react';
import './DatePicker.scss';
import moment from 'moment';

const DatePickerr = ({ value = new Date(), setValue = () => {}, locale = 'en-US' }) => {
  const [lang, setLang] = React.useState('en');
  React.useEffect(() => {
    setLang(locale?.startsWith('tr') ? 'tr' : 'en');
  }, [locale]);

  const changeMonth = (increment = true) => {
    const currentDate = new Date(value);
    let newMonth = currentDate.getMonth() + (increment ? 1 : -1);
    let newYear = currentDate.getFullYear();
    if (newMonth > 11) { newMonth = 0; newYear += 1; }
    else if (newMonth < 0) { newMonth = 11; newYear -= 1; }
    setValue(new Date(newYear, newMonth, 1));
  };

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const [open, setOpen] = React.useState(false);

  const year = value.getFullYear();

  function changeYear(delta) {
    const d = new Date(value);
    d.setFullYear(year + delta);
    setValue(d);
  }

  return (
    <div className="date-picker-comp">
      <div className="year-incre-decre">
        <button className="next-prev-button" onClick={() => changeMonth(false)}>
          <i className="icon-chevron-left" />
        </button>
        <div className="dpc-input" onClick={() => setOpen((o) => !o)}>
          <div className="dpc-value">{moment(value)?.locale(lang)?.format('MMMM, YYYY')}</div>
        </div>
        <button className="next-prev-button" onClick={() => changeMonth(true)}>
          <i className="icon-chevron-right" />
        </button>
      </div>
      {open ? (
        <div className="dpc-dropdown" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <div className="dpc-year">
            <button className="dpc-year-btn" onClick={() => changeYear(-1)}>‹</button>
            <span>{year}</span>
            <button className="dpc-year-btn" onClick={() => changeYear(1)}>›</button>
          </div>
          <div className="dpc-month-grid">
            {months.map((m, idx) => (
              <button key={m} type="button" className={`dpc-month ${idx === value.getMonth() ? 'is-active' : ''}`} onClick={() => { const d = new Date(value); d.setMonth(idx); setValue(d); setOpen(false); }}>
                {m.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DatePickerr;


