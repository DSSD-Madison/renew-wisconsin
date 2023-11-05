import React, { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

export default function Admin() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setAuthed(true)
        // ...
      } else {
        // User is signed out
        setAuthed(false);
      }
    });
  }, [])


  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setAuthed(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  const handleSignOut = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setAuthed(false)
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }
  
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      {
        authed ? 
        (  
          <div>
            <h1>Admin is authed</h1>
            <button
              onClick={handleSignOut}
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
            >
              Sign Out
            </button>
          </div>
        )
        :
        (
          <>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
              <h3>Current testing email is dssd-madison@dssdglobal.org and password is testing123</h3>
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
          </>
        )
      }
    </section>
    )
  }
  