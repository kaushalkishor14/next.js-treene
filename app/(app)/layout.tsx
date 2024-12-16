import React, { useEffect } from "react";
import Navbar from "@/components/user-components/navbar";
import FooterPage from "@/components/footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppRoot({ children }: AppLayoutProps) {
  // Display success message

  return (
    <>
      <div>
        <div className="relative flex min-h-screen flex-col container m-auto ">
          <Navbar />
          {children}
          <FooterPage />
        </div>
      </div>
    </>
  );
}
