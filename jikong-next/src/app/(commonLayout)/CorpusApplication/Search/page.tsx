"use client";
import TitleComponent from "@/app/components/ShowComponent/TitleComponent";
import SearchRequestTable from "./searchRequestTable";

export default function SearchRequest() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"searchRequest"} />
      <SearchRequestTable />
    </div>
  );
}
