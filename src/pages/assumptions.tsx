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
    const monthsData: MonthsData = context.data.operation_schedule[0];

    const initalDistrictCharge: DistrictDemandCharge = context.data.rates[0];
    const initalSummerCharges: SummerWinterCharges = context.data.rates[1];
    const initalWinterCharges: SummerWinterCharges = context.data.rates[2];

    const rates = context.data.rates;
    const assumptions = context.data.assumptions;
    
    const [values, setValues] = useState({
      districtCharge: initalDistrictCharge,
      summerCharges:  initalSummerCharges,
      winterCharges:  initalWinterCharges,
      sumEff: Number(assumptions[0]['summer_efficiency'] != undefined ? assumptions[0]['summer_efficiency'] : 0.9) * 100,
      winEff: Number(assumptions[0]['winter_efficiency'] != undefined ? assumptions[0]['winter_efficiency'] : 0.8) * 100,
      summerOp: Number(assumptions[0]['summer_months_in_op'] != undefined ? assumptions[0]['summer_months_in_op'] : 1),
      winterOp: Number(assumptions[0]['winter_months_in_op'] != undefined ? assumptions[0]['winter_months_in_op'] : 8),
      milesPerGallon: Number(assumptions[0]['diesel_bus_miles_per_gallon'] != undefined ? assumptions[0]['diesel_bus_miles_per_gallon'] : 6),
      dollarsPerGallon: Number(assumptions[0]['diesel_dollar_per_gallon'] != undefined ? assumptions[0]['diesel_dollar_per_gallon'] : 3.72)
    });

    const handleEfficiencyChange = (key: string, value: number) => {
      setValues((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

    const handleRatesChange = (key: string, value: number) => {

    };

    const handleMonthsChange = (updatedMonthsData: MonthsData) => {

    }
    
    return (
      
      <section className="content-center">
          <div className="flex justify-center items-center h-full w-full">
  
            <div className="flex-wrap">
              <div className='m-5 p-5'>
              <h1 className="text-2xl font-bold">Efficiencies</h1>
              <EfficienciesTable
                sumEff={values.sumEff}
                winEff={values.winEff}
                summerOp={values.summerOp}
                winterOp={values.winterOp}
                milesPerGallon={values.milesPerGallon}
                dollarsPerGallon={values.dollarsPerGallon}
                onValueChange={handleEfficiencyChange}
              />
              </div>
              
              <div className='m-5 p-5'>
                <h1 className="text-2xl font-bold">Demand Charges</h1>
                <DemandChargesTable 
                  summerCharges={values.summerCharges}
                  winterCharges={values.winterCharges}
                  districtCharge={values.districtCharge} 
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
  
  