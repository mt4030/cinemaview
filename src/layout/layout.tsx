import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import ScrollToTop from "@/util/ScrollToTop";

export default function Layout() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}
