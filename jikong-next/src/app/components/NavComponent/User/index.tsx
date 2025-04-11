"use client";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "../index.module.css";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";
export default function User() {
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => router.push("/")}>退出登录</a>,
    },
  ];
  return (
    <div className="flex items-center gap-4 flex-1">
      <div className="h-[40px] w-[40px]">
        {/* <img
          src="./pikai.jpg"
          alt=""
          className="h-full w-full rounded-[20px] overflow-hidden cursor-pointer"
        /> */}
      </div>
      <div className="cursor-pointer">
        <span>irelia</span>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <CaretDownOutlined className={styles.icon} />
        </a>
      </Dropdown>
    </div>
  );
}
