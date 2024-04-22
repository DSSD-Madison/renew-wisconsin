import React, {useContext, useState} from "react";
import { DataContext } from "~/contexts/dataContext";

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

export const ChargingDataTable = () => {
    const context = useContext(DataContext);
    const [activeDataset, setActiveDataset] = useState(1);
    const handleTabClick = (datasetNumber: number) => {
        setActiveDataset(datasetNumber);
    };

    const chargerData = context.data.summer_charging;
    const chargerStrings: string[] = [];
    for (let i = 0; i < chargerData.length; i++) {
      chargerStrings.push(chargerData[i]["Certified Charger Output (kW)"]);
    }
    chargerStrings.sort((a,b) => parseFloat(a) - parseFloat(b));
    const chargers: number[] = chargerStrings.map(str => Number(str));
    const busData = context.data.buses;
    console.log(busData)
    let models: string[] = [];
    let capacities: number[] = [];
    for(let i = 0; i < busData.length; i++){
        models.push(busData[i]["model"]);
        capacities.push(Number(busData[i]["maximum_charge_capacity"]));
    }

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
            <div className="overflow-x-scroll text-xs md:text-sm">
            <table
                className="w-full table-auto border-collapse bg-white border border-gray-200 shadow-md rounded-md z-10 relative">
                <thead className="bg-gray-100 text-gray-700">
                <tr>
                    <th className="py-2 px-4 sticky left-0 h-fit">Model</th>
                    {chargerStrings.map((charger, index) => (
                        <th key={index} className="py-2 px-4">{charger}<span className="font-normal"> kW</span></th>
                    ))}
                </tr>
                </thead>
                <tbody className="text-gray-800">
                {capacities.map((capacity, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td key={index} className={index % 2 === 0 ? 'bg-gray-50 py-2 px-4 sticky left-0 h-fit' : 'bg-white py-2 px-4 sticky left-0 h-fit'}>
                            {models[index]}</td>
                            {activeDataset === 1 ? chargers.map((charger,index) => (
                                <td key={index} className="py-2 px-4">
                                    {Math.round((capacity / (charger * 0.82)) * 100) / 100}
                                </td>
                            )) :
                            chargers.map((charger,index) => (
                                <td key={index} className="py-2 px-4">
                                    {Math.round(capacity / charger * 100) / 100}
                                </td>
                            ))
                            }
                                </tr>
                            ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};
