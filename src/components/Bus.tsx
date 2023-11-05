import React from 'react';
import {useState, useEffect} from 'react';

const Bus = (props) => {

    const buses = {
      "N/A": {
        "maxChargeCapacity": '',
        "maxRange": ''
      },
      "All American RE Electric": {
        "maxChargeCapacity": 155,
        "maxRange": 120
      },
      "Vision Electric": {
        "maxChargeCapacity": 155,
        "maxRange": 120
      },
      "Electric CE Series 1": {
        "maxChargeCapacity": 210,
        "maxRange": 135
      },
      "Electric CE Series 2": {
        "maxChargeCapacity": 315,
        "maxRange": 200
      },
      "LionC": {
        "maxChargeCapacity": 168,
        "maxRange": 155
      },
      "Saf-Tliner C2 Jouley": {
        "maxChargeCapacity": 226,
        "maxRange": 138
      }
    }

    const [busModel, setBusModel] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [maxRange, setBusMaxRange] = useState('');
    const [summerRange, setSummerRange] = useState('');
    const [winterRange, setWinterRange] = useState('');
    const [routeMiles, setRouteMiles] = useState('');
    const [kWhOneRouteSummer, setkWhOneRouteSummer] = useState('');
    const [kWhOneRouteWinter, setkWhOneRouteWinter] = useState('');
    const [maxRoutesSummer, setMaxRoutesSummer] = useState('');
    const [maxRoutesWinter, setMaxRoutesWinter] = useState('');

    function busModelChange(model) {
      setBusModel(model);
      setMaxCapacity(buses[model].maxChargeCapacity);
      const maxRangeTemp = buses[model].maxRange;
      setBusMaxRange(maxRangeTemp);
      const sumRange = (maxRangeTemp * 0.9).toFixed(1);
      const winRange = (sumRange * 0.8).toFixed(1); //Could be incorrect in excel sheet
      setSummerRange(sumRange);
      setWinterRange(winRange);
    }

    useEffect(() => {
      busRouteChange(routeMiles);
    },[busModel])

    function busRouteChange(miles){
      var error = document.getElementById("miles-error")
      if(error){
        error.innerHTML = "";
      }
      if(isNaN(miles)){
        var error = document.getElementById("miles-error")
        if(error){
          error.innerHTML = "Input is not a number";
        }
        return;
      }
      if(miles < 0){
        var error = document.getElementById("miles-error")
        if(error){
          error.innerHTML = "Input is less than 0";
        }
        return;
      }
      const milesTemp = Number(miles);
      setRouteMiles(milesTemp);
      const oneRouteSummer = ((maxCapacity / summerRange) * milesTemp).toFixed(3);
      const oneRouteWinter = ((maxCapacity / winterRange) * milesTemp).toFixed(3);
      if(isNaN(oneRouteSummer) || isNaN(oneRouteWinter) || isNaN(summerRange) || isNaN(winterRange) || isNaN(maxCapacity)){
        var error = document.getElementById("miles-error")
        if(error){
          error.innerHTML = "Please select a bus model"
        }
        return;
      }
      if((oneRouteSummer > (maxCapacity*0.9)) && oneRouteWinter > (maxCapacity*0.8)){
        if(error){
          error.innerHTML = "Route is too long for "+busModel+"'s battery capacity in Summer and Winter"
        }
        return;
      }
      if(oneRouteSummer > (maxCapacity*0.9)){
        if(error){
          error.innerHTML = "Route is too long for "+busModel+"'s battery capacity in Summer"
        }
        return;
      }
      if(oneRouteWinter > (maxCapacity*0.8)){
        if(error){
          error.innerHTML = "Route is too long for "+busModel+"'s battery capacity in Winter"
        }
        return;
      }
      setkWhOneRouteSummer(oneRouteSummer);
      setkWhOneRouteWinter(oneRouteWinter);
      const maxRoutesSummerTemp = ((0.9 * maxCapacity) / oneRouteSummer).toFixed(3);
      const maxRoutesWinterTemp = ((0.8 * maxCapacity) / oneRouteWinter).toFixed(3);
      setMaxRoutesSummer(maxRoutesSummerTemp);
      setMaxRoutesWinter(maxRoutesWinterTemp);
    }

    return(
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4"/> 
          <div className="collapse-title text-xl font-medium">
            Bus #{props.id}
          </div>
          <div className="collapse-content">
            <div className="md:inline-flex w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bus Model</span>
                </label>
                <select className="select select-bordered w-full max-w-xs" value={busModel} onChange={e => busModelChange(e.target.value)}>
                  <option>N/A</option>
                  <option>All American RE Electric</option>
                  <option>Vision Electric</option>
                  <option>Electric CE Series 1</option>
                  <option>Electric CE Series 2</option>
                  <option>LionC</option>
                  <option>Saf-Tliner C2 Jouley</option>
                </select>
                </div>
                <div className="w-full m-4">
                  <span className="text-sm">Max. Battery Capacity: <span className="font-bold">{maxCapacity}</span> kWh</span><br/>
                  <span className="text-sm">Summer Range: <span className="font-bold">{summerRange}</span> miles</span><br/>
                  <span className="text-sm">Winter Range: <span className="font-bold">{winterRange}</span> miles</span><br/>
                </div>
            </div>
            <div className="inline-flex w-full">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Miles in Bus Route</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={routeMiles} onChange={e => busRouteChange(e.target.value)}/>
                <label className="label">
                  <span className="label-text-alt text-red-700 font-semibold" id="miles-error"></span>
                </label>
              </div>
              <div className="w-full m-4">
                  <span className="text-sm">kWh used after 1 route in Summer: <span className="font-bold">{kWhOneRouteSummer}</span> kWh</span><br/>
                  <span className="text-sm">kWh used after 1 route in Winter: <span className="font-bold">{kWhOneRouteWinter}</span> kWh</span><br/>
                  <span className="text-sm">Max. routes on 1 Charge in Summer: <span className="font-bold">{maxRoutesSummer}</span> routes</span><br/>
                  <span className="text-sm">Max. routes on 1 Charge in Winter: <span className="font-bold">{maxRoutesWinter}</span> routes</span><br/>
                </div>
            </div>
          </div>
        </div>
    );
}

export default Bus;