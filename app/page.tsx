import Image from "next/image";
import ConnectButton from "./Components/ConnectButton";
import Sidebar  from "./Components/Sidebar";
import Campaign from "./Components/Campaigns";
export default function Home() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center ">
        <Campaign/>
      </div>
    </>
  );
}
