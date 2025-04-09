"use client";
import TitleComponent from "@/app/components/ShowComponent/TitleComponent";
import LeftComponent from "@/app/components/ShowComponent/LeftComponent";
import RightComponent from "@/app/components/ShowComponent/RightComponent";

export default function PermissionManage() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"PermissionManage"} />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <LeftComponent type={"PermissionManage"} />
        <RightComponent type={"PermissionManage"} />
      </div>
    </div>
  );
}
