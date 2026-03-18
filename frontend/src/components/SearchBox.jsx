import { useState, useRef, useEffect } from 'react';

const SearchBox = () => {
  const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [journeyDate, setJourneyDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const journeyRef = useRef(null);
  const returnRef = useRef(null);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (journeyRef.current && !journeyRef.current.contains(event.target)) {
        setShowJourneyCalendar(false);
      }
      if (returnRef.current && !returnRef.current.contains(event.target)) {
        setShowReturnCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const CustomCalendar = ({ selectedDate, onSelect, onClose }) => {
    const [viewDate, setViewDate] = useState(selectedDate ? new Date(selectedDate.split('-').reverse().join('-')) : new Date());
    
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();

    const handlePrevMonth = (e) => {
      e.stopPropagation();
      setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = (e) => {
      e.stopPropagation();
      setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const renderDays = () => {
      const days = [];
      const totalDays = daysInMonth(currentMonth, currentYear);
      const startDay = firstDayOfMonth(currentMonth, currentYear);

      // Previous month padding
      const prevMonthDays = daysInMonth(currentMonth - 1, currentYear);
      for (let i = startDay - 1; i >= 0; i--) {
        days.push(<div key={`prev-${i}`} className="calendar-day padding-day">{prevMonthDays - i}</div>);
      }

      // Current month days
      for (let i = 1; i <= totalDays; i++) {
        const dateStr = formatDate(new Date(currentYear, currentMonth, i));
        const isSelected = selectedDate === dateStr;
        days.push(
          <div 
            key={i} 
            className={`calendar-day ${isSelected ? 'selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(dateStr);
              onClose();
            }}
          >
            {i}
          </div>
        );
      }
      return days;
    };

    return (
      <div className="custom-calendar-popup">
        <div className="calendar-header">
          <div className="month-year-display">
            {months[currentMonth]} {currentYear}
          </div>
          <div className="calendar-nav">
            <button onClick={handlePrevMonth}><i className="fas fa-chevron-left"></i></button>
            <button onClick={handleNextMonth}><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
        <div className="calendar-weekdays">
          {weekDays.map(day => <div key={day} className="weekday">{day}</div>)}
        </div>
        <div className="calendar-grid">
          {renderDays()}
        </div>
      </div>
    );
  };

  return (
    <div className="search-box-wrapper" id="search-section">
      <div className="search-box">
        <div className="input-group">
          <label>Source</label>
          <div className="input-wrapper">
            <i className="fas fa-map-marker-alt"></i>
            <input type="text" placeholder="Select from city" />
          </div>
        </div>
        <button className="swap-btn">
          <i className="fas fa-exchange-alt"></i>
        </button>
        <div className="input-group">
          <label>Destination</label>
          <div className="input-wrapper">
            <i className="fas fa-map-marker-alt"></i>
            <input type="text" placeholder="Select to city" />
          </div>
        </div>
        <div className="input-group" ref={journeyRef}>
          <label>Journey Date</label>
          <div className="input-wrapper" onClick={() => setShowJourneyCalendar(!showJourneyCalendar)}>
            <i className="fas fa-calendar-alt"></i>
            <input 
              type="text" 
              placeholder="dd-mm-yyyy" 
              value={journeyDate} 
              readOnly 
            />
          </div>
          {showJourneyCalendar && (
            <CustomCalendar 
              selectedDate={journeyDate} 
              onSelect={setJourneyDate} 
              onClose={() => setShowJourneyCalendar(false)} 
            />
          )}
        </div>
        <div className="input-group" ref={returnRef}>
          <label>Return Date</label>
          <div className="input-wrapper" onClick={() => setShowReturnCalendar(!showReturnCalendar)}>
            <i className="fas fa-calendar-alt"></i>
            <input 
              type="text" 
              placeholder="Return Date" 
              value={returnDate} 
              readOnly 
            />
          </div>
          {showReturnCalendar && (
            <CustomCalendar 
              selectedDate={returnDate} 
              onSelect={setReturnDate} 
              onClose={() => setShowReturnCalendar(false)} 
            />
          )}
        </div>
        <button className="search-btn">
          <i className="fas fa-search"></i>
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBox;
