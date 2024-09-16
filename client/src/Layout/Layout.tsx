import { Outlet } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar/BottomNavbar";

function Layout() {

  return (
    <>
      {/* Render nested routes */}
      <Outlet />

      {/* Conditionally render BottomNavbar */}
      <BottomNavbar />
    </>
  );
}

export default Layout;
