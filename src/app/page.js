'use client';

import React, { useState, useEffect } from 'react';
import { addWeeks, subWeeks } from 'date-fns';
import moment from 'moment-timezone';

import Header from '@/components/Header';
import SelectTimeZone from '@/components/SelectTimeZone';
import WorkingDaysList from '@/components/WorkingDaysList';

const timezones = [
  'UTC',
  'Asia/Calcutta',
  'America/Los_Angeles',
  'Europe/London',
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0]);

  const handlePreviousWeek = () => {
    setSelectedDate((prevDate) => subWeeks(new Date(prevDate), 1));
  };

  const handleNextWeek = () => {
    setSelectedDate((prevDate) => addWeeks(new Date(prevDate), 1));
  };

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const getTimeInSelectedTimezone = (time) => {
    if (selectedTimezone === 'UTC') {
      return moment(time).tz('UTC').format('hh:mm A');
    }

    return moment(time).tz(selectedTimezone).format('hh:mm A');
  };

  useEffect(() => {
    moment.tz.setDefault('UTC');
  }, []);

  return (
    <div className="m-5 p-10 border-2">
      <h1 className="text-center mb-10">Weekly Schedule</h1>
      <Header
        selectedDate={selectedDate}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
      />
      <SelectTimeZone
        selectedTimezone={selectedTimezone}
        timezones={timezones}
        handleTimezoneChange={handleTimezoneChange}
      />
      <div>
        <WorkingDaysList
          selectedTimeZone={selectedTimezone}
          selectedDate={selectedDate}
          getTimeInSelectedTimezone={getTimeInSelectedTimezone}
        />
      </div>
    </div>
  );
}
