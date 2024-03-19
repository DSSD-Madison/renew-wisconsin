import React from 'react';
import {useState, useEffect, useContext} from 'react';
import { DataContext } from "../contexts/dataContext";
import Bus from '../components/Bus';
import useLocalStorage from '~/hooks/useLocalStorage';


const BusAccordion = (props: any) => {

    const context = useContext(DataContext);
    const {buses, addBusLocal, deleteLastBusLocal} = useLocalStorage();
    const [busCount, setBusCount] = useState(Object.keys(buses).length);
    const [winterDailyCost, setWinterDailyCost] = useState(0);
    const [summerDailyCost, setSummerDailyCost] = useState(0);
    const [winterMonthCost, setWinterMonthCost] = useState(0);
    const [summerMonthCost, setSummerMonthCost] = useState(0);
    const [maxChargerPower, setMaxChargerPower] = useState(0);
    const [onPeakkWPerMonth, setOnPeakkWPerMonth] = useState(0);
    const [onPeakDemandChargeWinter, setOnPeakDemandChargeWinter] = useState(0);
    const [onPeakDemandChargeSummer, setOnPeakDemandChargeSummer] = useState(0);
    const [dieselCost, setDieselCostPerDay] = useState(0);
    const [dieselMonthCost, setDieselCostPerMonth] = useState(0);
    const [annualDieselCost, setAnnualDieselCost] = useState(0);
    const [distDemandCharge, setDistDemandCharge] = useState(0);
    const [totalCSBSummer, setTotalCSBSummer] = useState(0);
    const [totalCSBWinter, setTotalCSBWinter] = useState(0);
    const [annualCSBCost, setAnnualCSBCost] = useState(0);

    /*useEffect(() => {
        calculateDistDemandCharge();
    },[maxChargerPower])

    useEffect(() => {
        calculateCSBCostPerMonth();
    },[maxChargerPower, winterMonthCost, summerMonthCost, distDemandCharge])*/

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

    //Values from the Bus components used for cost summary
    
    const addToWinterDailyCost = (data: number) => {
        const w = Math.round((winterDailyCost+data)*100)/100;
        setWinterDailyCost(w);
        //22 weekdays in a month
        setWinterMonthCost(Math.round((w*22)*100)/100);
    }

    const addToSummerDailyCost = (data: number) => {
        const s = Math.round((summerDailyCost+data)*100)/100;
        setSummerDailyCost(s);
        //22 weekdays in a month
        setSummerMonthCost(Math.round((s*22)*100)/100);
    }

    //Only called when charging time of day is in the daytime
    const addToOnPeakkWPerMonth = (data: number) => {
        const op = Math.round((onPeakkWPerMonth+data)*100)/100;
        setOnPeakkWPerMonth(op);
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

    const addToDieselDailyCost = (data: number, id: number, newVal: number) => {
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

    const calculateDistDemandCharge = () => {
        if(maxChargerPower > 25){
            const demandCharge = Math.round(distributionCharge*maxChargerPower*100)/100;
            setDistDemandCharge(demandCharge);
        }
        else{
            setDistDemandCharge(0);
        }
    }

    const calculateCSBCostPerMonth = () => {
        const totalCSBWinter = Math.round((onPeakDemandChargeWinter+distDemandCharge+winterMonthCost)*100)/100;
        const totalCSBSummer = Math.round((onPeakDemandChargeSummer+distDemandCharge+summerMonthCost)*100)/100;
        setTotalCSBSummer(totalCSBSummer);
        setTotalCSBWinter(totalCSBWinter);
        const sumAnnualCSBCost = Math.round(((totalCSBWinter*winterMonthsActiveCount)+(totalCSBSummer*summerMonthsActiveCount)+(distributionCharge*nonActiveMonthsCount))*100)/100;
        setAnnualCSBCost(sumAnnualCSBCost);
    }


    //Dealing with Bus Accordion
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