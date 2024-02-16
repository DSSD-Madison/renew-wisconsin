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