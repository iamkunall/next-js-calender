import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment-timezone';

import WorkingHoursList from './WorkingHoursList';

import { startOfWeek, addDays, differenceInDays } from 'date-fns';

const WorkingDaysList = ({
  selectedDate,
  getTimeInSelectedTimezone,
  storedDates,
}) => {
  //Store total working days
  const [workingDays, setWorkingDays] = useState([]);

  //Calculate total working days
  const calculateWorkingDays = useCallback(() => {
    const daysArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const weekStartDate = startOfWeek(new Date(selectedDate));
    const result = daysArray.map((val, index) => {
      const nextDate = addDays(weekStartDate, index + 1);

      nextDate.setHours(nextDate.getHours() + 8);

      const obj = {
        day: val,
        rawDate: new Date(nextDate),
        date: moment(new Date(nextDate)).format('DD MMM YYYY'),
        isPast: differenceInDays(new Date(), new Date(nextDate)) > 0,
      };

      return obj;
    });
    setWorkingDays(result);
  }, [selectedDate]);

  // Execute the calculateWorking days function
  useEffect(() => {
    if (selectedDate) {
      calculateWorkingDays();
    }
  }, [selectedDate]);

  return (
    <div className="px-4 relative overflow-x-auto border-2 border-black">
      <table className="w-full text-sm text-left">
        <tbody>
          {workingDays.map((data) => {
            return (
              <tr key={data.day} className="bg-white border-b">
                <td className="py-4 pr-4 border-r-2 w-24">
                  <p className=" text-red-400 font-bold mb-1">{data.day}</p>
                  <p className=" text-black font-bold">{data.date}</p>
                </td>
                {data.isPast && (
                  <>
                    <td class="px-6 py-4">Past</td>
                  </>
                )}
                {!data.isPast && (
                  <WorkingHoursList
                    data={data}
                    getTimeInSelectedTimezone={getTimeInSelectedTimezone}
                    storedDates={storedDates}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WorkingDaysList;
