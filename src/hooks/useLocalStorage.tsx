import { useState, useEffect } from "react";

const useLocalStorage = (key: string, defaultValue : string) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  

  useEffect(() => {
    const buses = {
        bus1: {
            busModel: "hi",
            miles: undefined,
            timeOfDay: undefined,
            chargerPower: undefined
        }
      }
    localStorage.setItem("busAcc", JSON.stringify(buses));
  });

  return [value, setValue];
};

export default useLocalStorage;