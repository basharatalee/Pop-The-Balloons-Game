// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import GamePage from "./GamePage";
// import Dashboard from "./Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App(){
  const [user, setUser] = React.useState(null);
  React.useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=> setUser(u));
    return ()=> unsub();
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <Navigate to="/game" /> : <SignIn /> } />
        <Route path="/game" element={ user ? <GamePage user={user}/> : <Navigate to="/" /> } />
        {/* <Route path="/dashboard" element={ user ? <Dashboard user={user}/> : <Navigate to="/" /> } /> */}
      </Routes>
    </BrowserRouter>
  )
}
