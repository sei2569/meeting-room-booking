import React, { useState } from 'react';
import Layout from './components/Layout';
import CalendarView from './components/CalendarView';
import ListView from './components/ListView';
import BookingForm from './components/BookingForm';
import { INITIAL_BOOKINGS } from './data/mockData';

function App() {
  const [activeView, setActiveView] = useState('calendar');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleAddClick = () => {
    setSelectedBooking(null);
    setIsFormOpen(true);
  };

  const handleEventClick = (booking) => {
    setSelectedBooking(booking);
    setIsFormOpen(true);
  };

  const handleDateSelect = (info) => {
    setSelectedBooking({
      start: info.startStr,
      end: info.endStr,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (selectedBooking?.id) {
      // Update
      setBookings(prev => prev.map(b => b.id === data.id ? data : b));
    } else {
      // Create
      setBookings(prev => [...prev, data]);
    }
    setIsFormOpen(false);
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      onAddClick={handleAddClick}
    >
      <div className="animate-in fade-in duration-500">
        {activeView === 'calendar' ? (
          <CalendarView 
            bookings={bookings} 
            onEventClick={handleEventClick}
            onDateSelect={handleDateSelect}
          />
        ) : (
          <ListView 
            bookings={bookings} 
            onEditClick={handleEventClick}
          />
        )}
      </div>

      <BookingForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedBooking}
      />
    </Layout>
  );
}

export default App;
