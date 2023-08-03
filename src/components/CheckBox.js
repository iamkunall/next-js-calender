import React, { useState, useEffect } from 'react';

const CheckBox = ({ data, initialValue }) => {
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
    <input
      checked={isChecked}
      type="checkbox"
      id={data.date}
      name="timeSelector"
      onChange={() => {
        setIsChecked((prev) => !prev);
      }}
    />
  );
};

export default CheckBox;
