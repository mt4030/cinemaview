import { NavLink,useNavigate } from "react-router-dom";
import { useMcontext } from "@/context/trendingcontext";



export default function Signup() {
const {FakeAuthentication}=useMcontext()
  const navigate = useNavigate();

const handelsubmit=(e: React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
FakeAuthentication()
navigate('/user')
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1624] px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Join CinemaView today
        </p>

        <form className="space-y-5" onSubmit={handelsubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your name"
              required
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-yellow-400 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
