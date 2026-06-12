"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

export const PublicRoute = ({ children }) => {
  let { user, isLoading } = AuthContext();

  let router = useRouter();

  if (isLoading) return <h1>Loading...</h1>;

  if (user) {
    router.push("/main");
  }
  if (!user) return null;

  return children;
};

export default PublicRoute;
