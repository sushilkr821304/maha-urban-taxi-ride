import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateAndDownloadTicket = async (booking) => {
  if (!booking || !booking.pnr) return;

  const doc = new jsPDF();

  // Fetch and convert image to base64 for reliable jsPDF rendering
  const getLogoData = (imgUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve({
            data: canvas.toDataURL("image/png"),
            aspectRatio: img.width / img.height
          });
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = imgUrl;
    });
  };

  const logoObj = await getLogoData('/white-header-logo.png');
  if (logoObj && logoObj.data) {
    let printWidth = 65; // Professional standard width for ticket header
    let printHeight = printWidth / logoObj.aspectRatio; // Preserve native aspect ratio
    
    // Safety check: Prevent logo from overflowing into the separator line (y=35)
    if (printHeight > 20) {
      printHeight = 20;
      printWidth = printHeight * logoObj.aspectRatio;
    }

    doc.addImage(logoObj.data, 'PNG', 14, 10, printWidth, printHeight);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 27, 75); // Dark blue text
  doc.text("MAHA URBAN RIDE", 125, 20, null, null, "center");

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("E-TICKET / BOARDING PASS", 105, 30, null, null, "center");

  // Line separator
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 35, 196, 35);

  // Booking Info section
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text(`PNR Number:`, 14, 45);
  doc.setFont("helvetica", "bold");
  doc.text(`${booking.pnr}`, 45, 45);

  doc.setFont("helvetica", "normal");
  doc.text(`Status:`, 14, 52);
  doc.setFont("helvetica", "bold");
  const statusLabel = booking.status ? booking.status.toUpperCase() : "CONFIRMED";
  if(statusLabel === 'CONFIRMED') doc.setTextColor(22, 163, 74); // Green
  else doc.setTextColor(234, 88, 12); // Orange
  doc.text(`${statusLabel}`, 30, 52);

  // Reset text color for generic items
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "normal");
  
  doc.text(`Date & Time:`, 100, 45);
  doc.setFont("helvetica", "bold");
  doc.text(`${booking.date || 'N/A'} | ${booking.time || 'N/A'}`, 130, 45);

  doc.setFont("helvetica", "normal");
  doc.text(`Route:`, 100, 52);
  doc.setFont("helvetica", "bold");
  const routeDisplay = (booking.sourceName && booking.destName) 
    ? `${booking.sourceName} To ${booking.destName}`
    : (booking.busName || 'Express Run');
  doc.text(`${routeDisplay}`, 115, 52);

  // Second separator
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 60, 196, 60);

  // Passenger data formatting (Bulletproof)
  doc.setFontSize(12);
  doc.text("Passenger Details", 14, 70);

  let names = "N/A";
  if (booking.passengerNames && typeof booking.passengerNames === 'string') {
    names = booking.passengerNames;
  } else if (Array.isArray(booking.passengers)) {
    names = booking.passengers.map(p => typeof p === 'string' ? p : (p.name || 'Passenger')).join(', ');
  } else {
    names = String(booking.passengers || "Passenger");
  }

  const seats = booking.seats || booking.selectedSeats || "N/A";

  const tableData = [
    [names, seats]
  ];

  autoTable(doc, {
    startY: 75,
    head: [['Passenger Names', 'Seat(s)']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [30, 27, 75], textColor: [255, 255, 255] },
    margin: { left: 14, right: 14 }
  });

  // Price & Payment Info
  const finalY = doc.lastAutoTable.finalY || 100;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Payment ID: ${booking.paymentId || 'N/A'}`, 14, finalY + 15);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Total Paid:`, 130, finalY + 15);
  doc.setTextColor(30, 27, 75);
  doc.text(`Rs. ${booking.amount || 0}`, 160, finalY + 15);

  // Footer Disclaimer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for riding with Maha Urban Taxi Ride.", 105, finalY + 40, null, null, "center");
  doc.text("This is an electronically generated ticket. Please present it along with a valid ID during boarding.", 105, finalY + 45, null, null, "center");
  
  doc.save(`ticket-${booking.pnr}.pdf`);
};
