// src/pages/SignupPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

import { auth, db } from "./firebaseConfig";
import { onAuthChange, doSignOut, doSignIn, doSignUp, fetchUserProfile } from "./firebaseWrapper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form,      setForm]      = useState({ fullName:"", email:"", password:"", confirm:"", phone:"" });
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPwd,   setShowPwd]   = useState(false);
  const [showConf,  setShowConf]  = useState(false);
  const [submitting,setSubmitting]= useState(false);
  const [success,   setSuccess]   = useState(false);

  // Password strength meter
  const strength = (() => {
    const p = form.password;
    if (p.length > 8 && /[A-Z]/.test(p) && /\d/.test(p)) return "strong";
    if (p.length >= 6) return "medium";
    if (p.length)    return "weak";
    return "";
  })();

  // Live validation on each field
  useEffect(() => {
    const e = {};
    if (form.fullName.trim().length < 3)               e.fullName = "At least 3 characters";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email    = "Invalid email";
    if (form.password.length < 6)                     e.password = "Min 6 characters";
    if (form.confirm && form.confirm !== form.password) e.confirm  = "Doesn’t match";
    setErrors(e);
  }, [form]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    try {
      // 1) Create Firebase user
      const { user } = doSignUp(
        form.email,
        form.password,
        form);
      // await createUserWithEmailAndPassword(
      //   auth,
      //   form.email,
      //   form.password
      // );

      // // 2) Write Firestore profile record
      // await setDoc(doc(db, "users", user.uid), {
      //   uid:       user.uid,
      //   email:     form.email,
      //   fullName:  form.fullName,
      //   phone:     form.phone || "",
      //   createdAt: Date.now(),
      // });

      // 3) Show success overlay, then route to login
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative">
      {/* SIGNUP FORM */}
      {!success && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Create New Account</h2>

          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your name"
              className={`w-full px-3 py-2 bg-transparent border rounded focus:outline-none ${
                errors.fullName ? "border-red-500" : "border-zinc-600"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="w-full px-3 py-2 bg-transparent border border-zinc-600 rounded focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-3 py-2 bg-transparent border rounded focus:outline-none ${
                errors.email ? "border-red-500" : "border-zinc-600"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className={`w-full px-3 py-2 bg-transparent border rounded focus:outline-none ${
                  errors.password ? "border-red-500" : "border-zinc-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {strength && (
              <div className="h-1 mt-1 rounded bg-zinc-700 overflow-hidden">
                <div
                  className={`h-full ${
                    strength === "weak"
                      ? "w-1/3 bg-red-500"
                      : strength === "medium"
                      ? "w-2/3 bg-yellow-500"
                      : "w-full bg-green-500"
                  }`}
                />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <div className="relative">
              <input
                name="confirm"
                type={showConf ? "text" : "password"}
                value={form.confirm}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={`w-full px-3 py-2 bg-transparent border rounded focus:outline-none ${
                  errors.confirm ? "border-red-500" : "border-zinc-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConf(v => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                {showConf ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirm && (
              <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>
            )}
          </div>

          {/* Validation summary */}
          {submitted && Object.keys(errors).length > 0 && (
            <motion.p
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="text-red-400 text-center text-sm"
            >
              {errors.submit || "Please fix the above fields"}
            </motion.p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 font-semibold rounded transition ${
              submitting
                ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 text-black hover:bg-orange-600"
            }`}
          >
            {submitting ? "Signing Up…" : "Sign Up"}
          </button>

          {/* <-- New Sign in link below --> */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="underline text-orange-400 hover:text-orange-500"
            >
              Sign in
            </button>
          </p>
        </motion.form>
      )}

      {/* Success Overlay */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-green-300 mb-4">
              Account created!
            </h3>
            <p className="text-gray-200 mb-6">Redirecting you to log in…</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
