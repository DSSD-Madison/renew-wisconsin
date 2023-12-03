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
    const [distdemandCharge, setDistDemandCharge] = useState(0);
    const [distDemandCharges, setDistDemandCharges] = useState<any[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [onPeakkWPerMonth, setOnPeakkWPerMonth] = useState(0);
    const [onPeakDemandChargeWinter, setOnPeakDemandChargeWinter] = useState(0);
    const [onPeakDemandChargeSummer, setOnPeakDemandChargeSummer] = useState(0);
    const [onPeakDemandCharges, setOnPeakDemandCharges] = useState<any[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [csbCostPerMonths, setCSBCostPerMonths] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [totalCSBSummer, setTotalCSBSummer] = useState(0);
    const [totalCSBWinter, setTotalCSBWinter] = useState(0);
    const [dieselCosts, setDieselCosts] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [savings, setSavings] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [annualCSBCost, setAnnualCSBCost] = useState(0);
    const [annualDieselCost, setAnnualDieselCost] = useState(0);
    const [annualSavings, setAnnualSavings] = useState(0);
    //Dealing with Bus Accordion
    const busList = [
        {
            id: "1",
            kWPerMonth: 0,
            onPeakkWPerMonth: 0,
            summerCost: 0,
            winterCost: 0,
            dieselCost: 0
        }
    ];
    const [list, setList] = useState(busList);
    const [busCount, setBusCount] = useState(1);

    const monthDailyCosts = [winterDailyCost,winterDailyCost,winterDailyCost,winterDailyCost,winterDailyCost,0,0,0,summerDailyCost,winterDailyCost,winterDailyCost,winterDailyCost]
    const kWhPerDayCost = monthDailyCosts.map((cost, index)=>
    <td key={index} className="text-sm">${cost}</td>)
    const onPeakDemand = onPeakDemandCharges.map((charge, index)=>
    <td key={index} className="text-sm">${charge}</td>)
    const distDemandCharge = distDemandCharges.map((charge, index)=>
    <td key={index} className="text-sm">${charge}</td>)
    const csbCostPerMonth = csbCostPerMonths.map((csbCost, index)=>
    <td key={index} className="text-sm">${csbCost}</td>)
    const dieselCostPerMonth = dieselCosts.map((cost, index)=>
    <td key={index} className="text-sm">${cost}</td>)
    const monthlySavings = savings.map((save, index)=>
    <td key={index} className="text-sm">${save}</td>)

    // Values from Bus components used for cost summary
    const addToMaxkWPerMonth = (id: number, newVal: number) => {
        let index = id - 1;
        if(index >= 0 && index < list.length){
            list[index].kWPerMonth = newVal;
            setList(list);
        }
        const max = list.reduce((prev, current) => (prev && prev.kWPerMonth > current.kWPerMonth) ? prev : current)
        setMaxkWPerMonth(max.kWPerMonth);
    }

    const addToOnPeakkWPerMonth = (data: number, id: number, newVal: number) => {
        const op = Math.round((onPeakkWPerMonth+data)*100)/100;
        setOnPeakkWPerMonth(op);
        let index = id - 1;
        if(index >= 0 && index < list.length){
            list[index].kWPerMonth = newVal;
            setList(list);
        }
        let opWinter = 0;
        let opSummer = 0;
        if(op > 25){
            opWinter = Math.round((op*11)*100)/100;
            opSummer = Math.round((op*13)*100)/100;
            setOnPeakDemandChargeWinter(opWinter);
            setOnPeakDemandChargeSummer(opSummer);
        }
        else{
            setOnPeakDemandChargeSummer(0);
            setOnPeakDemandChargeWinter(0);
        }
        setOnPeakDemandCharges([opWinter,opWinter,opWinter,opWinter,opWinter,0,0,0,opSummer,opWinter,opWinter,opWinter]);
    }

    const addToWinterDailyCost = (data: number, id: number, newVal: number) => {
        const w = Math.round((winterDailyCost+data)*100)/100;
        setWinterDailyCost(w);
        setWinterMonthCost(Math.round((w*22)*100)/100);
        let index = id - 1;
        if(index >= 0 && index < list.length){
            list[index].winterCost = newVal;
            setList(list);
        }
    }

    const addToSummerDailyCost = (data: number, id: number, newVal: number) => {
        const s = Math.round((summerDailyCost+data)*100)/100;
        setSummerDailyCost(s);
        setSummerMonthCost(Math.round((s*22)*100)/100);
        let index = id - 1;
        if(index >= 0 && index < list.length){
            list[index].summerCost = newVal;
            setList(list);
        }
    }

    const addToDieselDailyCost = (data: number, id: number, newVal: number) => {
        const d = Math.round((dieselCost+data)*100)/100;
        setDieselCostPerDay(d);
        const dieselCostPerMonth = Math.round((d*22)*100)/100;
        setDieselCostPerMonth(dieselCostPerMonth);
        setDieselCosts([dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,0,0,0,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth,dieselCostPerMonth]);
        const sumAnnualDieselCost = Math.round(dieselCostPerMonth*9*100)/100;
        setAnnualDieselCost(sumAnnualDieselCost);
        let index = id - 1;
        if(index >= 0 && index < list.length){
            list[index].dieselCost = newVal;
            setList(list);
        }
    }

    // Calculation for cost summary
    useEffect(() => {
        calculateDistDemandCharge();
    },[maxkWPerMonth])

    const calculateDistDemandCharge = () => {
        if(maxkWPerMonth > 25){
            const demandCharge = Math.round(3.5*maxkWPerMonth*100)/100;
            //console.log(maxkWPerMonth)
            setDistDemandCharges([demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge,demandCharge]);
            setDistDemandCharge(demandCharge);
        }
        else{
            setDistDemandCharges([0,0,0,0,0,0,0,0,0,0,0,0]);
            setDistDemandCharge(0);
        }
    }

    useEffect(() => {
        calculateCSBCostPerMonth();
    },[maxkWPerMonth, winterMonthCost, summerMonthCost, distdemandCharge])

    const calculateCSBCostPerMonth = () => {
        const totalCSBWinter = Math.round((onPeakDemandChargeWinter+distdemandCharge+winterMonthCost)*100)/100;
        const totalCSBSummer = Math.round((onPeakDemandChargeSummer+distdemandCharge+summerMonthCost)*100)/100;
        setCSBCostPerMonths([totalCSBWinter,totalCSBWinter,totalCSBWinter,totalCSBWinter,totalCSBWinter,distdemandCharge,distdemandCharge,distdemandCharge,totalCSBSummer,totalCSBWinter,totalCSBWinter,totalCSBWinter]);
        setTotalCSBSummer(totalCSBSummer);
        setTotalCSBWinter(totalCSBWinter);
        const sumAnnualCSBCost = Math.round(((totalCSBWinter*8)+totalCSBSummer+(distdemandCharge*3))*100)/100;
        setAnnualCSBCost(sumAnnualCSBCost);
    }

    useEffect(() => {
        calculateSavings();
    },[dieselMonthCost,totalCSBSummer,totalCSBWinter])

    const calculateSavings = () => {
        const savingsWinter = Math.round((dieselMonthCost-totalCSBWinter)*100)/100;
        const savingsSummer = Math.round((dieselMonthCost-totalCSBSummer)*100)/100;
        const nonOperating = Math.round((0-distdemandCharge)*100)/100;
        setSavings([savingsWinter,savingsWinter,savingsWinter,savingsWinter,savingsWinter,nonOperating,nonOperating,nonOperating,savingsSummer,savingsWinter,savingsWinter,savingsWinter]);
        setAnnualSavings(Math.round(((savingsWinter*8)+savingsSummer+(nonOperating*3))*100)/100)
    }

    const addBus = () => {
        let nextId = String(busCount+1);
        setBusCount(busCount+1);
        setList(list.concat({id: nextId, kWPerMonth: 0, onPeakkWPerMonth: 0, summerCost: 0, winterCost: 0, dieselCost: 0}));
    }

    const deleteBus = () => {
        if(busCount > 1){
            let length = list.length;
            //let removekWPerMonth = list[length-1].kWPerMonth;
            let removeWinter = list[length-1].winterCost;
            let removeSummer = list[length-1].summerCost;
            let removeDiesel = list[length-1].dieselCost;
            //addToMaxkWPerMonth(-1*removekWPerMonth,length,removekWPerMonth);
            addToWinterDailyCost(-1*removeWinter,length,removeWinter);
            addToSummerDailyCost(-1*removeSummer,length,removeSummer);
            addToDieselDailyCost(-1*removeDiesel,length,removeDiesel);
            setBusCount(busCount-1);
            setList(list.slice(0,length-1));
            const max = list.slice(0,length-1).reduce((prev, current) => (prev && prev.kWPerMonth > current.kWPerMonth) ? prev : current)
            setMaxkWPerMonth(max.kWPerMonth);
        }
    }

    return(
        <div>
            <div className="join join-vertical w-full">
            {list.map(bus => {
                return (
                    <Bus key={bus.id} id={bus.id} wintercost={addToWinterDailyCost} summercost={addToSummerDailyCost} dieselcost={addToDieselDailyCost} kWPerMonth={addToMaxkWPerMonth} onPeakDemand={addToOnPeakkWPerMonth}/>
                )
            })}
            </div>
            <div className="relative">
                <button className="bg-green-600 text-white p-2 m-1 rounded-md" onClick={addBus}>
                    Add Bus
                </button>
                <button className={busCount>1 ? "bg-red-700 text-white p-2 m-1 rounded-md" : "hidden"} onClick={deleteBus}>
                    Delete Bus {busCount}
                </button>
            </div>
            <div className="m-7">
            <h1 className="text-2xl font-bold">Monthly Costs</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                    <tr>
                        <th></th> 
                        <td className="text-green-600 text-base">January</td> 
                        <td className="text-green-600 text-base">February</td> 
                        <td className="text-green-600 text-base">March</td> 
                        <td className="text-green-600 text-base">April</td> 
                        <td className="text-green-600 text-base">May</td> 
                        <td className="text-red-700 text-base">June</td>
                        <td className="text-red-700 text-base">July</td>
                        <td className="text-red-700 text-base">August</td>
                        <td className="text-green-600 text-base">September</td>
                        <td className="text-green-600 text-base">October</td>
                        <td className="text-green-600 text-base">November</td>
                        <td className="text-green-600 text-base">December</td>
                        <th></th> 
                    </tr>
                    </thead> 
                    <tbody>
                    <tr>
                        <th className="text-sm font-normal">$/kWh per Day</th> 
                        {kWhPerDayCost}
                    </tr>
                    <tr>
                        <th className="text-sm font-normal">On-Peak Demand Charge per Month</th> 
                        {onPeakDemand}
                    </tr>
                    <tr>
                        <th className="text-sm font-normal">Distribution Demand Charge per Month</th>
                        {distDemandCharge}
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