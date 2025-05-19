import { Outlet } from "react-router-dom";

export const ChatLayout = (): React.JSX.Element => {
  return (
    <>
      <div className="w-full h-[72px] bg-[#9CB395]"></div>
      <Outlet />
    </>
  );
};
