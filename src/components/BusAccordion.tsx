import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { DataContext } from "../contexts/dataContext";
import Bus from '../components/Bus';
import useLocalStorage from '~/hooks/useLocalStorage';


const BusAccordion = (props: any) => {

    const context = useContext(DataContext);
    const {buses, summary, addBusLocal, deleteLastBusLocal, updateDailyCost, updateOnPeakkWH, updateDieselCost, updateTotalCosts} = useLocalStorage();
    const [busCount, setBusCount] = useState(Object.keys(buses).length);
    const [winterDailyCost, setWinterDailyCost] = useState(summary.winterDailyCost);
    const [summerDailyCost, setSummerDailyCost] = useState(summary.summerDailyCost);
    const [winterMonthCost, setWinterMonthCost] = useState(summary.winterMonthCost);
    const [summerMonthCost, setSummerMonthCost] = useState(summary.summerMonthCost);
    const [maxChargerPower, setMaxChargerPower] = useState(summary.maxChargerPower);
    const [onPeakkWPerMonth, setOnPeakkWPerMonth] = useState(summary.onPeakkWPerMonth);
    const [onPeakDemandChargeWinter, setOnPeakDemandChargeWinter] = useState(summary.onPeakDemandChargeWinter);
    const [onPeakDemandChargeSummer, setOnPeakDemandChargeSummer] = useState(summary.onPeakDemandChargeSummer);
    const [dieselCost, setDieselCostPerDay] = useState(summary.dieselCost);
    const [dieselMonthCost, setDieselCostPerMonth] = useState(summary.dieselMonthCost);
    const [annualDieselCost, setAnnualDieselCost] = useState(summary.annualDieselCost);
    const [distDemandCharge, setDistDemandCharge] = useState(summary.distDemandCharge);
    const [totalCSBSummer, setTotalCSBSummer] = useState(summary.summerMonthCost);
    const [totalCSBWinter, setTotalCSBWinter] = useState(summary.winterMonthCost);
    const [annualCSBCost, setAnnualCSBCost] = useState(summary.annualCSBCost);
    const [valsInitialized, setValsInitialized] = useState(false);

    useEffect(() => {
        calculateDistDemandCharge();
    },[maxChargerPower]);

    useEffect(() => {
        calculateCSBCostPerMonth();
    },[maxChargerPower, winterMonthCost, summerMonthCost, distDemandCharge]);
    
    useEffect(() => {
        updateDailyCost(winterDailyCost, winterMonthCost, summerDailyCost, summerMonthCost);
    }, [winterDailyCost, winterMonthCost, summerDailyCost, summerMonthCost])

    useEffect(() => {
        updateOnPeakkWH(onPeakkWPerMonth, onPeakDemandChargeWinter, onPeakDemandChargeSummer, maxChargerPower, distDemandCharge);
    }, [onPeakkWPerMonth, onPeakDemandChargeWinter, onPeakDemandChargeWinter, maxChargerPower, distDemandCharge])

    useEffect(() => {
        updateDieselCost(dieselCost, dieselMonthCost, annualDieselCost);
    }, [dieselCost, dieselMonthCost, annualDieselCost])

    useEffect(() => {
        updateTotalCosts(totalCSBSummer, totalCSBWinter, annualCSBCost, Math.round((annualDieselCost-annualCSBCost)*100)/100);
    }, [totalCSBSummer, totalCSBWinter, annualCSBCost])

    if (context.loading) {
        return <></>;
    }

    const monthsData = context.data.operation_schedule[0];
    const summerOnPeakKW = context.data.rates[1]["on_peak_kW"];
    const winterOnPeakKW = context.data.rates[2]["on_peak_kW"];
    const monthsInOperation = context.data.operation_schedule[0];
    const totalMonthsInOperation = Object.values(monthsInOperation).reduce((count: number, value) => count + (value ? 1 : 0), 0);
    const distributionCharge = context.data.rates[0]["distribution_demand_charge"];
    const summerMonthsActiveCount = monthsInOperation["June"] + monthsInOperation["July"] + monthsInOperation["August"] + monthsInOperation["September"];
    const winterMonthsActiveCount = monthsInOperation["October"] + monthsInOperation["November"] + monthsInOperation["December"] + monthsInOperation["January"] + monthsInOperation["February"] + monthsInOperation["March"] + monthsInOperation["April"] + monthsInOperation["May"]
    const nonActiveMonthsCount = 12-summerMonthsActiveCount-winterMonthsActiveCount;

    const sortedMonths = Object.keys(monthsData).sort((a, b) => {
        const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
    const dollarkWhPerDay = [monthsInOperation["January"] ? winterDailyCost : 0, monthsInOperation["February"] ? winterDailyCost : 0, monthsInOperation["March"] ? winterDailyCost : 0, monthsInOperation["April"] ? winterDailyCost : 0,
monthsInOperation["May"] ? winterDailyCost : 0, monthsInOperation["June"] ? summerDailyCost : 0, monthsInOperation["July"] ? summerDailyCost : 0, monthsInOperation["August"] ? summerDailyCost : 0, monthsInOperation["September"] ? summerDailyCost : 0,
monthsInOperation["October"] ? winterDailyCost : 0, monthsInOperation["November"] ? winterDailyCost : 0, monthsInOperation["December"] ? winterDailyCost : 0];
    const kWhPerDayCost = dollarkWhPerDay.map((cost, index)=>
    <td key={index} className="text-sm">${cost}</td>)
    const onPeakDemandCharges = [monthsInOperation["January"] ? onPeakDemandChargeWinter : 0, monthsInOperation["February"] ? onPeakDemandChargeWinter : 0, monthsInOperation["March"] ? onPeakDemandChargeWinter : 0, monthsInOperation["April"] ? onPeakDemandChargeWinter : 0,
monthsInOperation["May"] ? onPeakDemandChargeWinter : 0, monthsInOperation["June"] ? onPeakDemandChargeSummer : 0, monthsInOperation["July"] ? onPeakDemandChargeSummer : 0, monthsInOperation["August"] ? onPeakDemandChargeSummer : 0, monthsInOperation["September"] ? onPeakDemandChargeSummer : 0,
monthsInOperation["October"] ? onPeakDemandChargeWinter : 0, monthsInOperation["November"] ? onPeakDemandChargeWinter : 0, monthsInOperation["December"] ? onPeakDemandChargeWinter : 0];
    const onPeakDemand = onPeakDemandCharges.map((charge, index)=>
    <td key={index} className="text-sm">${charge}</td>)
    const distributionDemandCharges = [distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge,distDemandCharge];
    const distributionDemandCharge = distributionDemandCharges.map((charge, index)=>
    <td key={index} className="text-sm">${charge}</td>)
    const totalCSBPerMonths = [monthsInOperation["January"] ? totalCSBWinter : distDemandCharge, monthsInOperation["February"] ? totalCSBWinter : distDemandCharge, monthsInOperation["March"] ? totalCSBWinter : distDemandCharge, monthsInOperation["April"] ? totalCSBWinter : distDemandCharge,
    monthsInOperation["May"] ? totalCSBWinter : distDemandCharge, monthsInOperation["June"] ? totalCSBSummer : distDemandCharge, monthsInOperation["July"] ? totalCSBSummer : distDemandCharge, monthsInOperation["August"] ? totalCSBSummer : distDemandCharge, monthsInOperation["September"] ? totalCSBSummer : distDemandCharge,
    monthsInOperation["October"] ? totalCSBWinter : distDemandCharge, monthsInOperation["November"] ? totalCSBWinter : distDemandCharge, monthsInOperation["December"] ? totalCSBWinter : distDemandCharge];
    const csbCostPerMonth = totalCSBPerMonths.map((csbCost, index)=>
    <td key={index} className="text-sm">${csbCost}</td>)
    const totalDieselCostPerMonths = [monthsInOperation["January"] ? dieselMonthCost : 0, monthsInOperation["February"] ? dieselMonthCost : 0, monthsInOperation["March"] ? dieselMonthCost : 0, monthsInOperation["April"] ? dieselMonthCost : 0,
    monthsInOperation["May"] ? dieselMonthCost : 0, monthsInOperation["June"] ? dieselMonthCost : 0, monthsInOperation["July"] ? dieselMonthCost : 0, monthsInOperation["August"] ? dieselMonthCost : 0, monthsInOperation["September"] ? dieselMonthCost : 0,
    monthsInOperation["October"] ? dieselMonthCost : 0, monthsInOperation["November"] ? dieselMonthCost : 0, monthsInOperation["December"] ? dieselMonthCost : 0];
    const dieselCostPerMonth = totalDieselCostPerMonths.map((cost, index)=>
    <td key={index} className="text-sm">${cost}</td>)
    const totalWinterSavings = Math.round((dieselMonthCost-totalCSBWinter)*100)/100;
    const totalSummerSavings = Math.round((dieselMonthCost-totalCSBSummer)*100)/100;
    const totalNonOpSavings = Math.round((0-distDemandCharge)*100)/100;
    const totalMonthlySavings = [monthsInOperation["January"] ? totalWinterSavings : totalNonOpSavings, monthsInOperation["February"] ? totalWinterSavings : totalNonOpSavings, monthsInOperation["March"] ? totalWinterSavings : totalNonOpSavings, monthsInOperation["April"] ? totalWinterSavings : totalNonOpSavings,
    monthsInOperation["May"] ? totalWinterSavings : totalNonOpSavings, monthsInOperation["June"] ? totalSummerSavings : totalNonOpSavings, monthsInOperation["July"] ? totalSummerSavings : totalNonOpSavings, monthsInOperation["August"] ? totalSummerSavings : totalNonOpSavings, monthsInOperation["September"] ? totalSummerSavings : totalNonOpSavings,
    monthsInOperation["October"] ? totalWinterSavings : totalNonOpSavings, monthsInOperation["November"] ? totalWinterSavings : totalNonOpSavings, monthsInOperation["December"] ? totalWinterSavings : totalNonOpSavings];
    const monthlySavings = totalMonthlySavings.map((save, index)=>
    <td key={index} className="text-sm">${save}</td>)

    //Values from the Bus components used for cost summary
    
    const addToWinterDailyCost = (data: number) => {
        const w = Math.round((winterDailyCost+data)*100)/100;
        setWinterDailyCost(w);
        //22 weekdays in a month
        setWinterMonthCost(Math.round((w*22)*100)/100);
        setValsInitialized(true);
    }

    const addToSummerDailyCost = (data: number) => {
        const s = Math.round((summerDailyCost+data)*100)/100;
        setSummerDailyCost(s);
        //22 weekdays in a month
        setSummerMonthCost(Math.round((s*22)*100)/100);
        setValsInitialized(true);
    }

    //Only called when charging time of day is in the daytime
    const addToOnPeakkWPerMonth = (data: number) => {
        const op = Math.round((onPeakkWPerMonth+data)*100)/100;
        setOnPeakkWPerMonth(op);
        console.log(onPeakDemand);
        let opWinter = 0;
        let opSummer = 0;
        if(op > 25){
            opWinter = Math.round((op*winterOnPeakKW)*100)/100;
            opSummer = Math.round((op*summerOnPeakKW)*100)/100;
            setOnPeakDemandChargeWinter(opWinter);
            setOnPeakDemandChargeSummer(opSummer);
        }
        else{
            setOnPeakDemandChargeSummer(0);
            setOnPeakDemandChargeWinter(0);
        }
    }

    const addToDieselDailyCost = (data: number) => {
        const d = Math.round((dieselCost+data)*100)/100;
        setDieselCostPerDay(d);
        const dieselCostPerMonth = Math.round((d*22)*100)/100;
        setDieselCostPerMonth(dieselCostPerMonth);
        const sumAnnualDieselCost = Math.round(dieselCostPerMonth*totalMonthsInOperation*100)/100;
        setAnnualDieselCost(sumAnnualDieselCost)
    }

    //track the largest charger power
    const findMaxCharger = (newVal: number) => {
        if(newVal > maxChargerPower){
            setMaxChargerPower(newVal);
        }
    }

    const findNewMaxCharger = () => {
        let max = 0;
        for(let i = 1; i < Object.keys(buses).length+1; i++){
            if(max < buses[i].chargerPower){
                max = buses[i].chargerPower;
            }
        }
        setMaxChargerPower(max);
    }

    function calculateDistDemandCharge(){
        if(maxChargerPower > 25){
            const demandCharge = Math.round(distributionCharge*maxChargerPower*100)/100;
            setDistDemandCharge(demandCharge);
        }
        else{
            setDistDemandCharge(0);
        }
    }

    function calculateCSBCostPerMonth() {
        const totalCSBWinter = Math.round((onPeakDemandChargeWinter+distDemandCharge+winterMonthCost)*100)/100;
        const totalCSBSummer = Math.round((onPeakDemandChargeSummer+distDemandCharge+summerMonthCost)*100)/100;
        setTotalCSBSummer(totalCSBSummer);
        setTotalCSBWinter(totalCSBWinter);
        if(valsInitialized){
            const sumAnnualCSBCost = Math.round(((totalCSBWinter*winterMonthsActiveCount)+(totalCSBSummer*summerMonthsActiveCount)+(distDemandCharge*nonActiveMonthsCount))*100)/100;
            setAnnualCSBCost(sumAnnualCSBCost);
        }
    }

    //Dealing with Bus Accordion
    const addBus = () => {
        addBusLocal();
        setBusCount(busCount+1);
    }

    const deleteBus = () => {
        if(busCount > 1){
            const busId = Object.keys(buses).length
            let removeWinter = Math.round(buses[busId].kWhOneRouteWinter*buses[busId].dollarkWhWinter*100)/100;
            let removeSummer = Math.round(buses[busId].kWhOneRouteSummer*buses[busId].dollarkWhSummer*100)/100;
            let removeDiesel = Math.round(buses[busId].totalDiesalCost);
            let removeChargerPower = Math.round(buses[busId].batteryCapacity*100)/100;
            if(buses[busId].timeOfDay == "Daytime" && removeChargerPower > 29){
                addToOnPeakkWPerMonth(-1*removeChargerPower)
            }
            addToWinterDailyCost(-1*removeWinter);
            addToSummerDailyCost(-1*removeSummer);
            addToDieselDailyCost(-1*removeDiesel);
            findNewMaxCharger();
            deleteLastBusLocal();
            setBusCount(busCount-1);
        }
    }

    return(
        <div>
            <div className="join join-vertical w-full">
                {Object.values(buses).map(bus => {
                    return (
                        <Bus key={bus.id} id={bus.id} wintercost={addToWinterDailyCost} summercost={addToSummerDailyCost} maxCharger={findMaxCharger} dieselcost={addToDieselDailyCost} onPeakDemand={addToOnPeakkWPerMonth}/>
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
                <h1 className="text-2xl font-bold">Monthly Costs</h1>
                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="bg-gray-100"></th>
                                {sortedMonths.map((month, index) => (
                                    <td key={index} className={monthsData[month] ? 'text-[#3b9044] text-base' : 'text-red-700 text-base'}>{month}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-50">
                                <th className="text-sm bg-gray-50 font-normal tooltip tooltip-right cursor-help" 
                                    data-tip="The daily cost to charge all operational buses for the corresponding month.">
                                    $/kWh per Day<span className="text-[#2495c4]">* </span>
                                </th>
                                {kWhPerDayCost}
                            </tr>
                            <tr>
                                <th className="text-sm font-normal tooltip tooltip-right cursor-help" 
                                    data-tip="This demand charge is applied based on the maximum number of kilowatts used at once by the selected chargers during On-Peak hours.">
                                    On-Peak Demand Charge per Month<span className="text-[#2495c4]">* </span>
                                </th> 
                                {onPeakDemand}
                            </tr>
                            <tr className="bg-gray-50">
                                <th className="text-sm bg-gray-50 font-normal tooltip tooltip-right cursor-help"
                                    data-tip="This charge is based on the maximum number of kilowatts used at once over the whole year. This charge will be the same for every month and is dependent on the time of the highest power use.">
                                    Distribution Demand Charge per Month<span className="text-[#2495c4]">* </span>
                                </th>
                                {distributionDemandCharge}
                            </tr>
                            <tr>
                                <th className="text-sm font-normal tooltip tooltip-right cursor-help"
                                    data-tip="The total electricity cost for all operational buses per month.">
                                    Total CSB Cost per Month<span className="text-[#2495c4]">* </span>
                                </th> 
                                {csbCostPerMonth}
                            </tr>
                            <tr className="bg-gray-50">
                                <th className="text-sm bg-gray-50 font-normal tooltip tooltip-right cursor-help" 
                                    data-tip="The mirrored total cost to fuel the same number of operational diesel buses per month.">
                                    Total Diesel Cost per Month
                                </th> 
                                {dieselCostPerMonth}
                            </tr>
                            <tr>
                                <th className="text-sm font-normal tooltip tooltip-right cursor-help"
                                    data-tip="The amount of money saved per month by utilizing electric school buses rather than diesel buses.">
                                    Total Monthly Savings<span className="text-[#2495c4]">* </span>
                                </th> 
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
                <h1>Annual Savings: ${Math.round((annualDieselCost-annualCSBCost)*100)/100}</h1>
            </div>
        </div>
    );
}

export default BusAccordion;