import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar/>

        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navigation />

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
