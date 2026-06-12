import Navbar from "@/components/local/Navbar";
import ProtectedRoute from "@/components/local/ProtectedRoute";
import PublicRoute from "@/components/local/PublicRoute";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

const layout = ({ children }) => {
  return (
    <html suppressHydrationWarning lang="en" className={` h-full antialiased`}>
      <body className="min-h-full flex flex-col gap-4 p-4">
        <ProtectedRoute>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <PublicRoute>{children}</PublicRoute>
          </ThemeProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
};

export default layout;
