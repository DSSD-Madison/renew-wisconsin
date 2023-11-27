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
    const [demandCharge, setDemandCharge] = useState(0);
    const [districtDemandCharges, setDistrictDemandCharges] = useState<any[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [csbCostPerMonths, setCSBCostPerMonths] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [totalCSBSummer, setTotalCSBSummer] = useState(0);
    const [totalCSBWinter, setTotalCSBWinter] = useState(0);
    const [dieselCosts, setDieselCosts] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [savings, setSavings] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [annualCSBCost, setAnnualCSBCost] = useState(0);
    const [annualDieselCost, setAnnualDieselCost] = useState(0);
    const [annualSavings, setAnnualSavings] = useState(0);

    const monthDailyCosts = [winterDailyCost,winterDailyCost,winterDailyCost,winterDailyCost,winterDailyCost,0,0,0,summerDailyCost,winterDailyCost,winterDailyCost,winterDailyCost]
    const kWhPerDayCost = monthDailyCosts.map((cost, index)=>
    <td key={index} className="text-sm">${cost}</td>)
    const districtDemandCharge = districtDemandCharges.map((charge, index)=>
    <td key={index} className="text-sm">${charge}</td>)
    const csbCostPerMonth = csbCostPerMonths.map((csbCost, index)=>
    <td key={index} className="text-sm">${csbCost}</td>)
    const dieselCostPerMonth = dieselCosts.map((cost, index)=>
    <td key={index} className="text-sm">${cost}</td>)
    const monthlySavings = savings.map((save, index)=>
    <td key={index} className="text-sm">${save}</td>)

    const addToMaxkWPerMonth = (data: number) => {
        const k = Math.round((maxkWPerMonth+data)*100)/100;
        setMaxkWPerMonth(k);
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
        const d = Math.round((dieselCost+data)*100)/100;
        setDieselCostPerDay(d);
        const dieselCostPerMonth = Math.round((d*22)*100)/100 
        setDieselCostPerMonth(dieselCostPerMonth);
        setDieselCosts([dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,0,0,0,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth]);
        const sumAnnualDieselCost = Math.round(dieselCostPerMonth*9*100)/100;
        setAnnualDieselCost(sumAnnualDieselCost);
    }

    useEffect(() => {
        calculateDistrictDemandCharge();
    },[maxkWPerMonth])

    const calculateDistrictDemandCharge = () => {
        if(maxkWPerMonth > 25){
            const demandCharge = Math.round(3.5*maxkWPerMonth*100)/100;
            setDistrictDemandCharges([demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge])
            setDemandCharge(demandCharge);
        }
        else{
            setDistrictDemandCharges([0,0,0,0,0,0,0,0,0,0,0,0]);
            setDemandCharge(0);
        }
    }

    useEffect(() => {
        calculateCSBCostPerMonth();
    },[maxkWPerMonth, winterMonthCost, summerMonthCost, demandCharge])

    const calculateCSBCostPerMonth = () => {
        const totalCSBWinter = Math.round((demandCharge+winterMonthCost)*100)/100;
        const totalCSBSummer = Math.round((demandCharge+summerMonthCost)*100)/100;
        setCSBCostPerMonths([totalCSBWinter,totalCSBWinter,totalCSBWinter,totalCSBWinter,totalCSBWinter,demandCharge,demandCharge,demandCharge,totalCSBSummer,totalCSBWinter,totalCSBWinter,totalCSBWinter]);
        setTotalCSBSummer(totalCSBSummer);
        setTotalCSBWinter(totalCSBWinter);
        const sumAnnualCSBCost = Math.round(((totalCSBWinter*8)+totalCSBSummer+(demandCharge*3))*100)/100;
        setAnnualCSBCost(sumAnnualCSBCost);
    }

    useEffect(() => {
        calculateSavings();
    },[dieselMonthCost,totalCSBSummer,totalCSBWinter])

    const calculateSavings = () => {
        const savingsWinter = Math.round((dieselMonthCost-totalCSBWinter)*100)/100;
        const savingsSummer = Math.round((dieselMonthCost-totalCSBSummer)*100)/100;
        const nonOperating = Math.round((0-totalCSBSummer)*100)/100;
        setSavings([savingsWinter,savingsWinter,savingsWinter,savingsWinter,savingsWinter,nonOperating,nonOperating,nonOperating,savingsSummer,savingsWinter,savingsWinter,savingsWinter]);
        setAnnualSavings(Math.round(((savingsWinter*8)+savingsSummer+(nonOperating*3))*100)/100)
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
                        <th className="text-sm font-normal">$/kWh per Day</th> 
                        {kWhPerDayCost}
                    </tr>
                    <tr>
                        <th className="text-sm font-normal">District Demand Charge per Month</th>
                        {districtDemandCharge}
                    </tr>
                    <tr>
                        <th className="text-sm font-normal">Total CSB Cost per Month</th> 
                        {csbCostPerMonth}
                    </tr>
                    <tr>
                        <th className="text-sm font-normal">Total Diesel Cost per Month</th> 
                        {dieselCostPerMonth}
                    </tr>
                    <tr>
                        <th className="text-sm font-normal">Total Monthly Savings</th> 
                        {monthlySavings}
                    </tr>
                    </tbody> 
                </table>
            </div>
            </div>
            <div className="m-7">
                <h1 className="text-2xl font-bold">Annual Costs</h1>
                <h1>Annual CSB Cost: ${annualCSBCost}</h1>
                <h1>Annual Diesel Cost: ${annualDieselCost}</h1>
                <h1>Annual Savings: ${annualSavings}</h1>
            </div>
        </div>
    );
}

export default BusAccordion;