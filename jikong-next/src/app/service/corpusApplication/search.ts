import { downloadRequestReq, originalRequestReq, searchRequestReq } from "@/app/types/corpusApplication/search";
import fetchApi from "@/lib/fetchApi";

// 检索申请分页
export const getSearchpageApi = (params: searchRequestReq) => {
  return fetchApi.get("/cdc/search/search", params);
};

// 原始语料查看
export const getOriginalApi = (params: originalRequestReq) => {
  return fetchApi.post("/cdc/file/preview", params); 
}

// 原始语料下载
export const getOriginalDownApi = (params: downloadRequestReq) => {
  return fetchApi.post("/cdc/file/download", params); 
}