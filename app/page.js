import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import Content from "./components/Content";

export default function Home() {
  return (
    <>
      {" "}
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Navigation />
          <Content/>
        </div>
      </div>
    </>
  );
}
