import { IconContext } from "react-icons";
import {BiPlus} from "react-icons/bi";
import Bus from "../components/Bus";
import {useState} from "react";
import BusAccordion from "~/components/BusAccordion";

export default function Home() {

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