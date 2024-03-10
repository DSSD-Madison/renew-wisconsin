import React, { useState } from 'react';

export type MonthsData = { [key: string]: boolean };

interface CalendarProps {
  monthsData: MonthsData;
  onMonthsDataChange: (updatedMonthsData: MonthsData) => void;
}

const Calendar: React.FC<CalendarProps> = ({ monthsData, onMonthsDataChange }) => {
  const [localMonthsData, setLocalMonthsData] = useState<MonthsData>(monthsData);

  const handleCellClick = (month: string) => {

    const newMonthsData = {
      ...localMonthsData,
      [month]: !localMonthsData[month],
    }

    setLocalMonthsData(newMonthsData);
    
    onMonthsDataChange(newMonthsData);
  };

  const sortedMonths = Object.keys(localMonthsData).sort((a, b) => {
    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });


  return (
    <div className="table">
      <table className="table w-full">
        <thead>
          <tr>
            {sortedMonths.map((month) => (
              <th key={month}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {sortedMonths.map((month, index) => (
              <td
                key={index}
                className={localMonthsData[month] ? 'bg-[#3b9044]' : 'bg-red-700' }
                onClick={() => handleCellClick(month)}
              >
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;