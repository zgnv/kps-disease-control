import fetchApi from "@/lib/fetchApi";
import { addInboundRequest, updateInboundRequest } from "../../types/batchType";

// 添加批次号
export const addBatchApi = (params: addInboundRequest) => {
  return fetchApi.post("/cdc/batch/create", params);
};

// 修改批次号
export const updateBatchApi = (params: updateInboundRequest) => {
  return fetchApi.post(`/cdc/batch/update`, params); 
}

// 分页查询批次号
export const queryBatchApi = (params: any) => {
  return fetchApi.get("/cdc/batch/list", params); 
}
