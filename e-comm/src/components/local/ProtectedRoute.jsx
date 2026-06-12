"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  let { user, isLoading } = AuthContext();

  let router = useRouter();

  if (isLoading) return <h1>Loading....</h1>;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
