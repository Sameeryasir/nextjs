"use client";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import { usePathname } from "next/navigation";
export default function RootLayout({ children }) {
  const pathname = usePathname(); // ← Import from 'next/navigation'

  // Hide Sidebar/Nav for auth pages
  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

  return (
    <html lang="en">
      <body>
        {isAuthPage ? (
          children // ← No Sidebar for auth pages
        ) : (
          <>
            <Sidebar />
            <Navigation />
            {children}
          </>
        )}
      </body>
    </html>
  );
}