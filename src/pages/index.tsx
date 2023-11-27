import Bus from "../components/Bus";
import {useState, useContext} from "react";
import { DataContext } from "~/contexts/dataContext";

export default function Home() {
  const context = useContext(DataContext);

  return (
    <section className="w-screen h-screen content-center">
        <div className="flex justify-center items-center h-full w-full">
          <div className="bg-white justify-center h-5/6 w-9/12 mt-14 rounded-lg">
            <BusAccordion/>
          </div>
        </div>
    </section>
  )
};