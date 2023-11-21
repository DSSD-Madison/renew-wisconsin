import Bus from "../components/Bus";
import {useState, useContext} from "react";
import { DataContext } from "~/contexts/dataContext";

export default function Home() {
  const context = useContext(DataContext);

  return (
    <section className="w-screen h-screen content-center">
        <div className="flex justify-center items-center h-full w-full">
          <div className="bg-white justify-center h-5/6 w-9/12 mt-14 rounded-lg">
            <div className="join join-vertical w-full">
              <Bus id="1"/>
              <Bus id="2"/>
            </div>
            <h1 className="p-10">
              Total Electricity Cost per Day in Summer: <span className="text-blue-700">$4.25</span><br/>
              Total Electricity Cost per Day in Winter: <span className="text-blue-700">$5.28</span><br/>
              Total Diesel Cost per Day: <span className="text-blue-700">$43.33</span><br/>
            </h1>
          </div>
        </div>
    </section>
  )
};