// 语料检索
export interface SearchListRes {
  batchId: String;
  title: String; //标题
  businessType:String,
  fileName: String;
  fileType: String;
  tag: String; //标签
  originFileSize: String; //原始文件大小
  refreshFileName: String; //清洗文件名
  refeshFileSize: String; //清洗后大小
}
