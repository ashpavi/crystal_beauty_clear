import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/googleLogin", {
          accessToken: res.access_token,
        })
        .then((response) => {
          console.log("Google login successful:", response.data);
          toast.success("Google login successful!");
          localStorage.setItem("token", response.data.token);
          const user = response.data.user;
          if (user.role == "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Google login failed");
          setLoading(false);
        });
    },
  });

  function handleLogin() {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("Login successful:", response.data);
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);
        const user = response.data.user;
        if (user.role == "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Login failed:", error?.response?.data || error);
        toast.error(error?.response?.data?.message || "Login failed. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div className="w-full min-h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex items-center justify-center px-4 py-6 lg:p-0">
      {/* Overlay for readability on mobile */}
      <div className="absolute inset-0 bg-black/30 lg:bg-black/10" />

      <div className="relative z-10 w-full max-w-md lg:max-w-none lg:w-full lg:h-screen lg:flex">
        {/* Left half kept for desktop only to preserve original split */}
        <div className="hidden lg:block lg:w-1/2 lg:h-full" />

        {/* Right half container (centered on mobile) */}
        <div className="w-full lg:w-1/2 min-h-[70vh] lg:h-full flex items-center justify-center">
          <div className="w-full max-w-[420px] bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-5 sm:p-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Welcome back</h1>

            {/* Email */}
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            {/* Password */}
            <div className="relative mb-3">
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center pr-12 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
              </button>
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-[50px] rounded-xl bg-emerald-500 text-white font-semibold mb-3 hover:bg-emerald-600 disabled:opacity-70"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <span className="h-px bg-gray-300 flex-1" />
              <span className="text-xs text-gray-600">or</span>
              <span className="h-px bg-gray-300 flex-1" />
            </div>

            {/* Google login */}
            <button
              className="w-full h-[50px] rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-100 flex items-center justify-center gap-2 border"
              onClick={loginWithGoogle}
              disabled={loading}
            >
              <FcGoogle className="text-xl" />
              <span>{loading ? "Loading..." : "Login with Google"}</span>
            </button>

            {/* Register link */}
            <p className="text-gray-800 text-center mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-emerald-700 font-semibold hover:underline">
                Register
              </Link>
            </p>

            {/* Forget password link */}
            <p className="text-gray-600 text-center m-[10px]">
              Forgot your password?{' '}
              <span className="text-emerald-700 font-semibold hover:underline">
                <Link to ={"/forgetPassword"}>Reset Password</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
