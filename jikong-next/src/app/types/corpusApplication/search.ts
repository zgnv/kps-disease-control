// 检索申请分页
export interface searchRequestReq {
  pageNo: number;
  pageSize: number;
  fileType: string; //文件类型
  businessType: string; //业务类型
  tag: string; //标签
}

// 原始语料查看请求体
export interface originalRequestReq {
  batchId: string;
  formatType: string; //预览格式  "procuct" "origin"
}

// 原始文件下载
export interface downloadRequestReq {
  batchId: string;
  formatType: string; //预览格式  "procuct" "origin"
  refreshFormat: string; // 清洗格式 "json" "md"
}
