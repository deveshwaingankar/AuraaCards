// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form,       setForm]       = useState({ email:"", password:"" });
  const [errors,     setErrors]     = useState({});
  const [submitted,  setSubmitted]  = useState(false);
  const [showPwd,    setShowPwd]    = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Live validation
  useEffect(() => {
    const e = {};
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Invalid email";
    }
    if (form.password && form.password.length < 6) {
      e.password = "Min 6 characters";
    }
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
      await doSignIn(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Invalid email or password." });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Log In</h2>

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
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit-error summary */}
        {submitted && Object.keys(errors).length > 0 && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="text-red-400 text-center text-sm"
          >
            {errors.submit || "Please fix the above fields"}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 font-semibold rounded transition ${
            submitting
              ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
              : "bg-orange-500 text-black hover:bg-orange-600"
          }`}
        >
          {submitting ? "Logging In…" : "Log In"}
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-400 underline hover:text-orange-500"
          >
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
