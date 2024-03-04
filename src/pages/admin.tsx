import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "~/config/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Field, Label, Input } from "~/components/Form";
import { DataContext } from "~/contexts/dataContext";
import LoadingSpinner from "~/components/equipment/loading_bar"; // Assuming LoadingSpinner is in the same directory
import { updateDoc, doc, setDoc } from "firebase/firestore";

export default function Admin() {
  // Context
  const context = useContext(DataContext);
  
  // Authentication state
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Assumptions state
  const [dieselBusMilesPerGallon, setDieselBusMilesPerGallon] = useState(0);
  const [dieselDollarPerGallon, setDieselDollarPerGallon] = useState(0);
  const [summerEfficiency, setSummerEfficiency] = useState(0);
  const [summerMonthsInOperation, setSummerMonthsInOperation] = useState(0);
  const [winterEfficiency, setWinterEfficiency] = useState(0);
  const [winterMonthsInOperation, setWinterMonthsInOperation] = useState(0);

  // Bus data state
  const [busData, setBusData] = useState({});

  const [newBus, setNewBus] = useState({
    priceLow: 0,
    priceHigh: 0,
    company: "",
    model: "",
    maxPassengerCapacity: 0,
    gvwr: 0,
    maxChargeCapacity: 0,
    maxRange: 0,
    bidirectional: false,
    chargingPort: "",
    chargingType: [],
  });

  // Update state when data from context changes
  useEffect(() => {
    if (!context.loading && context.authed) {
      // Update assumptions state
      const assumptionsData = context.data.assumptions[0] || {};
      setDieselBusMilesPerGallon(assumptionsData.diesel_bus_miles_per_gallon || 0);
      setDieselDollarPerGallon(assumptionsData.diesel_dollar_per_gallon || 0);
      setSummerEfficiency(assumptionsData.summer_efficiency || 0);
      setSummerMonthsInOperation(assumptionsData.summer_months_in_op || 0);
      setWinterEfficiency(assumptionsData.winter_efficiency || 0);
      setWinterMonthsInOperation(assumptionsData.winter_months_in_op || 0);

      // Update bus data state
      setBusData(context.data.buses || []);
    }
  }, [context]);
  // Set auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle sign in
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthed(true);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setAuthed(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Handle adding a new bus
  const handleAddBus = async() => {
    // Add logic to handle adding a new bus
    try {
      // Add new bus to database
      const busToAdd = {
        bidirectional_charging: newBus.bidirectional,
        charging_port: newBus.chargingPort,
        charging_type: newBus.chargingType,
        company : newBus.company,
        gvwr: newBus.gvwr,
        max_charge_capacity: newBus.maxChargeCapacity,
        max_passenger_capacity: newBus.maxPassengerCapacity,
        maximum_range: newBus.maxRange,
        model: newBus.model,
        price_high: newBus.priceHigh,
        price_low: newBus.priceLow,
      }

      const busRef = doc(db, "buses", busToAdd.model);
      await setDoc(busRef, busToAdd);

      // Add new bus to busData
      context.data.buses.push(busToAdd);
      console.log("Bus added");
    }
    catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  const handleUpdateAssumptions = async () => {
    try {
      const assumptionsRef = doc(db, "assumptions", "assumptions");
      await updateDoc(assumptionsRef, {
        diesel_bus_miles_per_gallon: dieselBusMilesPerGallon,
        diesel_dollar_per_gallon: dieselDollarPerGallon,
        summer_efficiency: summerEfficiency,
        summer_months_in_op: summerMonthsInOperation,
        winter_efficiency: winterEfficiency,
        winter_months_in_op: winterMonthsInOperation,
      });
      context.data.assumptions[0] = {
        diesel_bus_miles_per_gallon: dieselBusMilesPerGallon,
        diesel_dollar_per_gallon: dieselDollarPerGallon,
        summer_efficiency: summerEfficiency,
        summer_months_in_op: summerMonthsInOperation,
        winter_efficiency: winterEfficiency,
        winter_months_in_op: winterMonthsInOperation,
      }
      console.log("Assumptions updated");
    } catch (error) {
      console.error("Error updating assumptions:", error);
    }
  }
  return (
    <section className="flex items-center justify-center p-4">
      {context.loading ? ( // Conditionally render loading spinner
        <LoadingSpinner />
      ) : authed ? ( // If authenticated
        <div className="flex-row items-center justify-center w-2/3">
          {/* Edit Assumptions */}
          <div className="bg-white p-8 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Assumptions</h2>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Diesel Bus Miles Per Gallon</Label>
                  <Input
                    id={id}
                    type="number"
                    value={dieselBusMilesPerGallon}
                    onChange={(e) => setDieselBusMilesPerGallon(Number(e.target.value))}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Diesel Dollar Per Gallon</Label>
                  <Input
                    id={id}
                    type="number"
                    value={dieselDollarPerGallon}
                    onChange={(e) => setDieselDollarPerGallon(Number(e.target.value))}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Summer Efficiency</Label>
                  <Input
                    id={id}
                    type="number"
                    value={summerEfficiency}
                    onChange={(e) => setSummerEfficiency(Number(e.target.value))}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Summer Months in Operation</Label>
                  <Input
                    id={id}
                    type="number"
                    value={summerMonthsInOperation}
                    onChange={(e) => setSummerMonthsInOperation(Number(e.target.value))}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Winter Efficiency</Label>
                  <Input
                    id={id}
                    type="number"
                    value={winterEfficiency}
                    onChange={(e) => setWinterEfficiency(Number(e.target.value))}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Winter Months in Operation</Label>
                  <Input
                    id={id}
                    type="number"
                    value={winterMonthsInOperation}
                    onChange={(e) => setWinterMonthsInOperation(Number(e.target.value))}
                  />
                </>
              )}
            </Field>
            <button className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600" onClick={handleUpdateAssumptions}>
              Update Assumptions
            </button>
          </div>
          {/* Add Bus */}
          <div className="bg-white p-8 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-semibold mb-4">Add Bus</h2>
            {/* Bus fields */}
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Price Low</Label>
                  <Input
                    id={id}
                    type="number"
                    value={newBus.priceLow}
                    onChange={(e) => setNewBus({ ...newBus, priceLow: Number(e.target.value) })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Price High</Label>
                  <Input
                    id={id}
                    type="number"
                    value={newBus.priceHigh}
                    onChange={(e) => setNewBus({ ...newBus, priceHigh: Number(e.target.value) })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Company Name</Label>
                  <Input
                    id={id}
                    value={newBus.company}
                    onChange={(e) => setNewBus({ ...newBus, company: e.target.value })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Model Name</Label>
                  <Input
                    id={id}
                    value={newBus.model}
                    onChange={(e) => setNewBus({ ...newBus, model: e.target.value })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Max Passenger Capacity</Label>
                  <Input
                    id={id}
                    type="number"
                    value={newBus.maxPassengerCapacity}
                    onChange={(e) => setNewBus({ ...newBus, maxPassengerCapacity: Number(e.target.value) })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>GVWR</Label>
                  <Input
                    id={id}
                    type="number"
                    value={newBus.gvwr}
                    onChange={(e) => setNewBus({ ...newBus, gvwr: Number(e.target.value) })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Max Charge Capacity</Label>
                  <Input
                    id={id}
                    type="number"
                    value={newBus.maxChargeCapacity}
                    onChange={(e) => setNewBus({ ...newBus, maxChargeCapacity: Number(e.target.value) })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Max Range</Label>
                  <Input
                    id={id}
                    type="number"
                    value={newBus.maxRange}
                    onChange={(e) => setNewBus({ ...newBus, maxRange: Number(e.target.value) })}
                  />
                </>
              )}
            </Field>
            <div className="w-4">
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Bidirectional</Label>
                  <Input
                    id={id}
                    type="checkbox"
                    checked={newBus.bidirectional}
                    onChange={(e) => setNewBus({ ...newBus, bidirectional: e.target.checked })}
                  />
                </>
              )}
            </Field>
            </div>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Charging Port</Label>
                  <Input
                    id={id}
                    value={newBus.chargingPort}
                    onChange={(e) => setNewBus({ ...newBus, chargingPort: e.target.value })}
                  />
                </>
              )}
            </Field>
            <Field>
              {(id) => (
                <>
                  <Label htmlFor={id}>Charging Type</Label>
                  {/* <Input
                    id={id}
                    value={newBus.chargingType}
                    onChange={(e) => setNewBus({ ...newBus, chargingType: e.target.value })}
                  /> */}
                </>
              )}
            </Field>
            <button className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600" onClick={handleAddBus}>
              Add Bus
            </button>
          </div>
          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Sign Out
          </button>
        </div>
      ) : ( // If not authenticated
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <br />
          <input
            type="email"
            className="w-full px-3 py-2 rounded border"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-3 py-2 rounded border mt-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      )}
    </section>
  );
}
