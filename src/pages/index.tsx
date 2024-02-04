import Bus from "../components/Bus";
import {useState, useContext} from "react";
import { DataContext } from "~/contexts/dataContext";
import BusAccordion from "~/components/BusAccordion";
import useLocalStorage from "~/hooks/useLocalStorage";

export default function Home() {

  const [theme, setTheme] = useLocalStorage("theme","dark");

  return (
    <section className="w-screen h-screen content-center">
        <div className="flex justify-center items-center h-full w-full">
          <div className="justify-center h-5/6 w-9/12 mt-14">
            <BusAccordion/>
          </div>
          <button onClick={() => theme === "light" ? setTheme("dark") : setTheme("light")}>Toggle theme</button>
        </div>
    </section>
  )
};