import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <html lang="en" className={` h-full antialiased`}>
      <body className="min-h-full flex p-4 gap-4 flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default layout;
