import Bus from "../components/Bus";
import {useState, useContext} from "react";
import { DataContext } from "~/contexts/dataContext";
import BusAccordion from "~/components/BusAccordion";
import useLocalStorage from "~/hooks/useLocalStorage";

export default function Home() {
  const {buses} = useLocalStorage();

  return (
    <section className="content-center">
        <div className="flex justify-center items-center h-full w-full">
          <div className="justify-center h-5/6 w-9/12 mt-14">
            <BusAccordion/>
          </div>
        </div>
    </section>
  )
};