"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";
import fetchApi from "@/lib/fetchApi";
import { useEffect } from "react";
import { IdeplistData } from "@/app/types/dep";
// type MenuItem = Required<MenuProps>["items"][number];
// const items: MenuItem[] = [
//   {
//     key: "sub1",
//     label: "市控中心",
//     children: [
//       { key: "1", label: "疫情科" },
//       { key: "2", label: "疫情科" },
//       { key: "3", label: "疫情科" },
//     ],
//   },
//   {
//     key: "sub2",
//     label: "市卫建委",
//     children: [
//       { key: "4", label: "疫情科" },
//       { key: "5", label: "疫情科" },
//       { key: "6", label: "疫情科" },
//     ],
//   },
// ];
const depColumnConvert: Function = (depList: IdeplistData[]) => {
  return depList.map((dep, i) => {
    let children = null;

    if (dep.children) {
      children = depColumnConvert(dep.children);
    }

    return {
      key: dep.id,
      label: dep.label,
      isSelected: dep.isSelected,
    };
  });
};
export default function DepMenu() {
  const userLeftMenu = useUserLeftMenuStore((state) => state.userLeftMenu);
  const setUserLeftSelected = useUserLeftMenuStore(
    (state) => state.setUserLeftSelected
  );
  const setUserLeftMenu = useUserLeftMenuStore(
    (state) => state.setUserLeftMenu
  );
  const initDepList = () => {
    fetchApi.get("cdc/dept/list", {}).then((res) => {
      if (res.code === 200) {
        const leftColumnList = depColumnConvert(res.data);
        console.log("leftColumnList--", leftColumnList);
        setUserLeftMenu(leftColumnList);
      }
    });
  };
  useEffect(() => {
    initDepList();
  }, []);
  const onClick: MenuProps["onClick"] = (e) => {
    // setUserLeftSelected(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        className="w-full h-full"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={userLeftMenu}
      />
    </>
  );
}
