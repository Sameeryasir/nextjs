"use client";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        {!isAuthPage && <Sidebar />}
        <div className="flex flex-col flex-1">
          {!isAuthPage && <Navigation />}
          <main className={`flex-1 ${isAuthPage ? "" : "p-6"} overflow-y-auto`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
