"use client";
import { Radio } from "antd";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadSingle from "./components/uploadSingle";
import UploadBatch from "./components/uploadBatch";
import SingleForm from "./components/singleForm";
import BatchTable from "./components/batchTable";

export default function CorpusUpload() {
  const router = useRouter();
  // 单文件处理结果
  const [singleFileResult, setSingleFileResult] = useState<any>({});
  // 上传类型
  const [radiogroup, setRadiogroup] = useState<number>(1);
  // 当前批次号
  const [currentBatchNo, setCurrentBatchNo] = useState<string>("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const batchId = query.get("batchId");
    if (batchId) {
      setCurrentBatchNo(batchId);
    }
  }, []);

  // 单文件处理
  const handleSelectedFile = (value: any) => {
    setSingleFileResult(value);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <div
          className={`${styles.left_box} w-[360px] flex flex-col p-[16px] gap-4 border-r-[1px] border-slate-300`}
        >
          <div className={styles.title}>语料上传</div>
          <div className="text-slate-500">上传和管理语料文件</div>
          <div className={styles.text}>请选择上传方式</div>
          <Radio.Group
            value={radiogroup}
            defaultValue={1}
            options={[
              { value: 1, label: "单文件上传" },
              { value: 2, label: "批量文件上传" },
            ]}
            onChange={(value) => {
              setRadiogroup(value.target.value);
            }}
          />
          {radiogroup === 1 ? (
            <UploadSingle
              currentBatchNo={currentBatchNo}
              selectFile={handleSelectedFile}
            />
          ) : (
            <UploadBatch
              currentBatchNo={currentBatchNo}
              selectFile={handleSelectedFile}
            />
          )}
        </div>
        <div
          className={`${styles.right_box} flex-1 flex flex-col p-[16px] gap-4`}
        >
          {radiogroup === 1 ? (
            <SingleForm
              currentBatchNo={currentBatchNo}
              singleFileResult={singleFileResult}
            />
          ) : (
            <BatchTable selectFile={() => {}} currentBatchNo={currentBatchNo} />
          )}
        </div>
      </div>
    </div>
  );
}
