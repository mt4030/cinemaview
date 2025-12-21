import { Link } from "react-router-dom"

export default function Error() {
  return (
    <div className="min-h-screen bg-[#0F1624] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-yellow-400 mb-4">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
        Page not found
      </h2>

      <p className="text-gray-400 max-w-md mb-8">
        The page you’re looking for doesn’t exist or has been moved.
        Let’s get you back to something worth watching.
      </p>

      <Link
        to="/"
        className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
