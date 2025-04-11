"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useSideStore } from "@/app/store/useSideStore";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "SystemManage",
    label: "系统管理",
    icon: <DesktopOutlined />,
    children: [
      { key: "UserManage", label: "用户管理" },
      { key: "DictManage", label: "字典维护" },
      { key: "PermissionManage", label: "权限管理" },
    ],
  },
  {
    key: "CorpusCollect",
    label: "语料采集",
    icon: <DesktopOutlined />,
    children: [
      { key: "Batch", label: "批次号管理" },
      // { key: "Upload", label: "语料上传" },
      { key: "Maintain", label: "语料维护" },
    ],
  },
  {
    key: "CorpusApplication",
    label: "语料应用",
    icon: <DesktopOutlined />,
    children: [{ key: "Search", label: "检索申请" }],
  },
];
export default function Side() {
  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
    setActiveSideMenu(e.key);
    router.push(`/${e.keyPath[1]}/${e.key}`);
  };
  const setActiveSideMenu = useSideStore((state) => state.setSideSelected);
  return (
    <div className="w-[200px]">
      <Menu
        onClick={onClick}
        className="w-full h-full"
        defaultSelectedKeys={["UserManage"]}
        defaultOpenKeys={["systemManage"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
