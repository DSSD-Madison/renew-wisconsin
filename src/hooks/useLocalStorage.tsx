import { useState, useEffect } from "react";

type Bus = {
  busModel: string;
  batteryCapacity: number;
  summerRange: number;
  winterRange: number;
  miles:  number;
  kWhOneRouteSummer: number;
  kWhOneRouteWinter: number;
  maxRoutesOneChargeSummer: number;
  maxRoutesOneChargeWinter: number;
  timeOfDay: string;
  chargerPower: string;
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
    busModel: "N/A", 
    batteryCapacity: 0, 
    summerRange: 0,  
    winterRange: 0, 
    miles: 0,   
    kWhOneRouteSummer: 0, 
    kWhOneRouteWinter: 0,
    maxRoutesOneChargeSummer: 0, 
    maxRoutesOneChargeWinter: 0, 
    timeOfDay: "N/A", 
    chargerPower: "N/A",
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
    //const storedBuses = localStorage.getItem('buses');
    //return storedBuses ? JSON.parse(storedBuses) : initialBusesState;
    return initialBusesState;
  });
  const [count, setCount] = useState(1);

  const updateBusesLocal = (id : number, field: string, newValue: any) => {
    if(id <= count && id >= 1){
      switch(field) {
        case "busModel":
          buses[id].busModel = typeof newValue === 'string' ? newValue : String(newValue);
          setBuses(buses);
          break;
        case "maxCapacity":
          buses[id].batteryCapacity = typeof newValue === "number" ? newValue : Number(newValue);
          setBuses(buses);
          break;
        case "summerRange":
          buses[id].summerRange = typeof newValue === "number" ? newValue : Number(newValue);
          setBuses(buses);
          break;
        case "winterRange":
          buses[id].winterRange = typeof newValue === "number" ? newValue : Number(newValue);
          setBuses(buses);
          break;
        case "miles":
          buses[id].miles = typeof newValue === 'number' ? newValue : Number(newValue);
          setBuses(buses);
          break;
        case "kWhOneRouteSummer":
          buses[id].kWhOneRouteSummer = typeof newValue === 'number' ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "kWhOneRouteWinter":
          buses[id].kWhOneRouteWinter = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "maxRoutesSummer":
          buses[id].maxRoutesOneChargeSummer = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "maxRoutesWinter":
          buses[id].maxRoutesOneChargeWinter = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "timeOfDay":
          buses[id].timeOfDay = typeof newValue === 'string' ? newValue : String(newValue);
          setBuses(buses);
          break;
        case "chargerPower":
          buses[id].chargerPower = typeof newValue === "string" ? newValue : String(newValue);
          setBuses(buses);
          break;
        case "summerChargingTime":
          buses[id].summerChargingTime = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "winterChargingTime":
          buses[id].winterChargingTime = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "onPeakSummer":
          buses[id].onPeakSummer = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "onPeakWinter":
          buses[id].onPeakWinter = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "kWhSummer":
          buses[id].dollarkWhSummer = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "kwhWinter":
          buses[id].dollarkWhWinter = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "summerCost":
          buses[id].totalECSummer = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "winterCost":
          buses[id].totalECWinter = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "demandCharge":
          buses[id].demandCharge = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        case "dieselCostPerDay":
          buses[id].totalDiesalCost = typeof newValue === "number" ? newValue: Number(newValue);
          setBuses(buses);
          break;
        default:
          console.log("Couldn't find value");
          break;
      }
    }
  }

  /*const addBusLocal = () => {
    var tempCount = count+1;
    setBuses(prevBuses => ({...prevBuses, [tempCount]: { busModel: "N/A", miles: 0, timeOfDay: "N/A", chargerPower: "N/A" }}))
    setCount(tempCount);
  }*/

  useEffect(() => {
    localStorage.setItem("buses", JSON.stringify(buses));
  }, [buses]);

  return {buses, updateBusesLocal};

};

export default useLocalStorage;