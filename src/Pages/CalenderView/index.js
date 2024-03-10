import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getOrders } from '../../API';

function CalendarView() {
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  const [selectedDateOrders, setSelectedDateOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => {
      const orders = res.products.map((order, index) => ({
        id: order.id,
        title: `Order#${order.id}`,
        start: generateDeliveryDate(index), // Generate delivery date based on index
        end: generateDeliveryDate(index), // Generate delivery date based on index
        orderDetails: order, 
      }));

      setEvents(orders);
    });
  }, []);

  // Function to generate delivery date based on index
  const generateDeliveryDate = (index) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate() + index;
    return new Date(year, month, day);
  };

  const handleSelectEvent = (event) => {
    console.log('Selected event:', event);
  };

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = slotInfo.start; 
    const ordersForSelectedDate = events.filter((event) =>
      moment(event.start).isSame(selectedDate, 'day')
    );
    setSelectedDateOrders(ordersForSelectedDate);
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto', padding: '0 20px', marginLeft:"300px" , marginRight:"300px" }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>DELIVERY CALENDAR</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={(event, start, end, isSelected) => {
            const style = {
              backgroundColor: isSelected ? '#3174ad' : '#3a87ad',
              color: 'white',
            };
            return { style };
          }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          style={{ height: 500 }} 
        />
        <div>
          <ul>
            {selectedDateOrders.map((order) => (
              <li key={order.id}>{order.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
