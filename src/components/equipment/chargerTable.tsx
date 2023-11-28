import React, {useState} from "react";

export class ChargingData {
    public "All American RE Electric": number = -1
    public "Certified Charger Output (kW)": number = -1
    public "Electric CE Series 1": number = -1
    public "Electric CE Series 2": number = -1
    public "Level": number = -1
    public "LionC": number = -1
    public "Saf-Tliner® C2 Jouley®": number = -1
    public "Vision Electric": number = -1

    constructor(data: any) {
        this["All American RE Electric"] = data["All American RE Electric"];
        this["Certified Charger Output (kW)"] = data["Certified Charger Output (kW)"];
        this["Electric CE Series 1"] = data["Electric CE Series 1"];
        this["Electric CE Series 2"] = data["Electric CE Series 2"];
        this["Level"] = data["Level"];
        this["LionC"] = data["LionC"];
        this["Saf-Tliner® C2 Jouley®"] = data["Saf-Tliner® C2 Jouley®"];
        this["Vision Electric"] = data["Vision Electric"];
    }
}

class ChargerTableProps {
    // @ts-ignore
    data1: ChargingData[];
    // @ts-ignore
    data2: ChargingData[];
}

export const ChargingDataTable: React.FC<ChargerTableProps> = ({data1, data2}) => {
    const [activeDataset, setActiveDataset] = useState(1);

    const handleTabClick = (datasetNumber: number) => {
        setActiveDataset(datasetNumber);
    };

    const activeData = activeDataset === 1 ? data1 : data2;

    return (
        <div>
            <div className={'top-1.5 relative z-0'}>
                <button
                    className={`mr-2 px-5 py-2.5 rounded-md ${activeDataset === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleTabClick(1)}
                >
                    Winter
                </button>
                <button
                    className={`px-5 py-2.5 rounded-md ${activeDataset === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleTabClick(2)}
                >
                    Summer
                </button>
            </div>
            <table
                className="min-w-full bg-white border border-gray-200 shadow-md rounded-md overflow-hidden z-10 relative">
                <thead className="bg-gray-100 text-gray-700">
                <tr>
                    <th className="py-2 px-4">Charger Output (kW)</th>
                    <th className="py-2 px-4">All American RE Electric</th>
                    <th className="py-2 px-4">Electric CE Series 1</th>
                    <th className="py-2 px-4">Electric CE Series 2</th>
                    <th className="py-2 px-4">Level</th>
                    <th className="py-2 px-4">LionC</th>
                    <th className="py-2 px-4">Saf-Tliner® C2 Jouley®</th>
                    <th className="py-2 px-4">Vision Electric</th>
                </tr>
                </thead>
                <tbody className="text-gray-800">
                {activeData.map((chargingData, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4">{chargingData["Certified Charger Output (kW)"]}</td>
                        <td className="py-2 px-4">{chargingData["All American RE Electric"]}</td>
                        <td className="py-2 px-4">{chargingData["Electric CE Series 1"]}</td>
                        <td className="py-2 px-4">{chargingData["Electric CE Series 2"]}</td>
                        <td className="py-2 px-4">{chargingData["Level"]}</td>
                        <td className="py-2 px-4">{chargingData["LionC"]}</td>
                        <td className="py-2 px-4">{chargingData["Saf-Tliner® C2 Jouley®"]}</td>
                        <td className="py-2 px-4">{chargingData["Vision Electric"]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};