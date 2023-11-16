import React from 'react';
import {useState, useEffect} from 'react';
import Bus from '../components/Bus';

const BusAccordion = (props: any) => {

    const [winterMonthCost, setWinterMonthCost] = useState(0);
    const [summerMonthCost, setSummerMonthCost] = useState(0);
    const [dieselCost, setDieselCostPerDay] = useState(0);

    const addToWinterMonthCost = (data: number) => {
        const w = Math.round((winterMonthCost+data)*100)/100
        setWinterMonthCost(w)
    }

    const addToSummerMonthCost = (data: number) => {
        const s = Math.round((summerMonthCost+data)*100)/100
        setSummerMonthCost(s)
    }

    const addToDieselDailyCost = (data: number) => {
        const d = Math.round((dieselCost+data)*100)/100
        setDieselCostPerDay(d)
    }
    
    return(
        <div>
            <div className="join join-vertical w-full">
                <Bus id="1" wintercost={addToWinterMonthCost} summercost={addToSummerMonthCost} dieselcost={addToDieselDailyCost}/>
                <Bus id="2" wintercost={addToWinterMonthCost} summercost={addToSummerMonthCost} dieselcost={addToDieselDailyCost}/>
            </div>
            <div className="place-content-stretch">
            <button className="text-blue-700 font-bold">
                Add Bus
              </button>
            </div>
            <div className="m-7">
            <h1 className="text-2xl font-bold">Monthly Costs</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                    <tr>
                        <th></th> 
                        <td className="text-green-500">January</td> 
                        <td className="text-green-500">February</td> 
                        <td className="text-green-500">March</td> 
                        <td className="text-green-500">April</td> 
                        <td className="text-green-500">May</td> 
                        <td>June</td>
                        <td>July</td>
                        <td>August</td>
                        <td className="text-green-500">September</td>
                        <td className="text-green-500">October</td>
                        <td className="text-green-500">November</td>
                        <td className="text-green-500">December</td>
                        <th></th> 
                    </tr>
                    </thead> 
                    <tbody>
                    <tr>
                        <th>Total CSB Cost per Month</th> 
                        <td>${winterMonthCost*22}</td> 
                        <td>${winterMonthCost*22}</td> 
                        <td>${winterMonthCost*22}</td> 
                        <td>${winterMonthCost*22}</td>
                        <td>${winterMonthCost*22}</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>${summerMonthCost*22}</td>
                        <td>${winterMonthCost*22}</td>
                        <td>${winterMonthCost*22}</td>
                        <td>${winterMonthCost*22}</td>
                    </tr>
                    <tr>
                        <th>Total Diesel Cost per Month</th> 
                        <td>${dieselCost*22}</td> 
                        <td>${dieselCost*22}</td> 
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                        <td>${dieselCost*22}</td>
                    </tr>
                    <tr>
                        <th>Total Monthly Savings</th> 
                        <td>Cy Ganderton</td> 
                        <td>Quality Control Specialist</td> 
                        <td>Littel, Schaden and Vandervort</td> 
                        <td>Canada</td> 
                        <td>12/16/2020</td> 
                        <td>Blue</td>
                        <th>1</th> 
                    </tr>
                    </tbody> 
                </table>
            </div>
            </div>
            <div className="m-7">
                <h1 className="text-2xl font-bold">Annual Costs</h1>
                <h1>Annual CSB Cost: </h1>
                <h1>Annual Diesel Cost: </h1>
                <h1>Annual Savings: </h1>
            </div>
        </div>
    );
}

export default BusAccordion;