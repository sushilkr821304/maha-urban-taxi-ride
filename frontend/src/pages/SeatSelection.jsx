import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { itsApi } from '../services/itsApi';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const referenceNumber = query.get('referenceNumber');
  const busName = query.get('busName');
  const sourceName = query.get('sourceName') || localStorage.getItem('search_sourceName');
  const destName = query.get('destName') || localStorage.getItem('search_destName');
  const date = query.get('date') || localStorage.getItem('search_date');
  const departureTime = query.get('departureTime');

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      try {
        const data = await itsApi.getSeatArrangementDetails(referenceNumber);
        setSeats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (referenceNumber) fetchSeats();
  }, [referenceNumber]);

  const toggleSeat = (seat) => {
    if (seat.Available !== 'Y') return;

    if (selectedSeats.find(s => s.SeatNo === seat.SeatNo)) {
      setSelectedSeats(selectedSeats.filter(s => s.SeatNo !== seat.SeatNo));
    } else {
      if (selectedSeats.length >= 6) {
        alert("You can select maximum 6 seats");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    const params = new URLSearchParams({
      referenceNumber,
      busName,
      sourceName,
      destName,
      date,
      departureTime,
      selectedSeats: selectedSeats.map(s => s.SeatNo).join(','),
      totalAmount: selectedSeats.reduce((sum, s) => sum + parseFloat(s.SeatRate), 0)
    });

    navigate(`/booking-details?${params.toString()}`);
  };

  // Group seats by Low/Up berth and Rows/Columns
  const lowerBerth = seats.filter(s => s.UpLowBerth === 'LB');
  const upperBerth = seats.filter(s => s.UpLowBerth === 'UB');

  const renderBusLayout = (seatsList, title) => {
    if (seatsList.length === 0) return null;

    const maxRow = Math.max(...seatsList.map(s => parseInt(s.Row)));
    const maxCol = Math.max(...seatsList.map(s => parseInt(s.Column)));

    const grid = [];
    for (let r = 0; r <= maxRow; r++) {
      const row = [];
      for (let c = 0; c <= maxCol; c++) {
        const seat = seatsList.find(s => parseInt(s.Row) === r && parseInt(s.Column) === c);
        row.push(seat);
      }
      grid.push(row);
    }

    return (
      <div className="berth-container">
        <h3>{title}</h3>
        <div className="bus-grid">
          <div className="steering-wheel">
            <i className="fas fa-dharmachakra"></i>
          </div>
          <div className="seats-container">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="seat-row">
                {row.map((seat, cIdx) => (
                  <div
                    key={cIdx}
                    className={`seat-box ${!seat ? 'empty' : ''} ${seat?.Available !== 'Y' ? 'booked' : ''} ${selectedSeats.find(s => s.SeatNo === seat?.SeatNo) ? 'selected' : ''}`}
                    onClick={() => seat && toggleSeat(seat)}
                    title={seat ? `Seat ${seat.SeatNo} - ₹${seat.SeatRate}` : ''}
                  >
                    {seat && (
                      <div className={`seat-icon ${seat.SeatType === '1' ? 'sleeper' : 'seater'}`}>
                        {seat.SeatNo}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="seat-selection-page">
      <div className="container">
        <div className="selection-layout">
          <div className="seats-panel">
            <h2>Select Seats</h2>
            {loading ? (
              <div className="loading-seats">Loading layout...</div>
            ) : (
              <>
                {renderBusLayout(lowerBerth, "Lower Berth / Seater")}
                {renderBusLayout(upperBerth, "Upper Berth")}

                <div className="seat-legend">
                  <div className="legend-item"><span className="box available"></span> Available</div>
                  <div className="legend-item"><span className="box selected"></span> Selected</div>
                  <div className="legend-item"><span className="box booked"></span> Booked</div>
                </div>
              </>
            )}
          </div>

          <div className="summary-panel">
            <div className="bus-summary-card">
              <h3>{sourceName && destName ? `${sourceName} To ${destName}` : busName}</h3>
              <p>{date} | {departureTime}</p>
              <hr />
              <div className="selected-info">
                <p>Selected Seats: <strong>{selectedSeats.map(s => s.SeatNo).join(', ') || 'None'}</strong></p>
                <p>Total Fare: <strong>₹{selectedSeats.reduce((sum, s) => sum + parseFloat(s.SeatRate), 0)}</strong></p>
              </div>
              <button
                className="continue-btn"
                disabled={selectedSeats.length === 0}
                onClick={handleContinue}
              >
                Continue to Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
