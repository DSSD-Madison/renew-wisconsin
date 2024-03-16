import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { DataContext } from "../contexts/dataContext";
import Bus from '../components/Bus';
import useLocalStorage from '~/hooks/useLocalStorage';


const BusAccordion = (props: any) => {

    const context = useContext(DataContext);
    const {buses, addBusLocal, deleteLastBusLocal} = useLocalStorage();
    const [busCount, setBusCount] = useState(Object.keys(buses).length);

    if (context.loading) {
        return <></>;
    }

    const monthsData = context.data.operation_schedule[0];

    const sortedMonths = Object.keys(monthsData).sort((a, b) => {
        const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });

    //Dealing with Bus Accordion

    // Values from Bus components used for cost summary
    const addBus = () => {
        addBusLocal();
        setBusCount(busCount+1);
    }

    const deleteBus = () => {
        if(busCount > 1){
            deleteLastBusLocal();
            setBusCount(busCount-1);
        }
    }

    return(
        <div>
            <div className="join join-vertical w-full">
                {Object.values(buses).map(bus => {
                    return (
                        <Bus key={bus.id} id={bus.id}/>
                    )
                })}
            </div>
            <div className="relative">
                <button className="bg-[#3b9044] text-white p-2 m-1 rounded-md" onClick={addBus}>
                    Add Bus
                </button>
                <button className={busCount>1 ? "bg-red-700 text-white p-2 m-1 rounded-md" : "hidden"} onClick={deleteBus}>
                    Delete Bus {busCount}
                </button>
            </div>
            <div className="m-7">
                <h1 className="text-2xl font-bold">Monthly Cost</h1>
                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                {sortedMonths.map((month, index) => (
                                    <td key={index} className={monthsData[month] ? 'text-[#3b9044] text-base' : 'text-red-700 text-base'}>{month}</td>
                                ))}
                            </tr>
                        </thead>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default BusAccordion;