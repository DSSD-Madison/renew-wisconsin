
import React from 'react';

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
}

const DemandChargesTable: React.FC<DemandChargesTableProps> = ({ summerCharges, winterCharges, districtCharge }) => {
return (
    <div className="table">
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
            <th>Dist. $/kW</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{summerCharges.on_peak_kWh}</td>
            <td>{summerCharges.off_peak_kWh}</td>
            <td>{summerCharges.on_peak_kW}</td>
            <td>{winterCharges.on_peak_kWh}</td>
            <td>{winterCharges.off_peak_kWh}</td>
            <td>{winterCharges.on_peak_kW}</td>
            <td>{districtCharge.district_demand_charge}</td>
        </tr>
        </tbody>
    </table>
    </div>
);
};

export default DemandChargesTable;