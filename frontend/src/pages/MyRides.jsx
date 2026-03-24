import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaDownload, FaBus, FaTimes, FaSpinner } from 'react-icons/fa';
import { generateAndDownloadTicket } from '../utils/pdfGenerator';

const API_BASE = 'http://localhost:8080';

const MyRides = () => {
  const [bookings, setBookings] = useState([]);
  const [downloadLoading, setDownloadLoading] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookings from backend
    fetchBookingsFromBackend();
  }, []);

  const fetchBookingsFromBackend = async () => {
    setPageLoading(true);
    try {
      const userPhone = localStorage.getItem('user_phone');
      let url = `${API_BASE}/api/bookings`;

      // Only filter by phone if we have a valid-looking phone number
      if (userPhone && userPhone !== 'null' && userPhone !== 'undefined' && userPhone.trim().length > 0) {
        url = `${API_BASE}/api/bookings/user?phone=${encodeURIComponent(userPhone)}`;
        console.log('Fetching user-specific bookings for:', userPhone);
      } else {
        console.log('No user phone found, fetching all bookings');
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      let allBookings = [];
      if (response.ok) {
        allBookings = await response.json();
        console.log('Fetched backend data:', allBookings);
      }

      // Check localStorage for any local/offline bookings
      const localBookings = JSON.parse(localStorage.getItem('my_local_bookings') || '[]');
      const filteredLocal = localBookings.filter(lb => 
        !userPhone || lb.customer_phone === userPhone || lb.userPhone === userPhone
      );

      // Merge backend and local bookings (avoiding duplicates)
      const merged = [...allBookings];
      filteredLocal.forEach(lb => {
        if (!merged.find(mb => mb.pnr === lb.pnr)) {
          merged.push(lb);
        }
      });
      
      const finalBookings = merged.filter(b => b.status === 'CONFIRMED' || b.status === 'CANCELLED');
      
      // Sort: Newest first (by id or createdAt)
      finalBookings.sort((a, b) => (b.id || 0) - (a.id || 0));
      
      // Show ONLY the most recent booking as requested
      const latestOnly = finalBookings.length > 0 ? [finalBookings[0]] : [];
      setBookings(latestOnly);
    } catch (err) {
      console.error('Network/Fetch Error, checking local storage:', err);
      // Fallback to local storage only if network failed
      const localBookings = JSON.parse(localStorage.getItem('my_local_bookings') || '[]');
      localBookings.sort((a,b) => (b.id || 0) - (a.id || 0));
      setBookings(localBookings.length > 0 ? [localBookings[0]] : []);
    } finally {
      setPageLoading(false);
    }
  };

  const handleDownloadTicket = async (booking) => {
    if (!booking || !booking.pnr) return;
    const pnr = booking.pnr;
    setDownloadLoading(pnr);

    try {
      if (booking.status?.toUpperCase() !== 'CONFIRMED') {
        alert("Ticket is only available for CONFIRMED bookings.");
        setDownloadLoading(null);
        return;
      }

      // Generate and download PDF instantly on the frontend
      await generateAndDownloadTicket(booking);

    } catch (error) {
      console.error('Download error:', error);
      alert("Error generating ticket. Please try again.");
    } finally {
      setDownloadLoading(null);
    }
  };

  const handleCancel = async (booking) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    setCancelLoading(booking.id);
    try {
      let isLocalUpdated = false;

      // 1. First, try to update local storage
      const localBookings = JSON.parse(localStorage.getItem('my_local_bookings') || '[]');
      const updatedLocalBookings = localBookings.map(b => {
        if (b.id === booking.id || b.pnr === booking.pnr) {
          isLocalUpdated = true;
          return { ...b, status: 'CANCELLED' };
        }
        return b;
      });

      if (isLocalUpdated) {
        localStorage.setItem('my_local_bookings', JSON.stringify(updatedLocalBookings));
      }

      // 2. Try to update backend (if applicable)
      try {
        const response = await fetch(`${API_BASE}/api/bookings/${booking.id}/cancel`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok && !isLocalUpdated) {
          alert("Failed to cancel booking on server. Please try again.");
          setCancelLoading(null);
          return;
        }
      } catch (apiErr) {
        console.warn('API Cancel omitted/failed, local cancel succeeded:', apiErr);
        if (!isLocalUpdated) {
          alert("Error cancelling booking. Please try again.");
          setCancelLoading(null);
          return;
        }
      }

      // 3. Refresh UI
      await fetchBookingsFromBackend();
      alert("Booking cancelled successfully.");

    } catch (err) {
      console.error('Cancel error:', err);
      alert("Error cancelling booking. Please try again.");
    } finally {
      setCancelLoading(null);
    }
  };

  return (
    <div className="container section-padding" style={{ marginTop: '100px', minHeight: '80vh' }}>
      <div className="my-rides-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e1b4b' }}>My Rides</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Manage your upcoming and past rides here.</p>
      </div>

      <div className="bookings-container">
        {pageLoading ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #f1f5f9'
          }}>
            <FaSpinner style={{ fontSize: '3rem', color: '#2563eb', animation: 'spin 1s linear infinite', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Loading your rides...</h3>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>Fetching bookings from server</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state" style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #f1f5f9'
          }}>
            <FaBus style={{ fontSize: '4rem', color: '#e2e8f0', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>No bookings found</h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              {localStorage.getItem('user_phone') ? `No bookings found for the number: ${localStorage.getItem('user_phone')}` : "You haven't booked any rides yet."}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                className="book-now-btn"
                onClick={() => navigate('/')}
                style={{
                    background: '#2563eb',
                    color: '#fff',
                    padding: '1.2rem 2.5rem',
                    borderRadius: '50px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 15px rgba(37, 99, 235, 0.2)',
                    transition: 'all 0.3s ease'
                }}
                >
                Book Your First Ride
                </button>
                <button
                className="show-all-btn"
                onClick={() => {
                    localStorage.removeItem('user_phone');
                    fetchBookingsFromBackend();
                }}
                style={{
                    background: '#f8fafc',
                    color: '#475569',
                    padding: '1.2rem 2.5rem',
                    borderRadius: '50px',
                    fontWeight: '700',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                >
                Clear Filters / Show All
                </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => { if(window.confirm('Clear all local/dummy bookings?')) { localStorage.removeItem('my_local_bookings'); window.location.reload(); }}}
                style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                🗑️ Cleanup old dummy data
              </button>
            </div>
            <div className="bookings-grid" style={{ display: 'grid', gap: '1.5rem' }}>
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card" style={{
                background: '#fff',
                padding: '1.75rem',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                border: '1px solid #f1f5f9',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div className="booking-main" style={{ flex: 1, minWidth: '250px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>{booking.busName}</h3>
                    <p style={{ color: '#64748b', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>PNR: {booking.pnr}</p>

                    <div className="booking-meta" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                      <div className="meta-item">
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Date & Time</span>
                        <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem' }}>{booking.date || booking.journeyDate} | {booking.time || booking.departureTime}</span>
                      </div>
                      <div className="meta-item">
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Seats</span>
                        <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem' }}>{booking.seats || booking.selectedSeats || 'N/A'}</span>
                      </div>
                      <div className="meta-item">
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Passengers</span>
                        <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem' }}>{Array.isArray(booking.passengers) ? booking.passengers.length : (booking.passengers || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-status" style={{ textAlign: 'right' }}>
                    <span style={{
                      background: booking.status?.toUpperCase() === 'CONFIRMED' ? '#f0fdf4' :
                                  booking.status?.toUpperCase() === 'CANCELLED' ? '#fef2f2' : '#fff7ed',
                      color: booking.status?.toUpperCase() === 'CONFIRMED' ? '#16a34a' :
                             booking.status?.toUpperCase() === 'CANCELLED' ? '#dc2626' : '#ea580c',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '50px',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      display: 'inline-block',
                      marginBottom: '1rem',
                      border: `1px solid ${booking.status?.toUpperCase() === 'CONFIRMED' ? '#dcfce7' :
                               booking.status?.toUpperCase() === 'CANCELLED' ? '#fecaca' : '#ffedd5'}`
                    }}>
                      {booking.status}
                    </span>
                    <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1e1b4b' }}>
                      ₹{booking.amount || booking.totalAmount || 0}
                    </div>
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '1.75rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleDownloadTicket(booking)}
                    disabled={booking.status?.toUpperCase() !== 'CONFIRMED' || downloadLoading === booking.pnr}
                    style={{
                      padding: '0.8rem 1.6rem',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      fontWeight: '700',
                      color: booking.status?.toUpperCase() === 'CONFIRMED' ? '#475569' : '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: booking.status?.toUpperCase() === 'CONFIRMED' ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease',
                      opacity: downloadLoading === booking.pnr ? 0.7 : 1
                    }}
                  >
                    <FaDownload />
                    {downloadLoading === booking.pnr ? 'Downloading...' : 'Download Ticket'}
                  </button>
                  {booking.status?.toUpperCase() === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCancel(booking)}
                      disabled={cancelLoading === booking.id}
                      style={{
                        padding: '0.8rem 1.6rem',
                        borderRadius: '12px',
                        background: '#fff1f2',
                        color: '#e11d48',
                        border: '1px solid #ffe4e6',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        opacity: cancelLoading === booking.id ? 0.7 : 1
                      }}
                    >
                      <FaTimes />
                      {cancelLoading === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      </div>

      <style jsx>{`
        .booking-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.06) !important;
        }
        button:hover:not(:disabled) {
          filter: brightness(0.95);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MyRides;
