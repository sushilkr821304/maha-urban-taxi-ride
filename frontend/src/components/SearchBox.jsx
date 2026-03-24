import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { itsApi } from '../services/itsApi';

const SearchBox = ({ variant = 'home' }) => {
  const navigate = useNavigate();
  const isRoutesVariant = variant === 'routes';
  const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [journeyDate, setJourneyDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // API State
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [sourceSearch, setSourceSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [showSourceList, setShowSourceList] = useState(false);
  const [showDestList, setShowDestList] = useState(false);

  const journeyRef = useRef(null);
  const returnRef = useRef(null);
  const sourceRef = useRef(null);
  const destRef = useRef(null);

  // Fetch sources on mount
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const data = await itsApi.getSources();
        setSources(data || []);
      } catch (err) {
        console.error("Failed to fetch sources", err);
      }
    };
    fetchSources();
  }, []);

  // Fetch destinations when source changes
  useEffect(() => {
    if (selectedSource) {
      const fetchDestinations = async () => {
        try {
          const data = await itsApi.getDestinations(selectedSource.id || selectedSource.CM_CityID);
          setDestinations(data || []);
        } catch (err) {
          console.error("Failed to fetch destinations", err);
        }
      };
      fetchDestinations();
    } else {
      setDestinations([]);
    }
  }, [selectedSource]);

  // Close calendar or lists on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (journeyRef.current && !journeyRef.current.contains(event.target)) {
        setShowJourneyCalendar(false);
      }
      if (returnRef.current && !returnRef.current.contains(event.target)) {
        setShowReturnCalendar(false);
      }
      if (sourceRef.current && !sourceRef.current.contains(event.target)) {
        setShowSourceList(false);
      }
      if (destRef.current && !destRef.current.contains(event.target)) {
        setShowDestList(false);
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

  const handleSearch = () => {
    if (!selectedSource || !selectedDest || !journeyDate) {
      alert("Please select source, destination, and journey date");
      return;
    }
    
    const sName = selectedSource.CM_CityName || selectedSource.name;
    const dName = selectedDest.CM_CityName || selectedDest.name;

    // Single source of truth for the route
    localStorage.setItem('search_sourceName', sName);
    localStorage.setItem('search_destName', dName);
    localStorage.setItem('search_date', journeyDate);

    // Convert source and destination to query params for SearchResults page
    const params = new URLSearchParams({
      sourceId: selectedSource.CM_CityID || selectedSource.id,
      sourceName: sName,
      destId: selectedDest.CM_CityID || selectedDest.id,
      destName: dName,
      date: journeyDate
    });
    
    navigate(`/search-results?${params.toString()}`);
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

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Previous month padding
      const prevMonthDays = daysInMonth(currentMonth - 1, currentYear);
      for (let i = startDay - 1; i >= 0; i--) {
        days.push(<div key={`prev-${i}`} className="calendar-day padding-day disabled">{prevMonthDays - i}</div>);
      }

      // Current month days
      for (let i = 1; i <= totalDays; i++) {
        const dateObj = new Date(currentYear, currentMonth, i);
        dateObj.setHours(0, 0, 0, 0);
        
        const dateStr = formatDate(dateObj);
        const isSelected = selectedDate === dateStr;
        const isPast = dateObj < today;
        const isToday = dateObj.getTime() === today.getTime();

        days.push(
          <div 
            key={i} 
            className={`calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''} ${isToday && !isSelected ? 'today' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isPast) {
                onSelect(dateStr);
                onClose();
              }
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

  const CityList = ({ items = [], onSelect, search, setSearch, placeholder }) => {
    const filtered = items.filter(item => 
      (item.CM_CityName || item.name || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="city-list-popup" onClick={(e) => e.stopPropagation()}>
        <input 
          type="text" 
          autoFocus
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="city-search-input"
        />
        <div className="city-list">
          {filtered.length > 0 ? (
            filtered.map(item => (
              <div 
                key={item.CM_CityID || item.id} 
                className="city-item"
                onClick={() => onSelect(item)}
              >
                {item.CM_CityName || item.name}
              </div>
            ))
          ) : (
            <div className="no-cities">No cities found</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`search-box-wrapper ${isRoutesVariant ? 'routes-search-variant' : ''}`} id="search-section">
      <div className="search-box">
        <div className="input-group" ref={sourceRef}>
          <label>{isRoutesVariant ? 'From' : 'Source'}</label>
          <div className="input-wrapper" onClick={() => setShowSourceList(!showSourceList)}>
            <i className="fas fa-map-marker-alt"></i>
            <input 
              type="text" 
              placeholder="Select from city" 
              value={selectedSource ? (selectedSource.CM_CityName || selectedSource.name) : sourceSearch}
              readOnly
            />
          </div>
          {showSourceList && (
            <CityList 
              items={sources} 
              onSelect={(item) => {
                setSelectedSource(item);
                setSelectedDest(null);
                setShowSourceList(false);
              }}
              search={sourceSearch}
              setSearch={setSourceSearch}
              placeholder="Search source city"
            />
          )}
        </div>

        <button className="swap-btn" onClick={() => {
          const temp = selectedSource;
          setSelectedSource(selectedDest);
          setSelectedDest(temp);
        }}>
          <i className="fas fa-exchange-alt"></i>
        </button>

        <div className="input-group" ref={destRef}>
          <label>{isRoutesVariant ? 'To' : 'Destination'}</label>
          <div className="input-wrapper" onClick={() => setShowDestList(!showDestList)}>
            <i className="fas fa-map-marker-alt"></i>
            <input 
              type="text" 
              placeholder="Select to city" 
              value={selectedDest ? (selectedDest.CM_CityName || selectedDest.name) : destSearch}
              readOnly
            />
          </div>
          {showDestList && (
            <CityList 
              items={destinations} 
              onSelect={(item) => {
                setSelectedDest(item);
                setShowDestList(false);
              }}
              search={destSearch}
              setSearch={setDestSearch}
              placeholder="Search destination city"
            />
          )}
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

        {!isRoutesVariant && (
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
        )}

        <button className="search-btn" onClick={handleSearch}>
          <i className={isRoutesVariant ? "fas fa-route" : "fas fa-search"}></i>
          {isRoutesVariant ? 'Find Routes' : 'Search'}
        </button>
      </div>
    </div>
  )
}

export default SearchBox;
