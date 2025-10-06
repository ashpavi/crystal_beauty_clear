import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function sendEmail() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", 
      { email: email })
      .then((response) => {
        console.log("Email sent successfully:", response.data);
        setEmailSent(true);
        toast.success("OTP sent to your email!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error sending email. Please try again.");
        
      });
  }

  function resetPassword(){
    if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/resetPassword",
    { email: email, 
      otp: otp, 
      password: password
    }).then((response)=>{
      console.log("Password reset successfully:", response.data);
      toast.success("Password reset successfully! Please login with your new password.");
      window.location.href="/login";
    }).catch((error)=>{
      console.log(error);
      toast.error("Error resetting password. Please try again.");
      window.location.reload();

    })
  }

  return (
    <div className="relative w-full min-h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex items-center justify-center px-4 py-6 lg:p-0">
      {/* Overlay as a sibling */}
      <div className="absolute inset-0 bg-black/30 lg:bg-black/10" />

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-md">
        {emailSent ? (
          // -------- Reset Password (OTP step) --------
          <div className="w-full max-w-[420px] bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter the OTP sent to <span className="font-semibold">{email}</span> and set your new password.
            </p>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="otp">OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <label className="sr-only" htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <label className="sr-only" htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <button
              onClick={() => resetPassword()}
                type="submit"
                className="w-full h-[50px] rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
              >
                Reset Password
              </button>
            </form>

            <p className="text-gray-700 text-center mt-5">
              Didn’t receive the OTP?{" "}
              <button
                type="button"
                onClick={() => setEmailSent(false)}
                className="text-emerald-700 font-semibold hover:underline"
              >
                Resend
              </button>
            </p>

            <p className="text-gray-700 text-center mt-2">
              Back to{" "}
              <a href="/login" className="text-emerald-700 font-semibold hover:underline">
                Login
              </a>
            </p>
          </div>
        ) : (
          // -------- Forgot Password (email step) --------
          <div className="w-full max-w-[420px] bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your email address and we’ll send you a reset link.
            </p>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full h-[50px] rounded-xl border border-white/70 bg-white/80 text-gray-900 placeholder-gray-500 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <button
                type="submit"
                className="w-full h-[50px] rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition disabled:opacity-70"
                onClick={() => sendEmail()}
              >
                Send OTP
              </button>
            </form>

            <p className="text-gray-700 text-center mt-5">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-emerald-700 font-semibold hover:underline"
              >
                Back to Login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
