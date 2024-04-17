import React from "react";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import LoadingSpinner from "./equipment/loading_bar";
import useLocalStorage from '~/hooks/useLocalStorage';

const formatDecimalToTime = (dec: number) => {
  const date = new Date(0, 0);
  date.setSeconds(dec * 60 * 60);
  return date.getHours() > 0
    ? `${date.getHours()} hours and ${date.getMinutes()} minutes`
    : `${date.getMinutes()} minutes`;
};

const Bus = (props: any) => {
  const context = useContext(DataContext);
  const {buses, updateBusModelLocal, updateRouteMilesLocal, updateTimeOfDayLocal, updateChargerPowerLocal, updateResultsLocal} = useLocalStorage();

  const [busModel, setBusModel] = useState(buses[props.id] ? buses[props.id].busModel : "N/A");
  const [maxCapacity, setMaxCapacity] = useState(buses[props.id] ? buses[props.id].batteryCapacity : 0);
  const [maxRange, setBusMaxRange] = useState(0);
  const [summerRange, setSummerRange] = useState(buses[props.id] ? buses[props.id].summerRange: 0);
  const [winterRange, setWinterRange] = useState(buses[props.id] ? buses[props.id].winterRange: 0);
  const [routeMiles, setRouteMiles] = useState(buses[props.id] ? buses[props.id].miles : "0");
  const [kWhOneRouteSummer, setkWhOneRouteSummer] = useState(buses[props.id] ? buses[props.id].kWhOneRouteSummer: 0);
  const [kWhOneRouteWinter, setkWhOneRouteWinter] = useState(buses[props.id] ? buses[props.id].kWhOneRouteWinter: 0);
  const [maxRoutesSummer, setMaxRoutesSummer] = useState(buses[props.id] ? buses[props.id].maxRoutesOneChargeSummer: 0);
  const [maxRoutesWinter, setMaxRoutesWinter] = useState(buses[props.id] ? buses[props.id].maxRoutesOneChargeWinter: 0);
  const [timeOfDay, setTimeOfDay] = useState(buses[props.id] ? buses[props.id].timeOfDay : "N/A");
  const [chargerPower, setChargerPower] = useState(buses[props.id] ? buses[props.id].chargerPower : 0);
  const [summerChargingTime, setSummerChargingTime] = useState(buses[props.id] ? buses[props.id].summerChargingTime: 0);
  const [winterChargingTime, setWinterChargingTime] = useState(buses[props.id] ? buses[props.id].winterChargingTime: 0);
  const [onPeakSummer, setOnPeakSummer] = useState(buses[props.id] ? buses[props.id].onPeakSummer: 0);
  const [kWhSummer, setkWhSummer] = useState(buses[props.id] ? buses[props.id].dollarkWhSummer: 0);
  const [onPeakWinter, setOnPeakWinter] = useState(buses[props.id] ? buses[props.id].onPeakWinter: 0);
  const [kWhWinter, setkWhWinter] = useState(buses[props.id] ? buses[props.id].dollarkWhWinter: 0);
  const [totalElectrictyCostPerDaySummer, setTotalElectricityCostPerDaySummer] = useState(buses[props.id] ? buses[props.id].totalECSummer: 0);
  const [totalElectrictyCostPerDayWinter, setTotalElectricityCostPerDayWinter] = useState(buses[props.id] ? buses[props.id].totalECWinter: 0);
  const [demandCharge, setDemandCharge] = useState(buses[props.id] ? buses[props.id].demandCharge: 0);
  const [dieselCostPerDay, setDieselCostPerDay] = useState(buses[props.id] ? buses[props.id].totalDiesalCost: 0);

  useEffect(() => {
    busModelChange(busModel);
    busRouteChange(routeMiles);
  }, [maxCapacity, summerRange, winterRange, kWhSummer]);

  useEffect(() => {
    chargerPowerChange(String(chargerPower));
  }, [kWhOneRouteSummer, kWhOneRouteWinter]);

  useEffect(() => {
    resultingCosts();
  }, [
    kWhSummer,
    kWhWinter,
    kWhOneRouteSummer,
    kWhOneRouteWinter,
    chargerPower,
    routeMiles,
  ]);

  useEffect(() => {
    updateBusModelLocal(props.id, busModel, maxCapacity, summerRange, winterRange);
  }, [maxCapacity, summerRange, winterRange]);

  useEffect(() =>  {
    updateRouteMilesLocal(props.id, routeMiles, kWhOneRouteSummer, kWhOneRouteWinter, maxRoutesSummer, maxRoutesWinter);
  }, [kWhOneRouteSummer, kWhOneRouteWinter, maxRoutesSummer, maxRoutesWinter]);

  useEffect(() => {
    updateTimeOfDayLocal(props.id, timeOfDay, onPeakSummer, onPeakWinter, kWhSummer, kWhWinter); 
  }, [onPeakSummer, onPeakWinter, kWhSummer, kWhWinter]);

  useEffect(() => {
    updateChargerPowerLocal(props.id, chargerPower, summerChargingTime, winterChargingTime);
  }, [summerChargingTime, winterChargingTime])

  useEffect(() => {
    updateResultsLocal(props.id, totalElectrictyCostPerDaySummer, totalElectrictyCostPerDayWinter, demandCharge, dieselCostPerDay);
  }, [kWhSummer,
    kWhWinter,
    kWhOneRouteSummer,
    kWhOneRouteWinter,
    chargerPower,
    routeMiles,])

  if (context.loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  
  //Collect necessary information from data context
  const busInformation = new Map();
  let busModels: string[] = [];
  busInformation.set("N/A", { maxChargeCapacity: 0, maxRange: 0 });
  busModels.push("N/A");

  const busData = context.data.buses;

  for (let i = 0; i < busData.length; i++) {
    busInformation.set(busData[i]["model"], {
      maxChargeCapacity: busData[i]["maximum_charge_capacity"],
      maxRange: busData[i]["maximum_range"],
    });
    busModels.push(busData[i]["model"]);
  }

  const chargerData = context.data.summer_charging;
  let chargers: string[] = [];
  for (let i = 0; i < chargerData.length; i++) {
    chargers.push(chargerData[i]["Certified Charger Output (kW)"]);
  }
  chargers.sort((a,b) => parseFloat(a) - parseFloat(b));
  chargers.unshift("N/A");

  const assumptions = context.data.assumptions;
  const winterEff = Number(
    assumptions[0]["winter_efficiency"] != undefined
      ? assumptions[0]["winter_efficiency"]
      : 0.8,
  );
  const summerEff = Number(
    assumptions[0]["summer_efficiency"] != undefined
      ? assumptions[0]["summer_efficiency"]
      : 0.9,
  );
  const milesPerGal = Number(
    assumptions[0]["diesel_bus_miles_per_gallon"]
      ? assumptions[0]["diesel_bus_miles_per_gallon"]
      : 6,
  );
  const dollarsPerGal = Number(
    assumptions[0]["diesel_dollar_per_gallon"]
      ? assumptions[0]["diesel_dollar_per_gallon"]
      : 3.72,
  );

  const rates = context.data.rates;
  const summerRates = rates[1];
  const winterRates = rates[2];

  function busModelChange(model: string) {
    setBusModel(model);
    setMaxCapacity(busInformation.get(model).maxChargeCapacity);
    const maxRangeTemp = busInformation.get(model).maxRange;
    setBusMaxRange(maxRangeTemp);
    const sumRange = Math.round(maxRangeTemp * summerEff * 100) / 100;
    const winRange = Math.round(maxRangeTemp * winterEff * 100) / 100;
    setSummerRange(sumRange);
    setWinterRange(winRange);
  }

  function busRouteChange(miles: string) {
    var error = document.getElementById("miles-error");
    if (error) {
      error.innerHTML = "";
    }
    const milesTemp = Number(miles);
    if (isNaN(milesTemp)) {
      var error = document.getElementById("miles-error");
      if (error) {
        error.innerHTML = "Input is not a number";
      }
      return;
    }
    if (milesTemp < 0) {
      var error = document.getElementById("miles-error");
      if (error) {
        error.innerHTML = "Input is less than 0";
      }
      return;
    }
    if (milesTemp == 0) {
      return;
    }
    setRouteMiles(String(milesTemp));
    if (
      isNaN(summerRange) ||
      isNaN(winterRange) ||
      isNaN(maxCapacity) ||
      summerRange == 0 ||
      winterRange == 0
    ) {
      var error = document.getElementById("miles-error");
      if (error) {
        error.innerHTML = "Please select a bus model";
      }
      return;
    }
    const oneRouteSummer =
      Math.round((maxCapacity / summerRange) * milesTemp * 100) / 100;
    const oneRouteWinter =
      Math.round((maxCapacity / winterRange) * milesTemp * 100) / 100;
    const maxCapSummer = maxCapacity * summerEff;
    const maxCapWinter = maxCapacity * winterEff;
    if (oneRouteSummer > maxCapSummer && oneRouteWinter > maxCapWinter) {
      if (error) {
        error.innerHTML =
          "Route is too long for " +
          busModel +
          "'s battery capacity in Summer and Winter";
      }
    } else {
      if (oneRouteSummer > maxCapSummer) {
        if (error) {
          error.innerHTML =
            "Route is too long for " +
            busModel +
            "'s battery capacity in Summer";
        }
      } else {
        if (oneRouteWinter > maxCapWinter) {
          if (error) {
            error.innerHTML =
              "Route is too long for " +
              busModel +
              "'s battery capacity in Winter";
          }
        }
      }
    }
    setkWhOneRouteSummer(oneRouteSummer);
    setkWhOneRouteWinter(oneRouteWinter);
    if (oneRouteSummer == 0 || oneRouteWinter == 0) {
      setMaxRoutesSummer(0);
      setMaxRoutesWinter(0);
      return;
    }
    const maxRoutesSummerTemp =
      Math.round(((summerEff * maxCapacity) / oneRouteSummer) * 100) / 100;
    const maxRoutesWinterTemp =
      Math.round(((winterEff * maxCapacity) / oneRouteWinter) * 100) / 100;
    setMaxRoutesSummer(maxRoutesSummerTemp);
    setMaxRoutesWinter(maxRoutesWinterTemp);
  }

  function timeOfDayChange(time: string) {
    if (time == "Daytime") {
      setTimeOfDay("Daytime");
      setOnPeakSummer(
        summerRates["on_peak_kW"] != undefined ? summerRates["on_peak_kW"] : 13,
      );
      setOnPeakWinter(
        winterRates["on_peak_kW"] != undefined ? winterRates["on_peak_kW"] : 11,
      );
      setkWhSummer(
        summerRates["on_peak_kWh"] != undefined
          ? summerRates["on_peak_kWh"]
          : 0.0885,
      );
      setkWhWinter(
        winterRates["on_peak_kWh"] != undefined
          ? winterRates["on_peak_kWh"]
          : 0.08,
      );
      // If the time of day was previously overnight then add the charger power to the summary
      if(timeOfDay == "Overnight" && chargerPower > 29){
        props.onPeakDemand(chargerPower);
      }
      if(timeOfDay == "N/A"){
        props.newMaxCharger(-1);
      }
      return;
    }
    if (time == "Overnight") {
      setTimeOfDay("Overnight");
      setOnPeakSummer(0.0);
      setOnPeakWinter(0.0);
      setkWhSummer(
        summerRates["off_peak_kWh"] != undefined
          ? summerRates["off_peak_kWh"]
          : 0.054,
      );
      setkWhWinter(
        winterRates["off_peak_kWh"] != undefined
          ? winterRates["off_peak_kWh"]
          : 0.054,
      );
      if(timeOfDay == "Daytime" && chargerPower > 29){
        props.onPeakDemand(-1*chargerPower);
      }
      if(timeOfDay == "N/A"){
        props.newMaxCharger(-1);
      }
      return;
    }
    setTimeOfDay("N/A");
    setOnPeakSummer(0.0);
    setOnPeakWinter(0.0);
    setkWhSummer(0.0);
    setkWhWinter(0.0);
    if(timeOfDay == "Daytime" && chargerPower > 29){
      props.onPeakDemand(-1*chargerPower);
    }
    props.newMaxCharger(props.id);
    return;
  }

  function chargerPowerChange(power: string) {
    const powerTemp = Number(power);
    if (isNaN(powerTemp) || powerTemp == 0) {
      setChargerPower(0);
      setSummerChargingTime(0);
      setWinterChargingTime(0);
      return;
    }
    props.maxCharger(powerTemp);
    //Handle Summary Changes
    if (timeOfDay == "Daytime" && powerTemp > 29 && chargerPower > 29) {
      props.onPeakDemand(powerTemp - chargerPower);
    }
    else{
      if(timeOfDay == "Daytime" && powerTemp > 29){
        props.onPeakDemand(powerTemp);
      }
      else{
        if(timeOfDay == "Daytime" && chargerPower > 29 && powerTemp <= 29){
          props.onPeakDemand(-1*chargerPower)
        }
      }
    }
    setChargerPower(powerTemp);
    setSummerChargingTime(
      Math.round((kWhOneRouteSummer / powerTemp) * 100) / 100,
    );
    setWinterChargingTime(
      Math.round((kWhOneRouteWinter / powerTemp) * 100) / 100,
    );
    return;
  }

  function resultingCosts() {
    const summerCost = Math.round(kWhSummer * kWhOneRouteSummer * 100) / 100;
    const winterCost = Math.round(kWhWinter * kWhOneRouteWinter * 100) / 100;
    if (summerCost != totalElectrictyCostPerDaySummer) {
      //remove current bus cost from total
      props.summercost(
          summerCost - totalElectrictyCostPerDaySummer
        );
    }
    if (winterCost != totalElectrictyCostPerDayWinter) {
      props.wintercost(
        winterCost - totalElectrictyCostPerDayWinter
      );
    }
    setTotalElectricityCostPerDaySummer(summerCost);
    setTotalElectricityCostPerDayWinter(winterCost);
    //Can possibly simplify because onePeakSummer and onPeakWinter might be 0
    if (timeOfDay == "Daytime") {
      if (chargerPower > 29) {
        const aveOnPeak = (onPeakSummer + onPeakWinter) / 2;
        setDemandCharge(Math.round(chargerPower * aveOnPeak * 100) / 100);
      } else {
        setDemandCharge(0.0);
      }
    } else {
      setDemandCharge(0.0);
    }
    console.log(dollarsPerGal)
    var d = 0;
    if (Number(routeMiles) != 0) {
      d =
        Math.round((Number(routeMiles) / milesPerGal) * dollarsPerGal * 100) /
        100;
    }
    if (d != dieselCostPerDay) {
      props.dieselcost(d - dieselCostPerDay);
    }
    setDieselCostPerDay(d);
  }

  return (
    <div className="collapse-arrow collapse join-item border border-base-300">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-xl font-medium">School Bus #{props.id}</div>
      <div className="collapse-content">
        <div className="w-full md:inline-flex">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bus Model</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={busModel}
              onChange={(e) => busModelChange(e.target.value)}
            >
              {busModels.map((model) => (
                <option key={model}>{model}</option>
              ))}
            </select>
          </div>
          <div className="m-4 w-full">
            <span
              className="tooltip cursor-help text-sm"
              data-tip="The maximum amount of electricity (in kilowatt hours) the bus's battery can store."
            >
              <span className="font-bold">{busModel}</span> Battery Capacity<span className="text-[#2495c4]">* </span>: <span className="font-bold">{maxCapacity}</span> kWh
            </span>
            <br />
            <span
              className="tooltip cursor-help text-sm"
              data-tip="The maximum number of miles the bus will be able to drive off of one full capacity charge"
            >
              Summer Range<span className="text-[#2495c4]">* </span>: <span className="font-bold">{summerRange}</span>{" "}
              miles
            </span>
            <br />
            <span className="text-sm">
              Winter Range: <span className="font-bold">{winterRange}</span>{" "}
              miles
            </span>
            <br />
          </div>
        </div>
        <div className="inline-flex w-full">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Miles in Bus Route</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={routeMiles}
              onChange={(e) => busRouteChange(e.target.value)}
            />
            <label className="label">
              <span
                className="label-text-alt font-semibold text-red-700"
                id="miles-error"
              ></span>
            </label>
          </div>
          <div className="m-4 w-full">
            <span className="text-sm">
              <span className="font-bold">{kWhOneRouteSummer}</span> kWh used
              after 1 route in the Summer
            </span>
            <br />
            <span className="text-sm">
              <span className="font-bold">{kWhOneRouteWinter}</span> kWh used
              after 1 route in Winter
            </span>
            <br />
            <span className="text-sm">
              <span className="font-bold">{maxRoutesSummer}</span> or{" "}
              <span className="font-bold">{Math.floor(maxRoutesSummer)}</span>{" "}
              route(s) is the maximum number of route(s) on 1 charge in Summer
            </span>
            <br />
            <span className="text-sm">
              <span className="font-bold">{maxRoutesWinter}</span> or{" "}
              <span className="font-bold">{Math.floor(maxRoutesWinter)}</span>{" "}
              route(s) is the maximum number of route(s) on 1 charge in Winter
            </span>
            <br />
          </div>
        </div>
        <h1 className="font-bold">Charging Session</h1>
        <div className="w-full md:inline-flex">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span
                className="label-text tooltip tooltip-right cursor-help"
                data-tip="Select the time of day the bus will be charged during. Charging during On-Peak hours will result in higher monthly demand charges."
              >
                Time of Day<span className="text-[#2495c4]">*</span>
              </span>
            </label>
            <select
              className="select select-bordered"
              value={timeOfDay}
              onChange={(e) => timeOfDayChange(e.target.value)}
            >
              <option>N/A</option>
              <option>Daytime</option>
              <option>Overnight</option>
            </select>
            <label className="label">
              <span className="label-text-alt">
                Daytime (On-Peak): <br></br>9:00am-9:00pm
              </span>
              <span className="label-text-alt">
                Overnight (Off-Peak): <br></br>9:00pm-9:00am
              </span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs px-2">
            <label className="label">
              <span
                className="label-text tooltip tooltip-right cursor-help"
                data-tip="The amount of power provided by the electric vehicle charger used to charge the bus. Chargers that provide more kilowatts on demand can recharge buses faster but will result in higher electric demand charges in addition to the electricity charges."
              >
                Charger Power (kW)<span className="text-[#2495c4]">*</span>
              </span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={chargerPower}
              onChange={(e) => chargerPowerChange(e.target.value)}
            >
              {chargers.map((kW) => (
                <option key={kW}>{kW}</option>
              ))}
            </select>
          </div>
          <div className="m-4 w-full">
            <p className="text-sm">
              Summer Charging Time:{" "}
              <span className="font-bold">{formatDecimalToTime(summerChargingTime)}</span>
            </p>
            <p className="text-sm">
              Winter Charging Time:{" "}
              <span className="font-bold">{formatDecimalToTime(winterChargingTime)}</span>
            </p>
            <span className="text-sm">
              On-Peak $/kW Summer:{" "}
              <span className="font-bold">${onPeakSummer}</span>
            </span>
            <br />
            <span className="text-sm">
              $/kWh Summer: <span className="font-bold">${kWhSummer}</span>
            </span>
            <br />
            <span className="text-sm">
              On-Peak $/kW Winter:{" "}
              <span className="font-bold">${onPeakWinter}</span>
            </span>
            <br />
            <span className="text-sm">
              $/kWh Winter: <span className="font-bold">${kWhWinter}</span>
            </span>
            <br />
          </div>
        </div>
        <div>
          <h1 className="font-bold">Resulting Costs</h1>
          <h1
            className="tooltip tooltip-right cursor-help"
            data-tip="Cost of one kWh in the Summer * Number of kWhs used for 1 route in the Summer."
          >
            Total Electricity Cost per Day in Summer<span className="text-[#2495c4]">* </span>:{" "}
            <span className="font-bold">
              ${totalElectrictyCostPerDaySummer}
            </span>
          </h1>
          <br></br>
          <h1
            className="tooltip tooltip-right cursor-help"
            data-tip="Cost of one kWh in the Winter * Number of kWhs used for 1 route in the Winter."
          >
            Total Electricity Cost per Day in Winter<span className="text-[#2495c4]">* </span>:{" "}
            <span className="font-bold">
              ${totalElectrictyCostPerDayWinter}
            </span>
          </h1>
          <br></br>
          <h1
            className="tooltip tooltip-right cursor-help"
            data-tip="If the bus is being charged during On-Peak hours and requires 30 or more kWs, the demand charge will be Charger Power (kW) * The average of On-Peak $/kW in the summer and winter."
          >
            Demand Charge<span className="text-[#2495c4]">* </span>: <span className="font-bold">${demandCharge}</span>
          </h1>
          <br></br>
          <h1
            className="tooltip tooltip-right cursor-help"
            data-tip="The cost to fuel a diesel bus that travels the same route in a day as the electric school bus."
          >
            Total Diesel Cost per Day<span className="text-[#2495c4]">* </span>:{" "}
            <span className="font-bold">${dieselCostPerDay}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Bus;