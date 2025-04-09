// 表格数据
export interface DataType {
    key: number;
    //   入库单号
    id: number;
    //   描述
    info: string;
    //   文件数量
    fileNum: number;
}

// 添加入库单号请求体
export interface addInboundRequest {
    //   描述
    info: string; 
}

// 修改入库单号
export interface updateInboundRequest {
    id:number;
    //   描述
    info: string; 
}