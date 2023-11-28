import React from "react";

interface BusTableProps {
    data: BusData[];
}

export const BusTable: React.FC<BusTableProps> = ({data}) => {
    return (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className="py-2 px-4">Model</th>
                <th className="py-2 px-4">Company</th>
                <th className="py-2 px-4">Passenger Capacity</th>
                <th className="py-2 px-4">GVWR</th>
                <th className="py-2 px-4">Price Low</th>
                <th className="py-2 px-4">Price High</th>
                <th className="py-2 px-4">Charging Type</th>
                <th className="py-2 px-4">Charging Port</th>
                <th className="py-2 px-4">Maximum Range</th>
                <th className="py-2 px-4">Bidirectional Charging</th>
                <th className="py-2 px-4">Maximum Charge Capacity</th>
            </tr>
            </thead>
            <tbody className="text-gray-800">
            {data.map((busData, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-4">{busData.model}</td>
                    <td className="py-2 px-4">{busData.company}</td>
                    <td className="py-2 px-4">{busData.maximum_passenger_capacity === -1 ? 'UNKNOWN' : busData.maximum_passenger_capacity}</td>
                    <td className="py-2 px-4">{busData.gvwr === -1 ? 'UNKNOWN' : busData.gvwr}</td>
                    <td className="py-2 px-4">{busData.price_low === -1 ? 'UNKNOWN' : busData.price_low}</td>
                    <td className="py-2 px-4">{busData.price_high === -1 ? 'UNKNOWN' : busData.price_high}</td>
                    <td className="py-2 px-4">{busData.charging_type}</td>
                    <td className="py-2 px-4">{busData.charging_port}</td>
                    <td className="py-2 px-4">{busData.maximum_range}</td>
                    <td className="py-2 px-4">{busData.bidirectional_charging.toString()}</td>
                    <td className="py-2 px-4">{busData.maximum_charge_capacity}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export class BusData {
    maximum_passenger_capacity: number = -1;
    model: string = "";
    maximum_range: number = -1;
    charging_port: string = "";
    bidirectional_charging: boolean = false;
    company: string = "";
    gvwr: number = -1;
    price_low: number = -1;
    price_high: number = -1;
    charging_type: string = "";
    maximum_charge_capacity: number = -1;

    constructor(data: Partial<BusData>) {
        Object.assign(this, data);
    }
}