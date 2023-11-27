import React from 'react';
import {useState, useEffect} from 'react';

const Bus = (props: any) => {

    const buses = {
      "N/A": {
        "maxChargeCapacity": 0,
        "maxRange": 0
      },
      "All American RE Electric": {
        "maxChargeCapacity": 155,
        "maxRange": 120
      },
      "Vision Electric": {
        "maxChargeCapacity": 155,
        "maxRange": 120
      },
      "Electric CE Series 1": {
        "maxChargeCapacity": 210,
        "maxRange": 135
      },
      "Electric CE Series 2": {
        "maxChargeCapacity": 315,
        "maxRange": 200
      },
      "LionC": {
        "maxChargeCapacity": 168,
        "maxRange": 155
      },
      "Saf-Tliner C2 Jouley": {
        "maxChargeCapacity": 226,
        "maxRange": 138
      }
    }

    const [busModel, setBusModel] = useState('');
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [maxRange, setBusMaxRange] = useState(0);
    const [summerRange, setSummerRange] = useState(0);
    const [winterRange, setWinterRange] = useState(0);
    const [routeMiles, setRouteMiles] = useState('0');
    const [kWhOneRouteSummer, setkWhOneRouteSummer] = useState(0);
    const [kWhOneRouteWinter, setkWhOneRouteWinter] = useState(0);
    const [maxRoutesSummer, setMaxRoutesSummer] = useState(0);
    const [maxRoutesWinter, setMaxRoutesWinter] = useState(0);
    const [timeOfDay, setTimeOfDay] = useState('N/A');
    const [chargerPower, setChargerPower] = useState(0);
    const [summerChargingTime, setSummerChargingTime] = useState(0);
    const [winterChargingTime, setWinterChargingTime] = useState(0);
    const [onPeakSummer, setOnPeakSummer] = useState(0);
    const [kWhSummer, setkWhSummer] = useState(0);
    const [onPeakWinter, setOnPeakWinter] = useState(0);
    const [kWhWinter, setkWhWinter] = useState(0);
    const [totalElectrictyCostPerDaySummer, setTotalElectricityCostPerDaySummer] = useState(0);
    const [totalElectrictyCostPerDayWinter, setTotalElectricityCostPerDayWinter] = useState(0);
    const [demandCharge, setDemandCharge] = useState(0);
    const [dieselCostPerDay, setDieselCostPerDay] = useState(0);

    function busModelChange(model: string) {
      setBusModel(model);
      setMaxCapacity(buses[model].maxChargeCapacity);
      const maxRangeTemp = buses[model].maxRange;
      setBusMaxRange(maxRangeTemp);
      const sumRange = Math.round((maxRangeTemp * 0.9)*100)/100;
      const winRange = Math.round((maxRangeTemp * 0.8)*100)/100;
      setSummerRange(sumRange);
      setWinterRange(winRange);
    }

    useEffect(() => {
      busRouteChange(routeMiles);
    },[maxCapacity,summerRange,winterRange])

    function busRouteChange(miles: string){
      var error = document.getElementById("miles-error")
      if(error){
        error.innerHTML = "";
      }
      const milesTemp = Number(miles)
      if(isNaN(milesTemp)){
        var error = document.getElementById("miles-error")
        if(error){
          error.innerHTML = "Input is not a number";
        }
        return;
      }
      if(milesTemp < 0){
        var error = document.getElementById("miles-error")
        if(error){
          error.innerHTML = "Input is less than 0";
        }
        return;
      }
      if(milesTemp == 0){
        return;
      }
      setRouteMiles(String(milesTemp));
      if(isNaN(summerRange) || isNaN(winterRange) || isNaN(maxCapacity) || summerRange == 0 || winterRange == 0){
        var error = document.getElementById("miles-error")
        if(error){
          error.innerHTML = "Please select a bus model"
        }
        return;
      }
      const oneRouteSummer = Math.round((maxCapacity / summerRange) * milesTemp*100)/100;
      const oneRouteWinter = Math.round((maxCapacity / winterRange) * milesTemp*100)/100;
      const maxCapSummer = maxCapacity*0.9;
      const maxCapWinter = maxCapacity*0.8;
      if((oneRouteSummer > maxCapSummer) && oneRouteWinter > maxCapWinter){
        if(error){
          error.innerHTML = "Route is too long for "+busModel+"'s battery capacity in Summer and Winter"
        }
      }
      if(oneRouteSummer > maxCapSummer){
        if(error){
          error.innerHTML = "Route is too long for "+busModel+"'s battery capacity in Summer"
        }
      }
      if(oneRouteWinter > maxCapWinter){
        if(error){
          error.innerHTML = "Route is too long for "+busModel+"'s battery capacity in Winter"
        }
      }
      setkWhOneRouteSummer(oneRouteSummer);
      setkWhOneRouteWinter(oneRouteWinter);
      if(oneRouteSummer == 0 || oneRouteWinter == 0){
        setMaxRoutesSummer(0);
        setMaxRoutesWinter(0);
        return;
      }
      const maxRoutesSummerTemp = Math.round((0.9 * maxCapacity) / oneRouteSummer*100)/100;
      const maxRoutesWinterTemp = Math.round((0.8 * maxCapacity) / oneRouteWinter*100)/100;
      setMaxRoutesSummer(maxRoutesSummerTemp);
      setMaxRoutesWinter(maxRoutesWinterTemp);
    }

    function timeOfDayChange(time: string) {
      if(time=="Daytime"){
        setTimeOfDay("Daytime");
        setOnPeakSummer(13.00);
        setOnPeakWinter(11.00);
        setkWhSummer(0.0885);
        setkWhWinter(0.08);
        return;
      }
      if(time=="Overnight"){
        setTimeOfDay("Overnight");
        setOnPeakSummer(0.00);
        setOnPeakWinter(0.00);
        setkWhSummer(0.054);
        setkWhWinter(0.054);
        return;
      }
      setTimeOfDay("N/A");
      setOnPeakSummer(0.00);
      setOnPeakWinter(0.00);
      setkWhSummer(0.00);
      setkWhWinter(0.00);
      return;
    }

    useEffect(() => {
      chargerPowerChange(String(chargerPower));
    },[kWhOneRouteSummer,kWhOneRouteWinter])

    function chargerPowerChange(power: string){
      const powerTemp = Number(power);
      if(isNaN(powerTemp) || powerTemp == 0){
        setChargerPower(0);
        return;
      }
      props.kWPerMonth(powerTemp-chargerPower);
      setChargerPower(powerTemp);
      setSummerChargingTime(Math.round(kWhOneRouteSummer / powerTemp * 100)/100);
      setWinterChargingTime(Math.round(kWhOneRouteWinter / powerTemp * 100)/100);
      return;
    }

    useEffect(() => {
      resultingCosts();
    },[kWhSummer,kWhWinter,kWhOneRouteSummer,kWhOneRouteWinter,chargerPower,routeMiles])

    function resultingCosts(){
      const summerCost = Math.round(kWhSummer*kWhOneRouteSummer*100)/100;
      const winterCost = Math.round(kWhWinter*kWhOneRouteWinter*100)/100;
      if(summerCost != totalElectrictyCostPerDaySummer){
        //remove current bus cost from total
        props.summercost(summerCost-totalElectrictyCostPerDaySummer);
      }
      if(winterCost != totalElectrictyCostPerDayWinter){
        props.wintercost(winterCost-totalElectrictyCostPerDayWinter);
      }
      setTotalElectricityCostPerDaySummer(summerCost);
      setTotalElectricityCostPerDayWinter(winterCost);
      if(timeOfDay == "Daytime"){
        if(chargerPower > 39){
          setDemandCharge(Math.round(chargerPower*12*100)/100)
        }
        else{
          setDemandCharge(0.00)
        }
      }
      else{
        setDemandCharge(0.00)
      }
      const d = Math.round((Number(routeMiles)/6.0)*4*100)/100
      if(d != dieselCostPerDay){
        props.dieselcost(d-dieselCostPerDay)
      }
      setDieselCostPerDay(d)
    }

    return(
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4"/> 
          <div className="collapse-title text-xl font-medium">
            Bus #{props.id}
          </div>
          <div className="collapse-content">
            <div className="md:inline-flex w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bus Model</span>
                </label>
                <select className="select select-bordered w-full max-w-xs" value={busModel} onChange={e => busModelChange(e.target.value)}>
                  <option>N/A</option>
                  <option>All American RE Electric</option>
                  <option>Vision Electric</option>
                  <option>Electric CE Series 1</option>
                  <option>Electric CE Series 2</option>
                  <option>LionC</option>
                  <option>Saf-Tliner C2 Jouley</option>
                </select>
                </div>
                <div className="w-full m-4">
                  <span className="text-sm"><span className="font-bold">{busModel}</span> Battery Capacity: <span className="font-bold">{maxCapacity}</span> kWh</span><br/>
                  <span className="text-sm">Summer Range: <span className="font-bold">{summerRange}</span> miles</span><br/>
                  <span className="text-sm">Winter Range: <span className="font-bold">{winterRange}</span> miles</span><br/>
                </div>
            </div>
            <div className="inline-flex w-full">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Miles in Bus Route</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={routeMiles} onChange={e => busRouteChange(e.target.value)}/>
                <label className="label">
                  <span className="label-text-alt text-red-700 font-semibold" id="miles-error"></span>
                </label>
              </div>
              <div className="w-full m-4">
                  <span className="text-sm"><span className="font-bold">{kWhOneRouteSummer}</span> kWh used after 1 route in the Summer</span><br/>
                  <span className="text-sm"><span className="font-bold">{kWhOneRouteWinter}</span> kWh used after 1 route in Winter</span><br/>
                  <span className="text-sm"><span className="font-bold">{maxRoutesSummer}</span> or <span className="font-bold">{Math.floor(maxRoutesSummer)}</span> route(s) is the maximum number of route(s) on 1 charge in Summer</span><br/>
                  <span className="text-sm"><span className="font-bold">{maxRoutesWinter}</span> or <span className="font-bold">{Math.floor(maxRoutesWinter)}</span> route(s) is the maximum number of route(s) on 1 charge in Winter</span><br/>
                </div>
            </div>
            <h1 className="font-bold">Charging Session</h1>
            <div className="md:inline-flex w-full">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Time of Day</span>
                </label>
                <select className="select select-bordered" value={timeOfDay} onChange={e => timeOfDayChange(e.target.value)}>
                  <option>N/A</option>
                  <option>Daytime</option>
                  <option>Overnight</option>
                </select>
                <label className="label">
                  <span className="label-text-alt">Daytime (On-Peak): 9:00am-9:00pm</span>
                  <span className="label-text-alt">Overnight (Off-Peak): 9:00pm-9:00am</span>
                </label>
              </div>
              <div className="form-control w-full max-w-xs px-2">
                <label className="label">
                  <span className="label-text">Charger Power (kW)</span>
                </label>
                <select className="select select-bordered w-full max-w-xs" value={chargerPower} onChange={e => chargerPowerChange(e.target.value)}>
                  <option>N/A</option>
                  <option>7.2</option>
                  <option>7.68</option>
                  <option>9.6</option>
                  <option>11.52</option>
                  <option>12</option>
                  <option>16.8</option>
                  <option>19.2</option>
                  <option>22.5</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                  <option>160</option>
                  <option>180</option>
                  <option>240</option>
                </select>
                </div>
                <div className="w-full m-4">
                  <span className="text-sm">Summer Charging Time: <span className="font-bold">{summerChargingTime}</span> hours</span><br/>
                  <span className="text-sm">Winter Charging Time: <span className="font-bold">{winterChargingTime}</span> hours</span><br/>
                  <span className="text-sm">On-Peak $/kW Summer: $<span className="font-bold">{onPeakSummer}</span></span><br/>
                  <span className="text-sm">$/kWh Summer: $<span className="font-bold">{kWhSummer}</span></span><br/>
                  <span className="text-sm">On-Peak $/kW Winter: $<span className="font-bold">{onPeakWinter}</span></span><br/>
                  <span className="text-sm">$/kWh Winter: $<span className="font-bold">{kWhWinter}</span></span><br/>
                </div>
            </div>
            <div>
              <h1 className="font-bold">Resulting Costs</h1>
              <h1>Total Electricity Cost per Day in Summer: $<span className="font-bold">{totalElectrictyCostPerDaySummer}</span></h1>
              <h1>Total Electricity Cost per Day in Winter: $<span className="font-bold">{totalElectrictyCostPerDayWinter}</span></h1>
              <h1>Demand Charge: $<span className="font-bold">{demandCharge}</span></h1>
              <h1>Total Diesel Cost per Day: $<span className="font-bold">{dieselCostPerDay}</span></h1>
            </div>
          </div>
        </div>
    );
}

export default Bus;