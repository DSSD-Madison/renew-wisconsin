import React, { useState } from 'react';

export interface SummerWinterCharges {
  on_peak_kWh?: number;
  off_peak_kWh?: number;
  on_peak_kW?: number;
}

export interface DistrictDemandCharge {
  district_demand_charge: number;
}

interface DemandChargesTableProps {
  summerCharges: SummerWinterCharges;
  winterCharges: SummerWinterCharges;
  districtCharge: DistrictDemandCharge;
  onValueChange: (key: string, value: number) => void;
}

const DemandChargesTable: React.FC<DemandChargesTableProps> = ({
  summerCharges,
  winterCharges,
  districtCharge,
  onValueChange,
}) => {
  const [editedValues, setEditedValues] = useState({
    summerCharges,
    winterCharges,
    districtCharge: districtCharge.district_demand_charge,
  });

  const handleCellChange = (key: string, value: string) => {
    const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    const clampedValue = isNaN(parsedValue) ? 0 : parsedValue;

    if (key === 'districtCharge') {
      setEditedValues((prevState) => ({
        ...prevState,
        districtCharge: clampedValue,
      }));
      onValueChange('districtCharge', clampedValue);
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
            <th>Dist. $/kW</th>
            <th>On-Peak $/kWh</th>
            <th>Off-Peak $/kWh</th>
            <th>On-Peak $/kW</th>
            <th>Dist. $/kW</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={editedValues.summerCharges.on_peak_kWh}
                onChange={(e) => handleCellChange('summer_on_peak_kWh', e.target.value)}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="text"
                value={editedValues.summerCharges.off_peak_kWh}
                onChange={(e) => handleCellChange('summer_off_peak_kWh', e.target.value)}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="text"
                value={editedValues.summerCharges.on_peak_kW}
                onChange={(e) => handleCellChange('summer_on_peak_kW', e.target.value)}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="text"
                value={editedValues.winterCharges.on_peak_kWh}
                onChange={(e) => handleCellChange('winter_on_peak_kWh', e.target.value)}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="text"
                value={editedValues.winterCharges.off_peak_kWh}
                onChange={(e) => handleCellChange('winter_off_peak_kWh', e.target.value)}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="text"
                value={editedValues.winterCharges.on_peak_kW}
                onChange={(e) => handleCellChange('winter_on_peak_kW', e.target.value)}
                className="input w-full max-w-xs"
              />
            </td>
            <td>
              <input
                type="text"
                value={editedValues.districtCharge}
                onChange={(e) => handleCellChange('districtCharge', e.target.value)}
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