import fetchApi from "@/lib/fetchApi";

// 获取语料维护表格
export const getMaintainpageApi = (params: any) => {
  return fetchApi.get("/cdc/corpus/search", params);
};

// 语料维护编辑
export const editMaintainApi = (params: any) => {
  return fetchApi.post("/cdc/corpus/update", params);
};

// 语料维护单条数据删除
export const deleteMaintainApi = (params: any) => {
  return fetchApi.get("/cdc/corpus/delete", params);
};
