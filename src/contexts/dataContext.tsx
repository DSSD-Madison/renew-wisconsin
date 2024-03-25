import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { db, auth } from '~/config/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

export const DataContext = createContext<any>(undefined);

const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authed, setAuthed] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    busData: [],
    summerCharging: [],
    winterCharging: [],
    operationSchedule: [],
    rates: [],
    assumptions: []
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collections = ["buses", "winter_charging", "summer_charging", "operation_schedule", "rates", "assumptions"];
        const queries = collections.map((collectionName) => collection(db, collectionName));
        const snapshots = await Promise.all(queries.map((q) => getDocs(q)));

        const newData = Object.fromEntries(snapshots.map((snapshot, index) => [collections[index], snapshot.docs.map(doc => doc.data())]));
        setData(newData);
        console.log("Data fetched:", newData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = { loading, authed, setAuthed, data, setData };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
