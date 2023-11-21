import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { db } from '~/config/firebaseConfig';
import { collection, query, addDoc, getDocs } from "firebase/firestore";

export const DataContext = createContext<any>(undefined);

const DataContextProvider = ({ children }: { children: ReactNode }) => {

  const [busData, setBusData] = useState<any[]>([]);
  const [summerCharging, setSummerCharging] = useState<any[]>([]);
  const [winterCharging, setWinterCharging] = useState<any[]>([]);
  const [operationSchedule, setOperationSchedule] = useState<any[]>([]);
  const [rates, setRates] = useState<any[]>([]);
  const [assumptions, setAssumptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchBusData = async () => {
      const qBus = query(collection(db, "buses"));
      const qWC = query(collection(db, "winter_charging"));
      const qSC = query(collection(db, "summer_charging"));
      const qOS = query(collection(db, "operation_schedule"));
      const qR = query(collection(db, "rates"));
      const qA = query(collection(db, "assumptions"));

      const querySnapshotBus = await getDocs(qBus);
      const querySnapshotSC = await getDocs(qSC);
      const querySnapshotWC = await getDocs(qWC);
      const querySnapshotOS = await getDocs(qOS);
      const querySnapshotR = await getDocs(qR);
      const querySnapshotA = await getDocs(qWC);

      const busDataArrTmp: any[] = [];
      const summerChargingArrTmp: any[] = [];
      const winterChargingArrTmp: any[] = [];
      const operationScheduleArrTmp: any[] = [];
      const ratesArrTmp: any[] = [];
      const assumptionsArrTmp: any[] = [];

      querySnapshotBus.forEach((doc) => {
        busDataArrTmp.push(doc.data());
      });
      querySnapshotSC.forEach((doc) => {
        summerChargingArrTmp.push(doc.data());
      });
      querySnapshotWC.forEach((doc) => {
        winterChargingArrTmp.push(doc.data());
      });
      querySnapshotOS.forEach((doc) => {
        operationScheduleArrTmp.push(doc.data());
      });
      querySnapshotR.forEach((doc) => {
        ratesArrTmp.push(doc.data());
      });
      querySnapshotA.forEach((doc) => {
        assumptionsArrTmp.push(doc.data());
      });
  
      setBusData(busDataArrTmp); 
      setSummerCharging(summerChargingArrTmp);
      setWinterCharging(winterChargingArrTmp);
      setOperationSchedule(operationScheduleArrTmp);
      setRates(ratesArrTmp);
      setAssumptions(assumptionsArrTmp);

      console.log(
        busDataArrTmp
      )
      console.log(
        summerChargingArrTmp
      )
      console.log(
        winterChargingArrTmp
      )
      console.log(
        operationScheduleArrTmp
      )
      console.log(
        ratesArrTmp
      )
      console.log(
        assumptionsArrTmp
      )
    };

    fetchBusData();
  }, []);

  const value = { busData, summerCharging, winterCharging, operationSchedule, rates, assumptions };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
