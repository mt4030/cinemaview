import { Navigate, Outlet } from "react-router-dom";
import { useMcontext } from "@/context/trendingcontext";

export default function ProtectedRoute() {
  const { fakeAuth } = useMcontext();

  if (!fakeAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
