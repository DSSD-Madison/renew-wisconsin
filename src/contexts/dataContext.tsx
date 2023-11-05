import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { db } from '~/config/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
export const DataContext = createContext<any[]>([]);

const DataContextProvider = ({ children }: { children: ReactNode }) => {

  const [busData, setBusData] = useState<any[]>([]);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const q = query(collection(db, "busses"));
        const querySnapshot = await getDocs(q);
        const busDataArrTmp: any[] = [];
    
        querySnapshot.forEach((doc) => {
          busDataArrTmp.push(doc.data());
        });
    
        setBusData(busDataArrTmp); // You need to define setBusData in your component or use state management like useState
      } catch (error) {
        console.error('Error fetching bus data:', error);
      }
    };

    fetchBusData();
  }, []);

  return (
    <DataContext.Provider value={busData}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
