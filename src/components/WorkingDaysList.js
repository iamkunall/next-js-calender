import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment-timezone';

import { startOfWeek, addDays, differenceInDays } from 'date-fns';

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

const WorkingDaysList = ({ selectedDate, getTimeInSelectedTimezone }) => {
  //Store total working days
  const [workingDays, setWorkingDays] = useState([]);
  //Store dates which is already in local storage
  const [storedDates, setStoredDates] = useState([]);

  //Calculate total working days
  const calculateWorkingDays = useCallback(() => {
    const daysArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const weekStartDate = startOfWeek(new Date(selectedDate));
    const result = daysArray.map((val, index) => {
      const nextDate = addDays(weekStartDate, index + 1);

      const obj = {
        day: val,
        rawDate: new Date(nextDate),
        date: moment(new Date(nextDate)).format('DD MMM'),
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
  }, [selectedDate, calculateWorkingDays]);

  // Store data to local storage
  const handleStoreToLocalStorage = (inputObj) => {
    let array = [];
    if (storedDates.length === 0) {
      array = [inputObj];
      setStoredDates(array);
    } else {
      array = [...storedDates, inputObj];
      setStoredDates(array);
    }

    const arrayString = JSON.stringify(array);
    localStorage.setItem('selectedDates', arrayString);
  };

  const handleRemoveFromLocalStorage = (val) => {
    const updatedArray = [];
    storedDates.forEach((item) => {
      if (item.date == val.date && item.time == val.time) {
        return;
      }
      updatedArray.push(item);
    });
    setStoredDates(updatedArray);
    const arrayString = JSON.stringify(updatedArray);
    localStorage.setItem('selectedDates', arrayString);
  };

  const handleSelectItem = (date, time, isChecked) => {
    const timeInput = `${moment(date).format('YYYY-MM-DD')}T${time}:00`;
    const obj = {
      Id: Math.random(1),
      date: moment(date).format('YYYY-MM-DD'),
      time: moment(timeInput).tz('UTC').format('hh:mm A'),
    };
    if (isChecked) {
      //Remove from local storage
      handleRemoveFromLocalStorage(obj);
    } else {
      //Store to local storage
      handleStoreToLocalStorage(obj);
    }
  };

  useEffect(() => {
    let storedDatesString = localStorage.getItem('selectedDates');
    if (storedDatesString !== null) {
      setStoredDates(JSON.parse(storedDatesString));
    }
  }, [selectedDate]);

  // Check if time is already checked or not
  const handleChecked = (date, time) => {
    let isChecked = false;
    const timeInput = `${moment(date).format('YYYY-MM-DD')}T${time}:00`;
    storedDates.map((val) => {
      if (
        val.date == moment(date).format('YYYY-MM-DD') &&
        val.time === moment(timeInput).tz('UTC').format('hh:mm A')
      ) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  return (
    <div className="px-4 relative overflow-x-auto border-2 border-black">
      <table className="w-full text-sm text-left">
        <tbody>
          {workingDays.map((data) => (
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
                <td class="p-6 flex flex-wrap">
                  {workingHours.map((time) => {
                    const isChecked = handleChecked(data.rawDate, time);
                    return (
                      <div key={time} className="m-2">
                        <input
                          checked={isChecked}
                          type="checkbox"
                          id={data.date}
                          name="timeSelector"
                          onChange={() =>
                            handleSelectItem(data.rowDate, time, isChecked)
                          }
                        />
                        <span className="ml-1 text-sm">
                          {' '}
                          {getTimeInSelectedTimezone(
                            `${moment(data.rowDate).format(
                              'YYYY-MM-DD',
                            )}T${time}:00`,
                          )}
                        </span>
                      </div>
                    );
                  })}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkingDaysList;
