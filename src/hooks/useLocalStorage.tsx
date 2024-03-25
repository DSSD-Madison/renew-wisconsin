import { useState, useEffect } from "react";

type Summary = {
  winterDailyCost: number,
  summerDailyCost: number,
  winterMonthCost: number,
  summerMonthCost: number,
  maxChargerPower: number,
  onPeakkWPerMonth: number,
  onPeakDemandChargeWinter: number,
  onPeakDemandChargeSummer: number,
  dieselCost: number,
  dieselMonthCost: number,
  annualDieselCost: number,
  distDemandCharge: number,
  totalCSBSummer: number,
  totalCSBWinter: number,
  annualCSBCost: number,
  annualSavings: number
}

const initialSummary: Summary = {
  winterDailyCost: 0,
  summerDailyCost: 0,
  winterMonthCost: 0,
  summerMonthCost: 0,
  maxChargerPower: 0,
  onPeakkWPerMonth: 0,
  onPeakDemandChargeWinter: 0,
  onPeakDemandChargeSummer: 0,
  dieselCost: 0,
  dieselMonthCost: 0,
  annualDieselCost: 0,
  distDemandCharge: 0,
  totalCSBSummer: 0,
  totalCSBWinter: 0,
  annualCSBCost: 0,
  annualSavings: 0
}

type Bus = {
  id: number,
  busModel: string;
  batteryCapacity: number;
  summerRange: number;
  winterRange: number;
  miles:  string;
  kWhOneRouteSummer: number;
  kWhOneRouteWinter: number;
  maxRoutesOneChargeSummer: number;
  maxRoutesOneChargeWinter: number;
  timeOfDay: string;
  chargerPower: number;
  summerChargingTime: number;
  winterChargingTime: number;
  onPeakSummer: number;
  dollarkWhSummer: number;
  onPeakWinter: number;
  dollarkWhWinter: number;
  totalECSummer: number;
  totalECWinter: number;
  demandCharge: number;
  totalDiesalCost: number;
};

type Buses = {
  [id: number] : Bus;
};

const initialBusesState: Buses = {
  1: { 
    id: 1,
    busModel: "N/A", 
    batteryCapacity: 0, 
    summerRange: 0,  
    winterRange: 0, 
    miles: "0",   
    kWhOneRouteSummer: 0, 
    kWhOneRouteWinter: 0,
    maxRoutesOneChargeSummer: 0, 
    maxRoutesOneChargeWinter: 0, 
    timeOfDay: "N/A", 
    chargerPower: 0,
    summerChargingTime: 0,
    winterChargingTime: 0,
    onPeakSummer: 0,
    dollarkWhSummer: 0,
    onPeakWinter: 0,
    dollarkWhWinter: 0,
    totalECSummer: 0,
    totalECWinter: 0,
    demandCharge: 0,
    totalDiesalCost: 0 }
}

const useLocalStorage = () => {
  const [buses, setBuses] = useState<Buses>(() => {
    return initialBusesState;
  });
  const [summary, setSummary] = useState<Summary>(() => {
    return initialSummary;
  })
  const [count, setCount] = useState(1);

  const updateBusModelLocal = (id : number, busModel: string, maxCapacity: number, summerRange: number, winterRange: number) => {
    if(id <= Object.keys(buses).length && id >= 1){
      buses[id].busModel = busModel;
      buses[id].batteryCapacity = maxCapacity;
      buses[id].summerRange = summerRange;
      buses[id].winterRange = winterRange;
      setBuses(buses);
      }
  }

  const updateRouteMilesLocal = (id : number, miles: string, kWhOneRouteSummer: number, kWhOneRouteWinter: number, maxRouteSummer: number, maxRoutesWinter: number) => {
    if(id <= Object.keys(buses).length && id >= 1){
      buses[id].miles = miles;
      buses[id].kWhOneRouteSummer = kWhOneRouteSummer;
      buses[id].kWhOneRouteWinter = kWhOneRouteWinter;
      buses[id].maxRoutesOneChargeSummer = maxRouteSummer;
      buses[id].maxRoutesOneChargeWinter = maxRoutesWinter;
      setBuses(buses);
    }
  }

  const updateTimeOfDayLocal = (id : number, timeOfDay : string, onPeakSummer : number, onPeakWinter : number, kWhSummer : number, kWhWinter : number) => {
    if(id <= Object.keys(buses).length && id >= 1){
      buses[id].timeOfDay = timeOfDay;
      buses[id].onPeakSummer = onPeakSummer;
      buses[id].onPeakWinter = onPeakWinter;
      buses[id].dollarkWhSummer = kWhSummer;
      buses[id].dollarkWhWinter = kWhWinter;
      setBuses(buses);
    }
  }

  const updateChargerPowerLocal = (id : number, chargerPower : number, summerChargingTime : number, winterChargingTime : number) => {
    if(id <= Object.keys(buses).length && id >= 1){
      buses[id].chargerPower = chargerPower;
      buses[id].summerChargingTime = summerChargingTime;
      buses[id].winterChargingTime = winterChargingTime;
      setBuses(buses);
    }
  }

  const updateResultsLocal = (id : number, summerCost: number, winterCost: number, demandCharge: number, dieselCostPerDay: number) => {
    if(id <= Object.keys(buses).length && id >= 1){
      buses[id].totalECSummer = summerCost;
      buses[id].totalECWinter = winterCost;
      buses[id].demandCharge = demandCharge;
      buses[id].totalDiesalCost = dieselCostPerDay;
      setBuses(buses);
    }
  }

  const updateDailyCost = (winterDaily: number, winterMonthly: number, summerDaily: number, summerMonthly: number) => {
    summary.winterDailyCost = winterDaily;
    summary.winterMonthCost = winterMonthly;
    summary.summerDailyCost = summerDaily;
    summary.summerMonthCost = summerMonthly;
    setSummary(summary);
  }

  const updateOnPeakkWH = (onPeakkWhPerMonth: number, onPeakDemandChargeWinter: number, onPeakDemandChargeSummer: number, maxCharger: number, distDemandCharge: number) => {
    summary.onPeakkWPerMonth = onPeakkWhPerMonth;
    summary.onPeakDemandChargeSummer = onPeakDemandChargeSummer;
    summary.onPeakDemandChargeWinter = onPeakDemandChargeWinter;
    summary.maxChargerPower = maxCharger;
    summary.distDemandCharge = distDemandCharge;
    setSummary(summary);
  }

  const updateDieselCost = (dieselCost: number, dieselMonthCost: number, dieselAnnualCost: number) => {
    summary.dieselCost = dieselCost;
    summary.dieselMonthCost = dieselMonthCost;
    summary.annualDieselCost = dieselAnnualCost;
    setSummary(summary);
  }

  const updateTotalCosts = (totalCSBSummerMonth: number, totalCSBWinterMonth: number, annualCSBCost: number, annualSavings: number) => {
    summary.totalCSBSummer = totalCSBSummerMonth;
    summary.totalCSBWinter = totalCSBWinterMonth;
    summary.annualCSBCost = annualCSBCost;
    summary.annualSavings = annualSavings;
    setSummary(summary);
  }

  const addBusLocal = () => {
    const newBusId = Object.keys(buses).length + 1;
    const newBus: Bus = {
      id: newBusId,
      busModel: "N/A", 
      batteryCapacity: 0, 
      summerRange: 0,  
      winterRange: 0, 
      miles: "0",   
      kWhOneRouteSummer: 0, 
      kWhOneRouteWinter: 0,
      maxRoutesOneChargeSummer: 0, 
      maxRoutesOneChargeWinter: 0, 
      timeOfDay: "N/A", 
      chargerPower: 0,
      summerChargingTime: 0,
      winterChargingTime: 0,
      onPeakSummer: 0,
      dollarkWhSummer: 0,
      onPeakWinter: 0,
      dollarkWhWinter: 0,
      totalECSummer: 0,
      totalECWinter: 0,
      demandCharge: 0,
      totalDiesalCost: 0 
    };
    buses[newBusId] = newBus;
    setBuses(buses);
    setCount(newBusId);
  }

  const deleteLastBusLocal = () => {
    const keys = Object.keys(buses);
    const lastKey = keys[keys.length-1] as unknown as number;
    if(lastKey>1){
      delete(buses[lastKey]);
    }
    setBuses(buses);
  }

  useEffect(() => {
    localStorage.setItem("buses", JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem("summary", JSON.stringify(summary));
  }, [summary])

  return {buses, summary, addBusLocal, updateBusModelLocal, updateRouteMilesLocal, updateTimeOfDayLocal, updateChargerPowerLocal, updateResultsLocal, deleteLastBusLocal, updateDailyCost, updateOnPeakkWH, updateDieselCost, updateTotalCosts};

};

export default useLocalStorage;