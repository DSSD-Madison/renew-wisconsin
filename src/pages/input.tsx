import { DataContext } from "~/contexts/dataContext";
import {useState, useContext} from "react";

export default function Input() {
    const context = useContext(DataContext);
    return (
    <section className="w-screen h-screen content-center">
        <div className="flex justify-center items-center h-full w-full">
          {context?.rates[0].district_demand_charge}
        </div>
    </section>
    )
  }
  