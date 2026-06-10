import Navbar from "@/components/local/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

const layout = ({ children }) => {
  return (
    <html suppressHydrationWarning lang="en" className={` h-full antialiased`}>
      <body className="min-h-full flex flex-col gap-4 p-4">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default layout;
