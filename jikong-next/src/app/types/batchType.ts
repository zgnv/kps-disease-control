// 添加入库单号表单
export interface DataType {
  batchId: string;
  batchDesc: string; //介绍
}

// 入库单列表
export interface InboundListPageRes {
  id: number;
  batchId: string; //入库号
  status: number; //状态
  uploadDesc: string; // 介绍
  totalFiles?: number; //文件数量
  completedFiles: number;
  createdBy: number;
  createTime: string;
}

// 添加批次号请求体
export interface addInboundRequest {
  //   描述
  batchDesc: string;
}

// 修改入库单号
export interface updateInboundRequest {
  batchId?: string;
  //   描述
  batchDesc: string;
}
