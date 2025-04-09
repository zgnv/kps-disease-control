"use client";
import UserManage from "./UserManage/page";
import { redirect } from "next/navigation";
export default function SystemManage() {
  redirect("/SystemManage/UserManage");
}
