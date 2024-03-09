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
        orderDetails: order, // Include the entire order details for each event
      }));

      setEvents(orders);
    });
  }, []);

  // Function to generate delivery date based on index
  const generateDeliveryDate = (index) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate() + index; // Increment day based on index
    return new Date(year, month, day);
  };

  const handleSelectEvent = (event) => {
    console.log('Selected event:', event);
    // Handle displaying the details of the selected order (e.g., open a modal)
    // You can access the order details using event.orderDetails
  };

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = slotInfo.start; // Get the selected date from the slot
    // Filter orders for the selected date
    const ordersForSelectedDate = events.filter((event) =>
      moment(event.start).isSame(selectedDate, 'day')
    );
    setSelectedDateOrders(ordersForSelectedDate);
  };

  return (
    <div style={{ height: '500px', marginLeft: '320px' }}>
      <h2>DELIVERY CALENDAR</h2>
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
      />
      <div>
        <ul>
          {selectedDateOrders.map((order) => (
            <li key={order.id}>{order.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CalendarView;
