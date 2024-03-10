import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "~/config/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Field, Label, Input } from "~/components/Form";
import { DataContext } from "~/contexts/dataContext";
import LoadingSpinner from "~/components/equipment/loading_bar"; // Assuming LoadingSpinner is in the same directory
import { updateDoc, doc, setDoc } from "firebase/firestore";

export default function Admin() {

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

  // Context
  const context = useContext(DataContext);
  
  // Authentication state
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(""); 
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
    } catch (error: any) {
      const errorMessage = fbAuthErrors[error.code.split("/")[1]] || "An error occurred.";
      setAuthError(errorMessage);
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
      });
      context.data.assumptions[0] = {
        diesel_bus_miles_per_gallon: dieselBusMilesPerGallon,
        diesel_dollar_per_gallon: dieselDollarPerGallon,
        summer_efficiency: summerEfficiency,
        summer_months_in_op: summerMonthsInOperation,
        winter_efficiency: winterEfficiency,
      }
      console.log("Assumptions updated");
    } catch (error) {
      console.error("Error updating assumptions:", error);
    }
  }
  return (
    <section className="flex items-center justify-center">
      {context.loading ? ( // Conditionally render loading spinner
        <LoadingSpinner />
      ) : authed ? ( // If authenticated
        <div className="flex-row items-center justify-center">
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
          {
            authError && <p className="text-red-500 mt-2 text-center">{authError}</p> 
          }
        </div>
      )}
    </section>
  );
}
