import React from 'react';
import moment from 'moment-timezone';
const Header = ({ handlePreviousWeek, selectedDate, handleNextWeek }) => {
  return (
    <div className="py-2 px-2 flex justify-between border-2 border-b-0 border-black rounded-sm">
      <button
        className="border-2 border-black px-2 rounded-xl"
        onClick={handlePreviousWeek}
      >
        Previous
      </button>
      <span className="bg-blue-800 p-2 text-white rounded-2xl border-2 border-white">
        {' '}
        {moment(selectedDate).format('DD MMMM YYYY')}
      </span>
      <button
        className="border-2 border-black px-2 rounded-xl"
        onClick={handleNextWeek}
      >
        Next
      </button>
    </div>
  );
};

export default Header;
