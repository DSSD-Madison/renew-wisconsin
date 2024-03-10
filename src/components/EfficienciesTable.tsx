import React, { useState } from 'react';

interface EfficienciesProps {
  sumEff: number;
  winEff: number;
  summerOp: number;
  winterOp: number;
  milesPerGallon: number;
  dollarsPerGallon: number;
  onValueChange: (key: string, value: number) => void;
}

const EfficienciesTable: React.FC<EfficienciesProps> = ({
  sumEff,
  winEff,
  summerOp,
  winterOp,
  milesPerGallon,
  dollarsPerGallon,
  onValueChange,
}) => {
    const [editedValues, setEditedValues] = useState({
    sumEff,
    winEff,
    summerOp,
    winterOp,
    milesPerGallon,
    dollarsPerGallon,
    });

    const handleCellChange = (key: string, value: string) => {
        const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        let clampedValue: any;
    
        switch (key) {
          case 'sumEff':
          case 'winEff':
            clampedValue = isNaN(parsedValue)
              ? 0 : Math.max(1, Math.min(100, parsedValue));
            break;
          case 'summerOp':
          case 'winterOp':
            clampedValue = isNaN(parsedValue) ? 0 : Math.max(0, Math.min(12, parsedValue));
            break;
          case 'milesPerGallon':
          case 'dollarsPerGallon':
            clampedValue = isNaN(parsedValue) ? 0 : parsedValue;
            break;
          default:
            clampedValue = 0;
        }

        setEditedValues((prevState) => ({
            ...prevState,
            [key]: clampedValue,
        }));

        onValueChange(key, clampedValue);
    };
  return (
    <div className="overflow-x-auto">
        <table className="table w-full">
        <thead>
            <tr>
            <th>Summer Efficiency (%)</th>
            <th>Winter Efficiency (%)</th>
            <th>Summer Months in Operation</th>
            <th>Winter Months in Operation</th>
            <th>Diesel Bus Miles/Gallon</th>
            <th>Diesel $/Gallon</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>
                <input 
                type="text"
                value={editedValues.sumEff+'%'}
                onChange={(e) => handleCellChange('sumEff', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="text"
                value={editedValues.winEff+'%'}
                onChange={(e) => handleCellChange('winEff', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="text"
                value={editedValues.summerOp}
                onChange={(e) => handleCellChange('summerOp', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="text"
                value={editedValues.winterOp}
                onChange={(e) => handleCellChange('winterOp', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="text"
                value={editedValues.milesPerGallon}
                onChange={(e) => handleCellChange('milesPerGallon', e.target.value)}
                className="input"
                />
            </td>
            <td>
                <input
                type="text"
                value={'$'+editedValues.dollarsPerGallon}
                onChange={(e) => handleCellChange('dollarsPerGallon', e.target.value)}
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