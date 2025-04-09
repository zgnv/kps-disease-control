import { create } from "zustand";
import { leftDepMenu } from "../types/dep";

interface userLeftMenuState {
  // 左边选中部门
  userLeftSelected: string;
  // 左边部门菜单
  userLeftMenu: leftDepMenu[];

  setUserLeftSelected: (leftSelectedItems: string) => void;
  setUserLeftMenu: (leftMenuOptions: leftDepMenu[]) => void;
}
export const useUserLeftMenuStore = create<userLeftMenuState>((set) => ({
  userLeftSelected: "1",
  userLeftMenu: [],
  setUserLeftSelected: (val) => set(() => ({ userLeftSelected: val })),
  setUserLeftMenu: (val) => set(() => ({ userLeftMenu: val })),
}));
