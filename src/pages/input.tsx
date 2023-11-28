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
    const monthsData: MonthsData = context.operationSchedule[0];

    const summerCharges: SummerWinterCharges = context.rates[1];
    const winterCharges: SummerWinterCharges = context.rates[2];
    const districtCharge: DistrictDemandCharge = context.rates[0];
    console.log(context.rates);

    
     /*

    Summer efficiency
    winter efficiency
    summer months in operation
    winter months in operation
    diesel bus miles/gallon
    On peak and off peak pricing 

    Summer: 
    - On-Peak $/kWh : 0.0885
    - Off-Peak $/kWh : 0.0540
    - On-Peak $/kW : 13.00

    Winter:
    - On-Peak $/kWh : 0.08
    - Off-Peak $/kWh : 0.0540
    - On-Peak $/kW : 11.00

    demand charges table
    Max kW per month - all charger powers combined
    $/kW for Dist Demand, from on/off peak pricing table
    Potential Dist Demand = Max kW * $/kW for Dist Demand

    */
    return (
      
      <section className="w-screen h-screen content-center">
        
          <div className="flex justify-center items-center h-full w-full">
  
            <div className="flex-wrap">
              <div className='m-5 p-5'>
                <h1>Efficiencies</h1>
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
                      <td>90</td>
                      <td>80</td>
                      <td>1</td>
                      <td>8</td>
                      <td>6.0</td>
                      <td>$4.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className='m-5 p-5'>
                <h1>Demand Charges</h1>
                <DemandChargesTable summerCharges={summerCharges} winterCharges={winterCharges} districtCharge={districtCharge} />
              </div>
              <div className='m-5 p-5'>
                <h1>Bus Operating Months</h1>
                <Calendar monthsData={monthsData} />
              </div>
              
            </div>

            
  
          </div>
          
      </section>
    )
  }
  
  