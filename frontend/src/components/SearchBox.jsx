const SearchBox = () => {
  return (
    <div className="container search-box-wrapper reveal">
      <div className="search-box">
        <div className="input-group">
          <label>Source</label>
          <div className="input-wrapper">
            <input type="text" placeholder="Select from city" />
          </div>
        </div>
        <button className="swap-btn">⇄</button>
        <div className="input-group">
          <label>Destination</label>
          <div className="input-wrapper">
            <input type="text" placeholder="Select to city" />
          </div>
        </div>
        <div className="input-group">
          <label>Journey Date</label>
          <div className="input-wrapper">
            <span>📅</span>
            <input type="text" placeholder="15-03-2026" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
          </div>
        </div>
        <div className="input-group">
          <label>Return Date</label>
          <div className="input-wrapper">
            <span>📅</span>
            <input type="text" placeholder="Return Date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
          </div>
        </div>
        <button className="search-btn">
          🔍 Search
        </button>
      </div>
    </div>
  )
}

export default SearchBox
