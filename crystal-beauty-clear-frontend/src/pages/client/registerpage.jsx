import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Google Sign-Up (same endpoint as login)
  const signupWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/googleLogin", {
          accessToken: res.access_token,
        })
        .then((response) => {
          console.log("Google signup successful:", response.data);
          toast.success("Google signup successful!");
          localStorage.setItem("token", response.data.token);
          const user = response.data.user;
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Google signup failed");
        })
        .finally(() => setLoading(false));
    },
  });

  function handleRegister() {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
        email,
        firstName,
        lastName,
        password,
        phone,
        role,
      })
      .then((response) => {
        console.log("Registration successful:", response.data);
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error?.response?.data || error);
        toast.error(
          error?.response?.data?.message ||
            "Registration failed. Please try again."
        );
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-full min-h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex items-center justify-center px-4 py-6 lg:p-0">
      <div className="absolute inset-0 bg-black/30 lg:bg-black/10" />

      <div className="relative z-10 w-full max-w-md lg:max-w-none lg:w-full lg:h-screen lg:flex">
        <div className="hidden lg:block lg:w-1/2 lg:h-full" />

        <div className="w-full lg:w-1/2 min-h-[70vh] lg:h-full flex items-center justify-center">
          <div className="w-full max-w-[420px] bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-5 sm:p-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Create your account
            </h1>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            {/* Password */}
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center pr-12 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={22} />
                ) : (
                  <IoEyeOutline size={22} />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-3">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center pr-12 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                onClick={() => setShowConfirm((s) => !s)}
              >
                {showConfirm ? (
                  <IoEyeOffOutline size={22} />
                ) : (
                  <IoEyeOutline size={22} />
                )}
              </button>
            </div>

            {/* Register button */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full h-[50px] rounded-xl bg-emerald-500 text-white font-semibold mb-3 hover:bg-emerald-600 disabled:opacity-70"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <span className="h-px bg-gray-300 flex-1" />
              <span className="text-xs text-gray-600">or</span>
              <span className="h-px bg-gray-300 flex-1" />
            </div>

            {/* Google Sign Up */}
            <button
              className="w-full h-[50px] rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-100 flex items-center justify-center gap-2 border"
              onClick={signupWithGoogle}
              disabled={loading}
            >
              <FcGoogle className="text-xl" />
              <span>{loading ? "Loading..." : "Sign up with Google"}</span>
            </button>

            {/* Link to Login */}
            <p className="text-gray-800 text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-700 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
