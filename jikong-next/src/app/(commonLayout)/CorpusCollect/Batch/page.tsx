"use client";
import TitleComponent from "@/app/components/ShowComponent/TitleComponent";
import BatchTable from "./batchTable";
import LeftComponent from "@/app/components/ShowComponent/LeftComponent";

export default function BatchManagment() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"batchManagment"} />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <BatchTable />
      </div> 
    </div>
  );
}
