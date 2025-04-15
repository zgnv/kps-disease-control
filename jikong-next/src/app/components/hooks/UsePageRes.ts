import { useState } from "react";

// 后端分页响应结构
export interface PageRes<T> {
  // 当前页
  current: number;
  // 一共有几页
  pages: number;
  // 总数
  total: number;
  // 每页显示条数
  size: number;
  list: T[];
}

type IUsePageResProps<T> = PageRes<T> | null;

// 分页响应体hook
export function usePageRes<T>(
  defaultState: IUsePageResProps<T> = null
): [
  IUsePageResProps<T>,
  React.Dispatch<React.SetStateAction<IUsePageResProps<T>>>
] {
  const [state, setState] = useState<IUsePageResProps<T>>(defaultState);
  return [state, setState];
}
