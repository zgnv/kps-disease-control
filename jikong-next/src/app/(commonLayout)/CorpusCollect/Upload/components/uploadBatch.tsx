import React, { useEffect, useState } from "react";
import { Upload, message, UploadProps, UploadFile, Button } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload";
import axios from "axios";

const { Dragger } = Upload;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

interface FileUploadProps {
  initialFiles?: UploadFile[]; // 初始文件列表（用于编辑时回显）
  selectFile: (value: any) => void;
  currentBatchNo?: string;
}

const UploadBatch: React.FC<FileUploadProps> = (props) => {
  const { initialFiles, selectFile, currentBatchNo } = props;
  // 创建一个 FormData 对象
  const formData = new FormData();
  const [fileList, setFileList] = useState<any>(initialFiles);
  // 上传文件列表
  const fileLists: any = [];

  // 获取文件回显
  useEffect(() => {
    // 获取回显文件列表
    getEchoFileList();
  }, [currentBatchNo]);

  // 获取回显文件列表
  const getEchoFileList = () => {
    // const res = await
    const res = {
      data: [
        {
          fileName: "文件01",
          fileType: "pdf",
        },
        {
          fileName: "文件02",
          fileType: "png",
        },
      ],
    };
    const files = res.data.map((file, index) => ({
      uid: (index + 1).toString(),
      name: file.fileName,
      status: "done",
      type: file.fileType,
    }));
    setFileList(files);
  };
  /**
   * 校验文件类型和大小
   */
  const beforeUpload = (file: RcFile): boolean => {
    // 校验文件大小
    const isLtMaxSize = file.size / 1024 / 1024 <= 20;
    if (!isLtMaxSize) {
      message.error(`文件大小不能超过 20MB`);
      return false;
    }

    // 校验文件名和类型是否重复
    const isDuplicate = fileList.some(
      (f: UploadFile) => f.name === file.name && f.type === file.type
    );
    if (isDuplicate) {
      message.error(`同一类型不允许上传相同名字的文件`);
      return false;
    }

    return true;
  };

  /**
   * 文件列表变化时的回调
   */
  const handleChange: UploadProps["onChange"] = ({ file, fileList }) => {
    // 过滤掉不符合要求的文件
    const filteredList = fileList.filter((f) => f.status !== "error");
    setFileList(filteredList);
  };

  /**
   * 删除文件
   */
  const handleRemove = async (file: UploadFile) => {
    const newFileList = fileList.filter((f: any) => f.uid !== file.uid);
    setFileList(newFileList);
    message.success(`${file.name} 已删除`);
  };

  const customRequest = async (options: any) => {
    const { onProgress, onError, onSuccess, file, filename } = options;
    fileLists.push(file);
  };

  // 点击文件的回调
  const handlePreview = async (file: any) => {
    // 获取当前文件保存的处理结果
    // const res = await
    const res = {
      data: {
        businessType: "业务类型",
        fungibleFile: "可替代",
        isOpen: true,
        isEfftct: true,
        resultFileType: "文件类型",
        effectDate: "2026-08-18",
        fileInfo: "介绍",
      },
    };
    selectFile({ ...file, ...res.data });
  };

  // 点击上传按钮
  const handleUpload = async () => {
    try {
      if (!currentBatchNo) return;
      // 把file文件放到formData的fileLists数组中
      fileList.forEach((file: any, index: number) => {
        if (!file.originFileObj) return;
        formData.append(`file${index}`, file.originFileObj);
      });
      formData.append("batchId", currentBatchNo);
      const response = await axios.post(
        "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            //   const percent = Math.round(
            //     (progressEvent.loaded * 100) / progressEvent.total
            //   );
            //   onProgress({ percent });
          },
        }
      );

      //   onSuccess(response.data, file);
      //   message.success(`${file.name} 上传成功`);
    } catch (error) {
      //   onError(error as Error);
      //   message.error(`${file.name} 上传失败`);
    }
  };

  return (
    <div>
      <Dragger
        name="file"
        style={{ cursor: "pointer" }}
        multiple={true}
        fileList={fileList}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
        onPreview={handlePreview} // 点击文件时的回调
        customRequest={customRequest}
        showUploadList={{
          showRemoveIcon: true,
          removeIcon: <DeleteOutlined />,
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">拖拽文件至此，或者点击上传</p>
        <p className="ant-upload-hint">支持pdf、word、excel等格式</p>
      </Dragger>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}
      >
        <Button onClick={handleUpload}>点击上传</Button>
      </div>
    </div>
  );
};

export default UploadBatch;
