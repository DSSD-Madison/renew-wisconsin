import React, { useState } from 'react';

interface EfficienciesProps {
  summer_efficiency: number;
  winter_efficiency: number;
  diesel_bus_miles_per_gallon: number;
  diesel_dollar_per_gallon: number;
  onValueChange: (key: string, value: number) => void;
}

const EfficienciesTable: React.FC<EfficienciesProps> = ({
  summer_efficiency,
  winter_efficiency,
  diesel_bus_miles_per_gallon,
  diesel_dollar_per_gallon,
  onValueChange,
}) => {
    const [editedValues, setEditedValues] = useState({
    summer_efficiency,
    winter_efficiency,
    diesel_bus_miles_per_gallon,
    diesel_dollar_per_gallon,
    });

    const handleCellChange = (key: string, value: string) => {
        const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        let clampedValue: any;
        let percentage: boolean = false;
        switch (key) {
          case 'summer_efficiency':
          case 'winter_efficiency':
            percentage = true;
            clampedValue = isNaN(parsedValue)
              ? 0 : Math.max(0, Math.min(100, parsedValue));
            break;
          case 'diesel_bus_miles_per_gallon':
          case 'diesel_dollar_per_gallon':
            clampedValue = isNaN(parsedValue) ? 0 : parsedValue;
            break;
          default:
            clampedValue = 0;
        }

        setEditedValues((prevState) => ({
            ...prevState,
            [key]: clampedValue,
        }));


        onValueChange(key, percentage ? clampedValue * .01 : clampedValue);
    };
  return (
    <div className="table w-full">
        <table>
        <thead>
            <tr>
            <th>Summer Efficiency (%)</th>
            <th>Winter Efficiency (%)</th>
            <th>Diesel Bus Miles/Gallon</th>
            <th>Diesel $/Gallon</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>
                <input 
                type="text"
                value={editedValues.summer_efficiency+'%'}
                onChange={(e) => handleCellChange('summer_efficiency', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="text"
                value={editedValues.winter_efficiency+'%'}
                onChange={(e) => handleCellChange('winter_efficiency', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="text"
                value={editedValues.diesel_bus_miles_per_gallon}
                onChange={(e) => handleCellChange('diesel_bus_miles_per_gallon', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="number"
                value={editedValues.diesel_dollar_per_gallon}
                onChange={(e) => handleCellChange('diesel_dollar_per_gallon', e.target.value)}
                className="input"
                />
            </td>
            </tr>
        </tbody>
        </table>
    </div>
  );
};

export default EfficienciesTable;