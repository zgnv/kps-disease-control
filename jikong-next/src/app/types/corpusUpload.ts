// 单文件处理结果
export interface singleFileResult  {
  fileType: String; //文件类型
  businessType: String; //业务类型
  effectDate: Date; //生效生成日期
  fungibleFile: String; //可替代文件
  isOpen: Boolean; //是否公开资料
  isEfftct: Boolean; //是否最新有效
  fileInfo: String; //文件介绍
}
