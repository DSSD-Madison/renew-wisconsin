import { IconContext } from "react-icons";
import Bus from "../components/Bus";
import {BiPlus} from "react-icons/bi";
import {useState} from "react";

export default function Home() {
  const [busCount, setBusCount] = useState(1);
  const busAccordian = ["1"];

  const addBus = () => {
    setBusCount(busCount+1)
    busAccordian.push(busCount.toString())
    console.log(busCount)
};

  return (
    <section className="w-screen h-screen content-center">
        <div className="flex justify-center items-center h-full w-full">
          <div className="bg-white justify-center h-5/6 w-9/12 mt-14 rounded-lg">
            <div className="join join-vertical w-full">
              <Bus id="1"/>
              <Bus id="2"/>
              <Bus id="3"/>
              <Bus id="4"/>
              <Bus id="5"/>
            </div>
            <div className="inline-flex float-right pt-4 px-4" onClick={addBus}>
              <button className="text-blue-700 font-bold">
                Add Bus
              </button>
              <BiPlus size={24}/>
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

/**<h1 className="p-10">
Total Electricity Cost per Day in Summer: <span className="text-blue-700">$4.25</span>
Total Electricity Cost per Day in Winter: <span className="text-blue-700">$5.28</span>
Total Diesel Cost per Day: <span className="text-blue-700">$43.33</span>
</h1>**/