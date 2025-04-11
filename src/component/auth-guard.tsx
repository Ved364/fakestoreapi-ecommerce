"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("token");

    if (userEmail) {
      setIsAuthenticated(true);
    } else {
      redirect("/login");
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
