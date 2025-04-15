// 表格数据
export interface DataType {
    batchId: string;
    key: number;
    //   入库单号
    id: number;
    name: String; //文件名
    type: String; //文件类型
    resultFileType: String; //结果文件类型
    businessType: String; //业务类型
    effectDate: any; //生效生成日期
    fungibleFile: String; //可替代文件
    isOpen: Boolean; //是否公开资料
    isEfftct: Boolean; //是否最新有效
    fileInfo: String; //文件介绍
  }

//   上传文件请求体
export interface addInboundRequestReq {
    fileName: String;
    fileType: String;
    batchId: String;
}

// 删除文件
export interface deleteInboundRequestReq {
    fileName: String;
    fileType: String;
    batchId: String;
}