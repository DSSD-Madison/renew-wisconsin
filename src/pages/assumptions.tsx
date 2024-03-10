import React from 'react';
import { DataContext } from "~/contexts/dataContext";
import {useState, useContext} from "react";
import Calendar from "~/components/Calendar";
import {MonthsData} from "~/components/Calendar";
import DemandChargesTable from "~/components/DemandChargesTable";
import {SummerWinterCharges, DistrictDemandCharge} from "~/components/DemandChargesTable";
import EfficienciesTable from '~/components/EfficienciesTable';

export default function Input() {
    const context = useContext(DataContext);
    if (context.loading) {
      return <h1></h1>
    }
    const setData = context.setData;
    console.log(context.data)
    const monthsData: MonthsData = context.data.operation_schedule[0];

    const rates = context.data.rates;
    const districtCharge: DistrictDemandCharge = rates[0];
    const summerCharges: SummerWinterCharges = rates[1];
    const winterCharges: SummerWinterCharges = rates[2];

    const assumptions = context.data.assumptions;
    //console.log("Assumptions: ", assumptions);
        
    const sumEff = Number(assumptions[0]['summer_efficiency'] != undefined ? assumptions[0]['summer_efficiency'] : 0.9) * 100
    const winEff = Number(assumptions[0]['winter_efficiency'] != undefined ? assumptions[0]['winter_efficiency'] : 0.8) * 100
    const summerOp = Number(assumptions[0]['summer_months_in_op'] != undefined ? assumptions[0]['summer_months_in_op'] : 1)
    const winterOp = Number(assumptions[0]['winter_months_in_op'] != undefined ? assumptions[0]['winter_months_in_op'] : 8)
    const milesPerGallon = Number(assumptions[0]['diesel_bus_miles_per_gallon'] != undefined ? assumptions[0]['diesel_bus_miles_per_gallon'] : 6)
    const dollarsPerGallon = Number(assumptions[0]['diesel_dollar_per_gallon'] != undefined ? assumptions[0]['diesel_dollar_per_gallon'] : 3.72)
    

    const handleEfficiencyChange = (key: string, value: number) => {
      const newAssump = [...assumptions];
      newAssump[0] = {...newAssump[0], [key]: value}
      setData((prevState:any) => ({...prevState, assumptions:newAssump}))
    };

    const handleRatesChange = (key: string, value: number) => {
      const newRates = [...rates]
      if (key === 'districtCharge') {
        newRates[0] = {district_demand_charge: value};
      } else {
        const [season, field] = key.split(/_(.*)/s);
        if (season === 'summer') {
          newRates[1] = {...newRates[1], [field]: value}
        } else {
          newRates[2] = {...newRates[2], [field]: value}
        }
      }

      setData((prevState:any) => ({...prevState, rates:newRates}))

    };

    const handleMonthsChange = (updatedMonthsData: MonthsData) => {
      
      const newMonths = [...context.data.operation_schedule]
      newMonths[0] = updatedMonthsData
      console.log(updatedMonthsData)
      setData((prevState:any) => ({...prevState, operation_schedule:newMonths}))

    }
    
    return (
      
      <section className="content-center">
          <div className="flex justify-center items-center h-full w-full">
  
            <div className="flex-wrap">
              <div className='m-5 p-5'>
              <h1 className="text-2xl font-bold">Efficiencies</h1>
              <EfficienciesTable
                summer_efficiency={sumEff}
                winter_efficiency={winEff}
                summer_months_in_op={summerOp}
                winter_months_in_op={winterOp}
                diesel_bus_miles_per_gallon={milesPerGallon}
                diesel_dollar_per_gallon={dollarsPerGallon}
                onValueChange={handleEfficiencyChange}
              />
              </div>
              
              <div className='m-5 p-5'>
                <h1 className="text-2xl font-bold">Demand Charges</h1>
                <DemandChargesTable 
                  summerCharges={summerCharges}
                  winterCharges={winterCharges}
                  districtCharge={districtCharge} 
                  onValueChange={handleRatesChange} />
              </div>
              <div className='m-5 p-5'>
                <h1 className="text-2xl font-bold">Bus Operating Months</h1>
                <Calendar 
                  monthsData={monthsData} 
                  onMonthsDataChange={handleMonthsChange}/>
              </div>
              
            </div>

            
  
          </div>
          
      </section>
    )
  }
  
  