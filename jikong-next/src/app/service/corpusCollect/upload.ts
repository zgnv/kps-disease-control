import fetchApi from "@/lib/fetchApi";
import { deleteInboundRequestReq } from "../../types/upload";

// 上传单文件
export const uploadFileApi = (params: FormData) => {
  return fetchApi.post(`/cdc/file/upload`, params, { type: "FormData" }); 
}

//   根据批次号id查询单文件列表
export const queryFileListApi = (params: string) => {
  return fetchApi.get(`/cdc/batch/query/${params}`);
};

// 根据批次号id获取多文件列表
export const queryMultiFileListApi = (params: string) => {
  return fetchApi.get(`/cdc/mfile/query/${params}`); 
}

// 删除文件
export const deleteFileApi = (params: deleteInboundRequestReq) => {
  return fetchApi.delete(`/cdc/mfile/delete`, params);
};

// 查询单文件预处理结果
export const queryFilePreprocessApi = (params: any) => {
  return fetchApi.post(`/cdc/file/detail`, params);
};

// 更新单文件属性状态
export const updateFileStatusApi = (params: any) => {
  return fetchApi.post(`/cdc/corpus/update`, params); 
}

// 查询多文件预处理结果
export const queryMultiFilePreprocessApi = (params: any) => {
  return fetchApi.get(`/cdc/mfile/search`, params);
};

// 批量更新文件属性状态
export const updateMultiFileStatusApi = (params: any) => {
  return fetchApi.post(`/cdc/corpus/bupdate`, params); 
}
