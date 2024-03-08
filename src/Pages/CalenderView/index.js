// src/CalendarView.js

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getOrders } from '../../API';

function CalendarView() {
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getOrders().then((res) => {
      const orders = res.products.map((order) => ({
        id: order.id,
        title: `Order#${order.id}`,
        start: new Date(order.expectedDeliveryDate),
        end: new Date(order.expectedDeliveryDate),
        orderDetails: order, // Include the entire order details for each event
      }));

      setEvents(orders);
    });
  }, []);

  const handleSelectEvent = (event) => {
    console.log('Selected event:', event);
    // Handle displaying the details of the selected order (e.g., open a modal)
    // You can access the order details using event.orderDetails
  };

  const handleSelectSlot = (slotInfo) => {
    // Filter orders for the selected date
    const selectedDateOrders = events.filter((event) =>
      moment(event.start).isSame(slotInfo.start, 'day')
    );
    console.log('Orders for selected date:', selectedDateOrders);
    // Handle displaying the orders for the selected date (e.g., open a modal)
  };

  return (
    <div style={{ height: '500px' , marginLeft: '320px' }}>
      <h2>DELIVERY CALENDER</h2>
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
    </div>
  );
}

export default CalendarView;
