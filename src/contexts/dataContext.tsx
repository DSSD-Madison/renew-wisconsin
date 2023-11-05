import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { db } from '~/config/firebaseConfig';
import { collection, query, addDoc, getDocs } from "firebase/firestore";

export const DataContext = createContext<any>(undefined);

const DataContextProvider = ({ children }: { children: ReactNode }) => {

  const [busData, setBusData] = useState<any[]>([]);
  const [summerCharging, setSummerCharging] = useState<any[]>([]);
  const [winterCharging, setWinterCharging] = useState<any[]>([]);

  useEffect(() => {
    const fetchBusData = async () => {
      const qBus = query(collection(db, "busses"));
      const qWC = query(collection(db, "winter_charging"));
      const qSC = query(collection(db, "summer_charging"));

      const querySnapshotBus = await getDocs(qBus);
      const querySnapshotSC = await getDocs(qSC);
      const querySnapshotWC = await getDocs(qWC);

      const busDataArrTmp: any[] = [];
      const summerChargingArrTmp: any[] = [];
      const winterChargingArrTmp: any[] = [];

      querySnapshotBus.forEach((doc) => {
        busDataArrTmp.push(doc.data());
      });
      querySnapshotSC.forEach((doc) => {
        summerChargingArrTmp.push(doc.data());
      });
      querySnapshotWC.forEach((doc) => {
        winterChargingArrTmp.push(doc.data());
      });
  
      setBusData(busDataArrTmp); 
      setSummerCharging(summerChargingArrTmp);
      setWinterCharging(winterChargingArrTmp);

      console.log(
        busDataArrTmp
      )
      console.log(
        summerChargingArrTmp
      )
      console.log(
        winterChargingArrTmp
      )
    };

    fetchBusData();
  }, []);

  const value = { busData, summerCharging, winterCharging };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
