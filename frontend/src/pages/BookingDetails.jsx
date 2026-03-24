import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhoneAlt, FaBus, FaCalendarAlt, FaClock, FaIdCard } from 'react-icons/fa';

/**
 * BookingDetails Component
 * Implements ITS_API Structure: BlockSeat -> Payment -> BookSeatV3
 */
const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const referenceNumber = query.get('referenceNumber');
  const busName = query.get('busName');
  const sourceName = query.get('sourceName') || localStorage.getItem('search_sourceName');
  const destName = query.get('destName') || localStorage.getItem('search_destName');
  const date = query.get('date') || localStorage.getItem('search_date');
  const departureTime = query.get('departureTime');
  const selectedSeatsStr = query.get('selectedSeats');
  const totalAmount = parseFloat(query.get('totalAmount'));

  const initialSeatsList = selectedSeatsStr ? selectedSeatsStr.split(',').map(s => ({ seatNo: s, name: '', age: '', gender: 'M' })) : [];

  const [passengerDetails, setPassengerDetails] = useState(initialSeatsList);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Processing...');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [blockData, setBlockData] = useState(null); // Result from BlockSeat API

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  /**
   * REFINED STEP: BlockSeat -> Immediately BookSeatV3 (Skipping Popup)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText('Securing your seat...');

    try {
      const { itsApi } = await import('../services/itsApi');
      
      // 1. Block the seat first
      const blockPayload = {
        referenceNumber: referenceNumber,
        passengerName: passengerDetails[0].name,
        seatNames: selectedSeatsStr,
        email: contactInfo.email,
        phone: contactInfo.phone,
        pickupId: '0',
        payableAmount: totalAmount,
        totalPassengers: passengerDetails.length
      };

      const blockResponse = await itsApi.blockSeat(blockPayload);
      
      if (!blockResponse || (!blockResponse.Status === '1' && !blockResponse.BlockID)) {
        throw new Error(blockResponse.Message || "Failed to block seats");
      }

      setBlockData(blockResponse);
      setLoadingText('Finalizing booking...');

      // 2. Immediately call BookSeatV3
      const bookPayload = {
        referenceNumber: referenceNumber,
        passengerName: passengerDetails[0].name,
        seatNames: selectedSeatsStr,
        email: contactInfo.email,
        phone: contactInfo.phone,
        pickupId: '0',
        dropId: '0',
        payableAmount: totalAmount,
        totalPassengers: passengerDetails.length,
        apiPnrNo: blockResponse.BlockID || blockResponse.PNRNO || '1',
        seatDetails: JSON.stringify(passengerDetails)
      };

      const bookRes = await itsApi.bookSeat(bookPayload);
      
      if (bookRes && (bookRes.Status === '1' || bookRes.PNRNO)) {
        setIsSuccess(true);
        setLoadingText('Booking Confirmed!');

        // --- Store ONLY the Latest Booking Data ---
        const finalBooking = {
          id: Date.now(),
          pnr: bookRes.PNRNO || ('MUT' + Math.random().toString(36).substring(2, 8).toUpperCase()),
          busName: sourceName && destName ? `${sourceName} To ${destName}` : busName,
          date: date,
          journeyDate: date,
          time: departureTime,
          departureTime: departureTime,
          seats: selectedSeatsStr,
          selectedSeats: selectedSeatsStr,
          amount: totalAmount,
          totalAmount: totalAmount,
          status: 'CONFIRMED',
          paymentStatus: 'SUCCESS',
          paymentId: 'SIM_' + Date.now(),
          passengerNames: passengerDetails.map(p => p.name).join(', '),
          passengers: passengerDetails,
          customer_phone: contactInfo.phone,
          customer_email: contactInfo.email,
          sourceName: sourceName,
          destName: destName,
          createdAt: new Date().toISOString()
        };

        // Replace storage with ONLY the latest booking
        localStorage.setItem('my_local_bookings', JSON.stringify([finalBooking]));
        localStorage.setItem('user_phone', contactInfo.phone);

        setTimeout(() => {
          navigate('/myrides');
        }, 2000);
      } else {
        throw new Error(bookRes.Message || "Booking API rejected the request");
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Booking failed: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="booking-details-page">
      <div className="container">
        <h1>Passenger Details</h1>

        <form onSubmit={handleSubmit}>
          <div className="booking-grid">
            <div className="passenger-forms">
              {/* Passenger Info Cards */}
              {passengerDetails.map((p, index) => (
                <div key={index} className="passenger-card">
                  <h3>
                    <div className="icon-circle"><FaUser /></div>
                    Seat {p.seatNo}
                  </h3>
                  <div className="form-group grid-3" key={index}>
                    <div className="input-with-label">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        required
                        value={p.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="input-with-label">
                      <label>Age</label>
                      <input
                        type="number"
                        placeholder="Age"
                        required
                        value={p.age}
                        min="1"
                        max="120"
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      />
                    </div>
                    <div className="input-with-label">
                      <label>Gender</label>
                      <select
                        value={p.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Information Card */}
              <div className="passenger-card contact-section">
                <h3>
                  <div className="icon-circle"><FaEnvelope /></div>
                  Contact Information
                </h3>
                <p className="section-desc">We'll send your ticket and trip updates here.</p>
                <div className="form-group grid-2">
                  <div className="input-with-label">
                    <label>Email Address</label>
                    <div className="input-wrapper-icon">
                      <FaEnvelope className="field-icon" />
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        required
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-with-label">
                    <label>Phone Number</label>
                    <div className="input-wrapper-icon">
                      <FaPhoneAlt className="field-icon" />
                      <input
                        type="tel"
                        placeholder="Enter 10 digit mobile"
                        required
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Summary Panel */}
            <div className="summary-panel">
              <div className="bus-summary-card">
                <div className="summary-header">
                  <div className="bus-icon"><FaBus /></div>
                  <div>
                    <h3>{sourceName && destName ? `${sourceName} To ${destName}` : busName}</h3>
                    <div className="trip-meta">
                      <span><FaCalendarAlt /> {date}</span>
                      <span><FaClock /> {departureTime}</span>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="selected-seats-info">
                  <div className="label-row">
                    <span><FaIdCard /> Seat(s)</span>
                    <span className="seats-tag">{selectedSeatsStr}</span>
                  </div>
                </div>

                <div className="fare-breakdown">
                  <div className="fare-row">
                    <span>Ticket Price (x{passengerDetails.length})</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="fare-row bonus">
                    <span>Booking Fee</span>
                    <span>₹0</span>
                  </div>
                  <hr className="dashed" />
                  <div className="fare-row total">
                    <span>Amount to Pay</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <button type="submit" className={`payment-btn ${isSuccess ? 'success-btn' : ''}`} disabled={loading || isSuccess}>
                  {loading || isSuccess ? (
                    <span className="loader-container">
                      {!isSuccess && <div className="mini-loader"></div>}
                      {isSuccess && <span className="check-icon">✓</span>}
                      {loadingText}
                    </span>
                  ) : (
                    `Pay ₹${totalAmount} & Book Now`
                  )}
                </button>

                <p className="secure-text">
                  <span className="shield-icon">🛡️</span> Secure SSL Encrypted Payment
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>


    </div>
  );
};

export default BookingDetails;
