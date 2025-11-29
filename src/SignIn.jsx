// src/SignIn.jsx
import React from "react";
import { auth, provider, db } from "./firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignIn(){
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [mode, setMode] = React.useState("signin"); // "signin" or "signup"
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // Google sign-in
  const googleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      // onAuthStateChanged in App.jsx should redirect user
      // Optionally navigate manually:
      navigate("/game");
    } catch(e){
      alert("Google sign-in error: " + e.message);
    } finally { setLoading(false); }
  };

  // Email form submit
  const handleEmail = async (e) => {
    e.preventDefault();
    if(!email || !pass) return alert("Email and password required");
    setLoading(true);
    try {
      if(mode === "signup"){
        // create account
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const user = cred.user;
        // optional: send email verification (uncomment if you want)
        // await sendEmailVerification(user);
        // create user doc in Firestore
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName || null,
          email: user.email,
          createdAt: serverTimestamp(),
          lastPlayed: null
        });
        alert("Account created and signed in!");
        navigate("/game");
      } else {
        // sign in existing user
        await signInWithEmailAndPassword(auth, email, pass);
        navigate("/game");
      }
    } catch(err){
      // friendly error messages
      if(err.code === "auth/email-already-in-use"){
        alert("Email already in use. Try sign in or use a different email.");
      } else if(err.code === "auth/weak-password"){
        alert("Weak password. Use at least 6 characters.");
      } else if(err.code === "auth/user-not-found"){
        alert("No user found with this email. Try Sign Up first.");
      } else if(err.code === "auth/wrong-password"){
        alert("Wrong password.");
      } else {
        alert("Auth error: " + err.message);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:420, margin:"40px auto", padding:20, border:"1px solid #eee", borderRadius:8}}>
      <h2 style={{marginBottom:8}}>Pop a Balloon</h2>

      <button onClick={googleSignIn} disabled={loading} style={{width:"100%", padding:10, marginBottom:12}}>
        {loading ? "Please wait..." : "Sign in with Google"}
      </button>

      <hr />

      <div style={{display:"flex", gap:8, marginBottom:12}}>
        <button
          onClick={()=>setMode("signin")}
          style={{flex:1, background: mode==="signin" ? "#e6eef8" : "#fff", padding:8}}
        >
          Sign In
        </button>
        <button
          onClick={()=>setMode("signup")}
          style={{flex:1, background: mode==="signup" ? "#e6eef8" : "#fff", padding:8}}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleEmail}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
          style={{width:"100%", padding:8, marginBottom:8}}
        />
        <input
          type="password"
          placeholder="Password (6+ chars)"
          value={pass}
          onChange={e=>setPass(e.target.value)}
          required
          minLength={6}
          style={{width:"100%", padding:8, marginBottom:12}}
        />
        <button type="submit" style={{width:"100%", padding:10}}>
          {mode === "signup" ? (loading ? "Creating..." : "Create account") : (loading ? "Signing..." : "Sign in")}
        </button>
      </form>

      <p style={{marginTop:12, fontSize:13, color:"#666"}}>
        Tip: If testing quickly, use Google sign-in. For Email sign-up make sure password is at least 6 characters.
      </p>
    </div>
  );
}
