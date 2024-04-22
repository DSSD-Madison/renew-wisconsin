import React, { useState } from 'react';

export interface SummerWinterCharges {
  on_peak_kWh?: number;
  off_peak_kWh?: number;
  on_peak_kW?: number;
}

export interface DistributionDemandCharge {
  distribution_demand_charge: number;
}

interface DemandChargesTableProps {
  summerCharges: SummerWinterCharges;
  winterCharges: SummerWinterCharges;
  distributionCharge: DistributionDemandCharge;
  onValueChange: (key: string, value: number) => void;
}

const DemandChargesTable: React.FC<DemandChargesTableProps> = ({
  summerCharges,
  winterCharges,
  distributionCharge: distributionCharge,
  onValueChange,
}) => {
  const [editedValues, setEditedValues] = useState({
    summerCharges,
    winterCharges,
    distributionCharge: distributionCharge.distribution_demand_charge,
  });

  const handleCellChange = (key: string, value: number) => {
    const clampedValue = isNaN(value) ? 0 : value;

    if (key === 'distributionCharge') {
      setEditedValues((prevState) => ({
        ...prevState,
        distributionCharge: clampedValue,
      }));
      onValueChange('distributionCharge', clampedValue);
    } else {
      const [season, field] = key.split(/_(.*)/s);
      const updatedValues = { ...editedValues };

      if (season === 'summer') {
        updatedValues.summerCharges = {
          ...updatedValues.summerCharges,
          [field]: clampedValue,
        };
      } else {
        updatedValues.winterCharges = {
          ...updatedValues.winterCharges,
          [field]: clampedValue,
        };
      }

      setEditedValues(updatedValues);
      onValueChange(key, clampedValue);
    }
  };

  return (
    <div className="table w-full">
      <table>
        <thead>
          <tr>
            <th colSpan={3}>Summer</th>
            <th colSpan={3}>Winter</th>
          </tr>
          <tr>
            <th>On-Peak $/kWh</th>
            <th>Off-Peak $/kWh</th>
            <th>On-Peak $/kW</th>
            <th>On-Peak $/kWh</th>
            <th>Off-Peak $/kWh</th>
            <th>On-Peak $/kW</th>
            <th>Distribution $/kW</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                value={editedValues.summerCharges.on_peak_kWh}
                onChange={(e) => handleCellChange('summer_on_peak_kWh', Number(e.target.value))}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="number"
                value={editedValues.summerCharges.off_peak_kWh}
                onChange={(e) => handleCellChange('summer_off_peak_kWh', Number(e.target.value))}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="number"
                value={editedValues.summerCharges.on_peak_kW}
                onChange={(e) => handleCellChange('summer_on_peak_kW', Number(e.target.value))}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="number"
                value={editedValues.winterCharges.on_peak_kWh}
                onChange={(e) => handleCellChange('winter_on_peak_kWh', Number(e.target.value))}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="number"
                value={editedValues.winterCharges.off_peak_kWh}
                onChange={(e) => handleCellChange('winter_off_peak_kWh', Number(e.target.value))}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="number"
                value={editedValues.winterCharges.on_peak_kW}
                onChange={(e) => handleCellChange('winter_on_peak_kW', Number(e.target.value))}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="number"
                value={editedValues.distributionCharge}
                onChange={(e) => handleCellChange('distributionCharge', Number(e.target.value))}
                className="input w-full max-w-xs"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DemandChargesTable;