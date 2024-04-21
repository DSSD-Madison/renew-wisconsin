import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "~/config/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Field, Label, Input } from "~/components/Form";
import { DataContext } from "~/contexts/dataContext";
import LoadingSpinner from "~/components/equipment/loading_bar";
import { updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

const fbAuthErrors: Record<string, string> = {
  "admin-restricted-operation": "This operation is restricted to administrators only.",
  "argument-error": "",
  "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
  "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
  "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
  "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
  "cordova-not-ready": "Cordova framework is not ready.",
  "cors-unsupported": "This browser is not supported.",
  "credential-already-in-use": "This credential is already associated with a different user account.",
  "custom-token-mismatch": "The custom token corresponds to a different audience.",
  "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
  "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
  "email-change-needs-verification": "Multi-factor users must always have a verified email.",
  "email-already-in-use": "The email address is already in use by another account.",
  "expired-action-code": "The action code has expired. ",
  "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
  "internal-error": "An internal error has occurred.",
  "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
  "invalid-app-id": "The mobile app identifier is not registed for the current project.",
  "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
  "invalid-auth-event": "An internal error has occurred.",
  "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
  "invalid-continue-uri": "The continue URL provided in the request is invalid.",
  "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
  "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
  "invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
  "invalid-email": "The email address is badly formatted.",
  "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
  "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
  "invalid-credential": "The supplied auth credential is malformed or has expired.",
  "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
  "invalid-multi-factor-session": "The request does not contain a valid proof of first factor successful sign-in.",
  "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
  "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
  "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
  "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
  "wrong-password": "The password is invalid or the user does not have a password.",
  "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
  "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
  "invalid-provider-id": "The specified provider ID is invalid.",
  "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
  "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
  "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
  "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
  "multi-factor-info-not-found": "The user does not have a second factor matching the identifier provided.",
  "multi-factor-auth-required": "Proof of ownership of a second factor is required to complete sign-in.",
  "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
  "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
  "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
  "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
  "missing-continue-uri": "A continue URL must be provided in the request.",
  "missing-iframe-start": "An internal error has occurred.",
  "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
  "missing-multi-factor-info": "No second factor identifier is provided.",
  "missing-multi-factor-session": "The request is missing proof of first factor successful sign-in.",
  "missing-or-invalid-nonce": "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
  "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
  "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
  "app-deleted": "This instance of FirebaseApp has been deleted.",
  "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
  "network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
  "no-auth-event": "An internal error has occurred.",
  "no-such-provider": "User was not linked to an account with the given provider.",
  "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
  "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
  "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
  "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
  "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
  "provider-already-linked": "User can only be linked to one identity for the given provider.",
  "quota-exceeded": "The project's quota for this operation has been exceeded.",
  "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
  "redirect-operation-pending": "A redirect sign-in operation is already pending.",
  "rejected-credential": "The request contains malformed or mismatching credentials.",
  "second-factor-already-in-use": "The second factor is already enrolled on this account.",
  "maximum-second-factor-count-exceeded": "The maximum allowed number of second factors on a user has been exceeded.",
  "tenant-id-mismatch": "The provided tenant ID does not match the Auth instance's tenant ID",
  timeout: "The operation has timed out.",
  "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
  "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
  "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
  "unsupported-first-factor": "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
  "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
  "unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
  "unverified-email": "The operation requires a verified email.",
  "user-cancelled": "The user did not grant your application the permissions it requested.",
  "user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
  "user-disabled": "The user account has been disabled by an administrator.",
  "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
  "user-signed-out": "",
  "weak-password": "The password must be 6 characters long or more.",
  "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
}


export default function Admin() {
  const context = useContext(DataContext);

  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [dieselBusMilesPerGallon, setDieselBusMilesPerGallon] = useState(0);
  const [dieselDollarPerGallon, setDieselDollarPerGallon] = useState(0);
  const [summerEfficiency, setSummerEfficiency] = useState(0);
  const [summerMonthsInOperation, setSummerMonthsInOperation] = useState(0);
  const [winterEfficiency, setWinterEfficiency] = useState(0);
  const [winterMonthsInOperation, setWinterMonthsInOperation] = useState(0);
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
    chargingType: [] as string[],
  });

  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("assumptions");
  const [toDelete, setToDelete] = useState("");

  const DeleteModal = () => {
    return (
      <>
        {
          toDelete !== "" && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Delete Bus: {toDelete}</h3>
                <p className="text-l mb-4">Are you sure you want to delete this bus?</p>
                <button onClick={() => setToDelete("")} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mr-2">Cancel</button>
                <button onClick={() => handleDeleteBus(toDelete)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          )
        }
      </>
    )
  }

  useEffect(() => {
    if (!context.loading && context.authed) {
      const assumptionsData = context.data.assumptions[0] || {};
      setDieselBusMilesPerGallon(assumptionsData.diesel_bus_miles_per_gallon || 0);
      setDieselDollarPerGallon(assumptionsData.diesel_dollar_per_gallon || 0);
      setSummerEfficiency(assumptionsData.summer_efficiency || 0);
      setWinterEfficiency(assumptionsData.winter_efficiency || 0);

      setBusData(context.data.buses || []);
    }
  }, [context]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthed(user !== null);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthed(true);
      setAuthError("");
    } catch (error: any) {
      const errorMessage = fbAuthErrors[error.code.split("/")[1]] || "An error occurred.";
      setAuthError(errorMessage);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setAuthed(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddBus = async () => {
    try {
      
      if (newBus.model === "") {
        setError("Model name cannot be empty.");
        return;
      }
      if (newBus.company === "") {
        setError("Company name cannot be empty.");
        return;
      }
      // Validate input fields
      if (newBus.priceLow < 0 || newBus.priceHigh < 0) {
        setError("Price values cannot be negative.");
        return;
      }
      if (newBus.maxPassengerCapacity < 0) {
        setError("Max passenger capacity cannot be negative.");
        return;
      }
      if (newBus.gvwr < 0) {
        setError("GVWR cannot be negative.");
        return;
      }
      if (newBus.maxChargeCapacity < 0) {
        setError("Max charge capacity cannot be negative.");
        return;
      }
      if (newBus.maxRange < 0) {
        setError("Max range cannot be negative.");
        return;
      }
      if (newBus.chargingPort === "") {
        setError("Charging port cannot be empty.");
        return;
      }
      if (newBus.chargingType.length === 0) {
        setError("Charging type cannot be empty.");
        return;
      }
      if (newBus.chargingType.some(type => !["1", "2", "3"].includes(type))) {
        setError("Charging type can only include values '1', '2', or '3'. Please enter a comma-separated list of these values with no spaces.");
        return;
      }
      
      const busToAdd = {
        bidirectional_charging: newBus.bidirectional,
        charging_port: newBus.chargingPort,
        charging_type: newBus.chargingType,
        company: newBus.company,
        gvwr: newBus.gvwr,
        max_charge_capacity: newBus.maxChargeCapacity,
        max_passenger_capacity: newBus.maxPassengerCapacity,
        maximum_range: newBus.maxRange,
        model: newBus.model,
        price_high: newBus.priceHigh,
        price_low: newBus.priceLow,
      };

      const busRef = doc(db, "buses", busToAdd.model);
      await setDoc(busRef, busToAdd);

      context.data.buses.push(busToAdd);

      setError("");
      alert("Bus added successfully!");
    } catch (error) {
      console.error("Error adding bus:", error);
      alert("An error occurred while adding the bus.");
    }
  };

  const handleUpdateAssumptions = async () => {
    try {
      // Validate input fields
      if (dieselBusMilesPerGallon < 0) {
        setError("Diesel bus miles per gallon cannot be negative.");
        return;
      }
      if (dieselDollarPerGallon < 0) {
        setError("Diesel dollar per gallon cannot be negative.");
        return;
      }
      if (summerEfficiency < 0) {
        setError("Summer efficiency cannot be negative.");
        return;
      }
      if (summerMonthsInOperation < 0) {
        setError("Summer months in operation cannot be negative.");
        return;
      }
      if (winterEfficiency < 0) {
        setError("Winter efficiency cannot be negative.");
        return;
      }
      if (winterMonthsInOperation < 0) {
        setError("Winter months in operation cannot be negative.");
        return;
      }
      
      const assumptionsRef = doc(db, "assumptions", "assumptions");
      await updateDoc(assumptionsRef, {
        diesel_bus_miles_per_gallon: dieselBusMilesPerGallon,
        diesel_dollar_per_gallon: dieselDollarPerGallon,
        summer_efficiency: summerEfficiency,
        winter_efficiency: winterEfficiency,
        winter_months_in_op: winterMonthsInOperation,
      });

      context.data.assumptions[0] = {
        diesel_bus_miles_per_gallon: dieselBusMilesPerGallon,
        diesel_dollar_per_gallon: dieselDollarPerGallon,
        summer_efficiency: summerEfficiency,
        winter_efficiency: winterEfficiency,
        winter_months_in_op: winterMonthsInOperation,
      };

      setError("");

      alert("Assumptions updated successfully!");
    } catch (error) {
      console.error("Error updating assumptions:", error);
      alert("An error occurred while updating the assumptions.");
    }
  };

  const handleDeleteBus = async (model : string) => {
    try {
      // Delete bus from database
      const busRef = doc(db, "buses", model);
      await deleteDoc(busRef);

      // Delete bus from context
      context.data.buses = context.data.buses.filter((bus: any) => bus.model !== model);

      alert("Bus deleted successfully!");
      setToDelete("");
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert("An error occurred while deleting the bus.");
    }
  }

  return (
    <section className={authed ? "flex h-full" : "w-screen h-full justify-center"}>
      {context.loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : authed ? (
        <>
          <DeleteModal />
          <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <ul>
              <li
                className={`mb-2 p-2 rounded cursor-pointer ${
                  activeTab === "assumptions" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("assumptions")}
              >
                Edit Assumptions
              </li>
              <li
                className={`mb-2 p-2 rounded cursor-pointer ${
                  activeTab === "addBus" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("addBus")}
              >
                Add Buses
              </li>
              <li
                className={`mb-2 p-2 rounded cursor-pointer ${
                  activeTab === "deleteBus" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("deleteBus")}
              >
                Delete Buses
              </li>
              <li
                className="mb-2 p-2 rounded cursor-pointer bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </li>
            </ul>
          </aside>
          <main className="flex-1 p-8">
            {activeTab === "assumptions" && (
              <div className="bg-white rounded-lg ">
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
                <p className="text-gray-500 text-sm mb-2">Example: 5</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 3.5</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 0.8</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 0.8</p>
                <p className="text-red-500 mt-2">{error}</p>
                <button
                  className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 "
                  onClick={handleUpdateAssumptions}
                >
                  Update Assumptions
                </button>
              </div>
            )}
            {activeTab === "addBus" && (
              <div className="bg-white rounded-lg ">
                <h2 className="text-2xl font-semibold mb-4">Add A New Bus</h2>
                
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
                <p className="text-gray-500 text-sm mb-2">Example: 350000</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 450000</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: ABC Motors</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: XYZ 3000</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 80</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 31000</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 210</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: 135</p>
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
                <p className="text-gray-500 text-sm mb-2">Example: (AC, DC)</p>
                <Field>
                  {(id) => (
                    <>
                      <Label htmlFor={id}>Charging Type</Label>
                      <Input
                        id={id}
                        type="text"
                        value={newBus.chargingType.join(',')}
                        onChange={(e) => setNewBus({ ...newBus, chargingType: e.target.value.split(',') })}
                        placeholder="Enter charging types (e.g., 1,2,3)"
                        pattern="^(\d+,)*\d+$"
                        title="Please enter charging types in the format '1,2,3'"
                      />
                      <p className="text-gray-500 text-sm mb-2">
                        Examples: &quot;2,3&quot; or &quot;3&quot; or &quot;1,2,3&quot;
                      </p>
                    </>
                  )}
                </Field>
        
                <Field>
                  {(id) => (
                    <>
                      <Label htmlFor={id}>Bidirectional</Label>
                      <label className="cursor-pointer label">
                        <input type="checkbox" className="toggle toggle-success" checked = {newBus.bidirectional} onChange={(e) => setNewBus({ ...newBus, bidirectional: e.target.checked })} />
                      </label>
                    </>
                  )}
                </Field>
              <p className="text-red-500 mt-2">{error}</p>
              <button
                className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
                onClick={handleAddBus}
              >
                Add Bus
              </button>
              
              </div>
            )}
          {activeTab === "deleteBus" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Existing Buses</h2>
              <ul>
                {context.data.buses.map((bus: any) => (
                  <li
                    key={bus.model}
                    className="flex items-center justify-between mb-2 p-4 bg-gray-100 rounded"
                  >
                    <span className="text-gray-800">
                      {bus.company} - {bus.model}
                    </span>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => setToDelete(bus.model)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          </main>
        </>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sign In To Admin Panel</h2>
            <input
              type="email"
              className="w-full px-3 py-2 rounded border mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full px-3 py-2 rounded border mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignIn}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
            {authError && <p className="text-red-500 mt-2 text-center">{authError}</p>}
          </div>
        </div>
      )}
    </section>
  );
}