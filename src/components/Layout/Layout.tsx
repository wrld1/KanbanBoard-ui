import SearchBoardInput from "../SearchBoardInput";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <div className="container mx-auto flex items-center flex-col py-5 gap-4">
        <h1 className="font-bold">Task Management App</h1>
        <SearchBoardInput />
        {children}
      </div>
    </div>
  );
};

export default Layout;
