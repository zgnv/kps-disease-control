import { Button, Flex, Radio, Space } from "antd";
import { ToTopOutlined } from "@ant-design/icons";
import { useState } from "react";

interface uploadprops {
  currentBatchNo?: String;
  onClose: () => void;
}

const UploadFile: React.FC<uploadprops> = (props) => {
  const { currentBatchNo, onClose } = props;
  // export default function UploadFile() {
  // 当前选中文件类型
  const [fileType, setFileType] = useState<"origin" | "clean">("origin");
  //   当前选中清洗文件格式
  const [cleanType, setCleanType] = useState<"json" | "md">("json");

  //   提交
  const onSubmit = async () => {
    const req = {
      fileType: fileType,
      cleanType: cleanType,
      batchId: currentBatchNo,
    };
    console.log(req, "req");
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div>请选择文件类型</div>
      <Flex gap={12} style={{ width: "100%" }} justify="space-between">
        <Button
          style={{ width: "48%" }}
          icon={<ToTopOutlined />}
          onClick={() => {
            setFileType("origin");
          }}
          color={fileType === "origin" ? "primary" : "default"}
          variant={fileType === "origin" ? "outlined" : "dashed"}
        >
          原始文件
        </Button>
        <Button
          style={{ width: "48%" }}
          icon={<ToTopOutlined />}
          color={fileType === "clean" ? "primary" : "default"}
          variant={fileType === "clean" ? "outlined" : "dashed"}
          onClick={() => {
            setFileType("clean");
          }}
        >
          清洗文件
        </Button>
      </Flex>
      <div>请选择清洗文件格式</div>
      <Radio.Group
        name="radiogroup"
        defaultValue={"json"}
        options={[
          { value: "json", label: "json格式" },
          { value: "md", label: "markdown" },
        ]}
        onChange={(e) => {
          setCleanType(e.target.value);
        }}
      />
      <Flex justify="flex-end" gap={24}>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={onSubmit} style={{ width: "120px" }} type="primary">
          确定
        </Button>
      </Flex>
    </Space>
  );
};

export default UploadFile;
