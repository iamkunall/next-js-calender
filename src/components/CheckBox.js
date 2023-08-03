import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const CheckBox = ({ data, initialValue, time, getTimeInSelectedTimezone }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (initialValue) {
      setIsChecked(true);
    }

    return () => {
      setIsChecked(false);
    };
  }, [initialValue]);

  return (
    <div
      className="m-2 cursor-pointer"
      onClick={() => {
        setIsChecked((prev) => !prev);
      }}
    >
      <input
        checked={isChecked}
        type="checkbox"
        id={data.date}
        name="timeSelector"
      />
      <span className="ml-1 text-sm cursor-pointer">
        {' '}
        {getTimeInSelectedTimezone(
          `${moment(data.date).format('YYYY-MM-DD')}T${time}:00`,
        )}
      </span>
    </div>
  );
};

export default CheckBox;
