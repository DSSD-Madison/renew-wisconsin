import React, {useContext} from 'react';
import {DataContext} from "~/contexts/dataContext";
import LoadingSpinner from "~/components/equipment/loading_bar";
import {BusData, BusTable} from "~/components/equipment/busTable";
import {ChargingData, ChargingDataTable} from "~/components/equipment/chargerTable";

export default function Equipment() {
    const context = useContext(DataContext);
    if (context.loading) {
        return <h1><LoadingSpinner /></h1>
    }

    const extractNumericValue = (obj: any, propertyName: string): number | undefined => {
        const value = obj[propertyName];
        if (typeof value === 'number') {
            return value;
        } else if (typeof value === 'string') {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? undefined : numericValue;
        } else {
            return undefined;
        }
    };

    // Function to sort by "Certified Charger Output" numerically
    const createTypedAndSortedChargingData = (chargingData: any[]): ChargingData[] => {
        const typedChargingDataArray: ChargingData[] = chargingData.map((data: any) => new ChargingData(data));

        // Sort by "Certified Charger Output (kW)"
        typedChargingDataArray.sort((a, b) => {
            const aValue = extractNumericValue(a, 'Certified Charger Output (kW)');
            const bValue = extractNumericValue(b, 'Certified Charger Output (kW)');

            if (aValue !== undefined && bValue !== undefined) {
                return aValue - bValue;
            } else {
                return 0; 
            }
        });

        return typedChargingDataArray;
    };

    const typedBusDataArray: BusData[] = context.data.buses.map((data: any) => new BusData(data));
    const typedWinterChargingData: ChargingData[] = context.data.winter_charging.map((data: any) => new ChargingData(data));
    const typedSummerChargingData: ChargingData[] = context.data.summer_charging.map((data: any) => new ChargingData(data));

    return (
        <section className="content-center">
            <br/>
            <br/>
            <br/>
            <h1 className="text-4xl font-bold text-center">Bus Information</h1>
            <div className="p-5">
                <BusTable data={typedBusDataArray} />
            </div>
            <br/>
            <br/>
            <br/>
            <div className="p-5">
            <h1 className="text-4xl font-bold text-center">Charger Statistics</h1>
            <ChargingDataTable data1={typedWinterChargingData} data2={typedSummerChargingData}/>
            </div>
        </section>
    )
}