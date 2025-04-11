import React, { useEffect, useState } from "react";
import { Upload, message, UploadProps, UploadFile, Modal } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload";
import axios from "axios";

const { Dragger } = Upload;
const { confirm } = Modal;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

interface FileUploadProps {
  initialFiles?: UploadFile[]; // 初始文件列表（用于编辑时回显）
  selectFile: (value: any) => void;
  currentBatchNo?: string;
}

const FileUploadWithPreview: React.FC<FileUploadProps> = (props) => {
  const { initialFiles, selectFile, currentBatchNo } = props;
  const [fileList, setFileList] = useState<any>(initialFiles);
  // 创建一个 FormData 对象
  const formData = new FormData();

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
    console.log(files, "filesfiles");
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

  // 自定义删除逻辑
  const handleRemove: UploadProps["onRemove"] = (file) => {
    confirm({
      title: "确认删除文件？",
      content: `确定要删除 ${file.name} 吗？`,
      onOk: async () => {
        const req = {
          batchId: currentBatchNo,
          fileName: file.name,
          fileType: file.type,
        };
        console.log(req, "req");

        // 1. 如果是服务器文件，调用删除接口
        // await axios.delete(`/api/files/${file.uid}`);

        // 2. 更新 fileList
        const newFileList = fileList.filter((f) => f.uid !== file.uid);
        setFileList(newFileList);
        message.success(`${file.name} 已删除`);
      },
    });
    return false; // 阻止默认删除行为
  };

  const customRequest = async (options: any) => {
    const { onProgress, onError, onSuccess, file, filename } = options;
    if (file.size > MAX_FILE_SIZE) {
      message.error(`${file.name} 文件大小超过限制（最大20MB）`);
      return;
    }
    formData.append("file", file);
    formData.append("uploadType", "0");
    // uploadType
    if (currentBatchNo) {
      formData.append("batchId", currentBatchNo);
    }

    try {
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
      setFileList({ ...fileList, file });
      //   onSuccess(response.data, file);
      //   message.success(`${file.name} 上传成功`);
    } catch (error) {
      //   onError(error as Error);
      //   message.error(`${file.name} 上传失败`);
    }
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
    console.log(file, "当前点击的file");
  };

  return (
    <Dragger
      name="file"
      style={{ cursor: "pointer" }}
      multiple={true}
      fileList={fileList}
      onChange={handleChange}
      onRemove={handleRemove}
      beforeUpload={beforeUpload}
      onPreview={handlePreview} // 点击文件时的回调
      showUploadList={{
        showRemoveIcon: true,
        removeIcon: <DeleteOutlined />,
      }}
      // 如果不需要自动上传到服务器，添加以下配置：
      customRequest={customRequest}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">拖拽文件至此，或者点击上传</p>
      <p className="ant-upload-hint">支持pdf、word、excel等格式</p>
    </Dragger>
  );
};

export default FileUploadWithPreview;
