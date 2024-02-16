import { useState, useEffect } from "react";

type Bus = {
  busModel: string;
  miles:  number;
  timeOfDay: string;
  chargerPower: string
};

type Buses = {
  [id: number] : Bus;
};

const initialBusesState: Buses = {
  1: { busModel: "N/A", miles: 0, timeOfDay: "N/A", chargerPower: "N/A" }
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
          console.log(buses);
          setBuses(buses);
          break;
        case "miles":
          buses[id].miles = typeof newValue === 'number' ? newValue : Number(newValue);
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
        default:
          break;
      }
    }
  }

  const addBusLocal = () => {
    var tempCount = count+1;
    setBuses(prevBuses => ({...prevBuses, [tempCount]: { busModel: "N/A", miles: 0, timeOfDay: "N/A", chargerPower: "N/A" }}))
    setCount(tempCount);
  }

  useEffect(() => {
    localStorage.setItem("buses", JSON.stringify(buses));
  }, [buses]);

  return {buses, addBusLocal, updateBusesLocal};

};

export default useLocalStorage;