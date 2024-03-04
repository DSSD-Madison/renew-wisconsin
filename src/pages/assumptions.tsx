import React from 'react';
import { DataContext } from "~/contexts/dataContext";
import {useState, useContext} from "react";
import Calendar from "~/components/Calendar";
import {MonthsData} from "~/components/Calendar";
import DemandChargesTable from "~/components/DemandChargesTable";
import {SummerWinterCharges, DistrictDemandCharge} from "~/components/DemandChargesTable";

export default function Input() {
    const context = useContext(DataContext);
    if (context.loading) {
      return <h1></h1>
    }
    const monthsData: MonthsData = context.data.operation_schedule[0];

    const districtCharge: DistrictDemandCharge = context.data.rates[0];
    const summerCharges: SummerWinterCharges = context.data.rates[1];
    const winterCharges: SummerWinterCharges = context.data.rates[2];

    const assumptions = context.data.assumptions;
    const sumEff = Number(assumptions[0]['summer_efficiency'] != undefined ? assumptions[0]['summer_efficiency'] : 0.9) * 100;
    const winEff = Number(assumptions[0]['winter_efficiency'] != undefined ? assumptions[0]['winter_efficiency'] : 0.8) * 100;
    const summerOp = Number(assumptions[0]['summer_months_in_op'] != undefined ? assumptions[0]['summer_months_in_op'] : 1);
    const winterOp = Number(assumptions[0]['winter_months_in_op'] != undefined ? assumptions[0]['winter_months_in_op'] : 8);
    const milesPerGallon = Number(assumptions[0]['diesel_bus_miles_per_gallon'] != undefined ? assumptions[0]['diesel_bus_miles_per_gallon'] : 6);
    const dollarsPerGallon = Number(assumptions[0]['diesel_dollar_per_gallon'] != undefined ? assumptions[0]['diesel_dollar_per_gallon'] : 3.72);
  
    return (
      
      <section className="content-center">
          <div className="flex justify-center items-center h-full w-full">
  
            <div className="flex-wrap">
              <div className='m-5 p-5'>
              <h1 className="text-2xl font-bold">Efficiencies</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Summer Efficiency (%)</th>
                      <th>Winter Efficiency (%)</th>
                      <th>Summer Months in Operation</th>
                      <th>Winter Months in Operation</th>
                      <th>Diesel Bus Miles/Gallon</th>
                      <th>Diesel $/Gallon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{sumEff}%</td>
                      <td>{winEff}%</td>
                      <td>{summerOp}</td>
                      <td>{winterOp}</td>
                      <td>{milesPerGallon}</td>
                      <td>${dollarsPerGallon}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className='m-5 p-5'>
                <h1 className="text-2xl font-bold">Demand Charges</h1>
                <DemandChargesTable summerCharges={summerCharges} winterCharges={winterCharges} districtCharge={districtCharge} />
              </div>
              <div className='m-5 p-5'>
                <h1 className="text-2xl font-bold">Bus Operating Months</h1>
                <Calendar monthsData={monthsData} />
              </div>
              
            </div>

            
  
          </div>
          
      </section>
    )
  }
  
  