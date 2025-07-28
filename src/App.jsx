// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { auth } from "./firebaseConfig";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

import Layout         from "./Layout";
import CardShowcase   from "./HomePage";
import CartPage       from "./CartPage";
import CheckoutPage   from "./CheckoutPage";
import SignupPage     from "./SignupPage";
import LoginPage      from "./LoginPage";
import SetupCardPage  from "./SetupCardPage";
import DashboardPage  from "./DashboardPage";
import ProfileCard    from "./ProfileCard";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Only one call to setPersistence, before we render the Router
    setPersistence(auth, browserLocalPersistence)
      .catch(err => console.error("Auth persistence error:", err))
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-500" />
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/"                   element={<CardShowcase />} />
          <Route path="/cart"               element={<CartPage />} />
          <Route path="/checkout"           element={<CheckoutPage />} />
          <Route path="/signup"             element={<SignupPage />} />
          <Route path="/login"              element={<LoginPage />} />
          <Route path="/setup-card/:userId" element={<SetupCardPage />} />
          <Route path="/dashboard"          element={<DashboardPage />} />
          <Route path="/profile"            element={<ProfileCard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
