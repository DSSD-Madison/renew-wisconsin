import React from 'react';

export type MonthsData = { [key: string]: boolean };

interface CalendarProps {
    monthsData: MonthsData;
}

const Calendar: React.FC<CalendarProps> = ({ monthsData }) => {
    // Sort the months in calendar order
    const sortedMonths = Object.keys(monthsData).sort((a, b) => {
        const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });

    return (
        <div className="table">
        <table>
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
                <td key={index} className={monthsData[month] ? 'bg-[#3b9044]' : 'bg-red-700'}>   </td>
                ))}
            </tr>
            
            </tbody>
        </table>
        </div>
    );
};

export default Calendar;