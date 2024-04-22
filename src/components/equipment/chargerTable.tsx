import React, {useContext, useState} from "react";
import { DataContext } from "~/contexts/dataContext";

const formatDecimalToTime = (hrs : number) => {
    let decimal = hrs % 1;
    let hr = Math.round(hrs);
    let mins = decimal*60;
    let minString = mins.toString().split('.')[0];
    if(hr == 0){
        return minString + " mins"
    }
    if(minString.length === 1){
        minString = "0" + minString;
    }
    return hr.toString() + ":" + minString;
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
                                    {formatDecimalToTime((Math.round((capacity / (charger * 0.82)) * 100) / 100))}
                                </td>
                            )) :
                            chargers.map((charger,index) => (
                                <td key={index} className="py-2 px-4">
                                    {formatDecimalToTime((Math.round(capacity / charger * 100) / 100))}
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
