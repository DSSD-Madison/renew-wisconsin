import React from 'react';
import {useState} from 'react';

const Bus = (props) => {

    const buses = {
      "Bus Model": {
        "maxChargeCapacity": '',
        "maxRange": ''
      },
      "LionC": {
        "maxChargeCapacity": 168,
        "maxRange": 155
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
        "maxRange": 315
      },
      "Electric CE Series 2": {
        "maxChargeCapacity": 315,
        "maxRange": 200
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

    function busModelChange(model) {
      setBusModel(model);
      setMaxCapacity(buses[model].maxChargeCapacity);
      const maxRangeTemp = buses[model].maxRange;
      setBusMaxRange(maxRangeTemp);
      const sumRange = maxRangeTemp * 0.9;
      const winRange = maxRangeTemp * 0.8;
      setSummerRange(sumRange)
      setWinterRange(winRange)
    }

    return(
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4"/> 
          <div className="collapse-title text-xl font-medium">
            Bus #{props.id}
          </div>
          <div className="collapse-content">
            <div className="inline-flex w-full">
              <select className="select select-bordered w-full max-w-xs" value={busModel} onChange={e => busModelChange(e.target.value)}>
                <option>Bus Model</option>
                <option>All American RE Electric</option>
                <option>Vision Electric</option>
                <option>Electric CE Series 1</option>
                <option>Electric CE Series 2</option>
                <option>LionC</option>
                <option>Saf-Tliner C2 Jouley</option>
              </select>
              <div className="px-4 w-full">
                <span className="text-sm">Max. Battery Capacity: <span className="font-bold">{maxCapacity}</span> kWh</span><br/>
                <span className="text-sm">Summer Range: <span className="font-bold">{summerRange}</span> miles</span><br/>
                <span className="text-sm">Winter Range: <span className="font-bold">{winterRange}</span> miles</span><br/>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Bus;