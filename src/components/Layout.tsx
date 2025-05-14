import React from "react";
import { Outlet } from "react-router-dom";
import { MainHeader } from "./MainHeader";
import { MobileNav } from "./MobileNav";

export const Layout = (): React.JSX.Element => {
  return (
    <div className="main-container flex flex-col items-center min-h-[100vh] bg-gray-50">
      <MainHeader />
      <Outlet />
      <MobileNav />
    </div>
  );
};
