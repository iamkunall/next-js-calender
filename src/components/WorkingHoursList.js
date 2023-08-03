import React from 'react';

import moment from 'moment-timezone';

import CheckBox from './CheckBox';

//Array of working hours from 8:00AM to 11:00PM
const workingHours = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
];

const WorkingHoursList = ({ data, getTimeInSelectedTimezone, storedDates }) => {
  // Check if time is already checked or not
  const handleChecked = (date, time) => {
    let isChecked = false;
    const timeInput = `${moment(date).format('YYYY-MM-DD')}T${time}:00`;

    storedDates.map((val) => {
      console.log(
        moment(date).format('DD-MM-YYYY'),
        moment(new Date(val.date)).format('DD-MM-YYYY'),
        moment(date).format('DD-MM-YYYY') ===
          moment(new Date(val.date)).format('DD-MM-YYYY'),
      );

      if (
        moment(new Date(val.date)).format('DD-MM-YYYY') ===
          moment(date).format('DD-MM-YYYY') &&
        val.time === moment(timeInput).tz('UTC').format('hh:mm A')
      ) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  return (
    <td class="p-6 flex flex-wrap">
      {workingHours.map((time) => {
        let isChecked = handleChecked(data.rawDate, time);
        return (
          <div key={time} className="m-2">
            <CheckBox initialValue={isChecked} data={data} />
            <span className="ml-1 text-sm">
              {' '}
              {getTimeInSelectedTimezone(
                `${moment(data.date).format('YYYY-MM-DD')}T${time}:00`,
              )}
            </span>
          </div>
        );
      })}
    </td>
  );
};

export default WorkingHoursList;
