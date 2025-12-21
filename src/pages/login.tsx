import { useMcontext } from "@/context/trendingcontext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
const {FakeAuthentication}=useMcontext()
const navigate=useNavigate()
const handelsubmit=(e: React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
FakeAuthentication()
navigate('/user')
}


  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0F1624] px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Login to continue to CinemaView
        </p>

        <form className="space-y-5" onSubmit={handelsubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="you@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
