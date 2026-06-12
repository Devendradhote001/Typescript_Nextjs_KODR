"use client";

import { api } from "@/config/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  let router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const hydrateUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      console.log("hydration res", res);
      setUser(res.data.user);
      router.push("/main");
    } catch (error) {
      console.log("error in hydration", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  return (
    <Auth.Provider value={{ user, isLoading, hydrateUser }}>
      {children}
    </Auth.Provider>
  );
};

export const AuthContext = () => useContext(Auth);
