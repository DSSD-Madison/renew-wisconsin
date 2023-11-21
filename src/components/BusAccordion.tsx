import React from 'react';
import {useState, useEffect} from 'react';
import Bus from '../components/Bus';

const BusAccordion = (props: any) => {

    const [winterDailyCost, setWinterDailyCost] = useState(0);
    const [summerDailyCost, setSummerDailyCost] = useState(0);
    const [winterMonthCost, setWinterMonthCost] = useState(0);
    const [summerMonthCost, setSummerMonthCost] = useState(0);
    const [dieselCost, setDieselCostPerDay] = useState(0);
    const [dieselMonthCost, setDieselCostPerMonth] = useState(0);
    const [maxkWPerMonth, setMaxkWPerMonth] = useState(0);
    const monthDailyCosts = [winterDailyCost,winterDailyCost,winterDailyCost,winterDailyCost,winterDailyCost,0,0,0,summerDailyCost,winterDailyCost,winterDailyCost,winterDailyCost]
    const kWhPerDayCost = monthDailyCosts.map((cost, index)=>
    <td key={index} className="text-base">${cost}</td>)
    var districtDemandCharges = [0,0,0,0,0,0,0,0,0,0,0,0]
    var csbCostPerMonths = [winterMonthCost,winterMonthCost,winterMonthCost,winterMonthCost,winterMonthCost,0,0,0,summerMonthCost,winterMonthCost,winterMonthCost,winterMonthCost]
    if(maxkWPerMonth > 25){
        districtDemandCharges = [maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50,maxkWPerMonth*3.50]
        csbCostPerMonths = [(maxkWPerMonth*3.50)+winterMonthCost,(maxkWPerMonth*3.50)+winterMonthCost,(maxkWPerMonth*3.50)+winterMonthCost,(maxkWPerMonth*3.50)+winterMonthCost,(maxkWPerMonth*3.50)+winterMonthCost,(maxkWPerMonth*3.50)+0,(maxkWPerMonth*3.50)+0,(maxkWPerMonth*3.50)+0,(maxkWPerMonth*3.50)+summerMonthCost,(maxkWPerMonth*3.50)+winterMonthCost,(maxkWPerMonth*3.50)+winterMonthCost,(maxkWPerMonth*3.50)+winterMonthCost]
    }
    const districtDemandCharge = districtDemandCharges.map((charge, index)=>
    <td key={index} className="text-base">${charge}</td>)
    const csbCostPerMonth = csbCostPerMonths.map((csbCost, index)=>
    <td key={index} className="text-base">${csbCost}</td>)
    const dieselCosts = [dieselMonthCost,dieselMonthCost,dieselMonthCost,dieselMonthCost,dieselMonthCost,0,0,0,dieselMonthCost,dieselMonthCost,dieselMonthCost,dieselMonthCost]
    const dieselCostPerMonth = dieselCosts.map((cost, index)=>
    <td key={index} className="text-base">${cost}</td>)
    const savings = [dieselMonthCost-winterMonthCost,dieselMonthCost-winterMonthCost,dieselMonthCost-winterMonthCost,dieselMonthCost-winterMonthCost,dieselMonthCost-winterMonthCost,0-summerMonthCost,0-summerMonthCost,0-summerMonthCost,dieselMonthCost-summerMonthCost,dieselMonthCost-winterMonthCost,dieselMonthCost-winterMonthCost,dieselMonthCost-winterMonthCost]
    const monthlySavings = dieselCosts.map((save, index)=>
    <td key={index} className="text-base">${save}</td>)

    const addToMaxkWPerMonth = (data: number) => {
        const k = Math.round((maxkWPerMonth+data)*100)/100
        setMaxkWPerMonth(k)
    }

    const addToWinterDailyCost = (data: number) => {
        const w = Math.round((winterDailyCost+data)*100)/100;
        setWinterDailyCost(w);
        setWinterMonthCost(Math.round((w*22)*100)/100);
    }

    const addToSummerDailyCost = (data: number) => {
        const s = Math.round((summerDailyCost+data)*100)/100;
        setSummerDailyCost(s);
        setSummerMonthCost(Math.round((s*22)*100)/100);
    }

    const addToDieselDailyCost = (data: number) => {
        const d = Math.round((dieselCost+data)*100)/100
        setDieselCostPerDay(d)
        setDieselCostPerMonth(Math.round((d*22)*100)/100)
    }
    
    return(
        <div>
            <div className="join join-vertical w-full">
                <Bus id="1" wintercost={addToWinterDailyCost} summercost={addToSummerDailyCost} dieselcost={addToDieselDailyCost} kWPerMonth={addToMaxkWPerMonth}/>
                <Bus id="2" wintercost={addToWinterDailyCost} summercost={addToSummerDailyCost} dieselcost={addToDieselDailyCost} kWPerMonth={addToMaxkWPerMonth}/>
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
                        <td className="text-green-500 text-base">January</td> 
                        <td className="text-green-500 text-base">February</td> 
                        <td className="text-green-500 text-base">March</td> 
                        <td className="text-green-500 text-base">April</td> 
                        <td className="text-green-500 text-base">May</td> 
                        <td className="text-base">June</td>
                        <td className="text-base">July</td>
                        <td className="text-base">August</td>
                        <td className="text-green-500 text-base">September</td>
                        <td className="text-green-500 text-base">October</td>
                        <td className="text-green-500 text-base">November</td>
                        <td className="text-green-500 text-base">December</td>
                        <th></th> 
                    </tr>
                    </thead> 
                    <tbody>
                    <tr>
                        <th className="text-base font-normal">$/kWh per Day</th> 
                        {kWhPerDayCost}
                    </tr>
                    <tr>
                        <th className="text-base font-normal">District Demand Charge per Month</th>
                        {districtDemandCharge}
                    </tr>
                    <tr>
                        <th className="text-base font-normal">Total CSB Cost per Month</th> 
                        {csbCostPerMonth}
                    </tr>
                    <tr>
                        <th className="text-base font-normal">Total Diesel Cost per Month</th> 
                        {dieselCostPerMonth}
                    </tr>
                    <tr>
                        <th className="text-base font-normal">Total Monthly Savings</th> 
                        {monthlySavings}
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