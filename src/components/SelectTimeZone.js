import React from 'react';

const SelectTimeZone = ({
  selectedTimezone,
  handleTimezoneChange,
  timezones,
}) => {
  return (
    <div className="px-4 py-2 border-2 border-t-0 border-b-0 border-black">
      <p className="text-xl mb-2">Timezone:</p>
      <select
        className="w-full border-2 py-1 border-black"
        id="timezone"
        value={selectedTimezone}
        onChange={handleTimezoneChange}
      >
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTimeZone;
