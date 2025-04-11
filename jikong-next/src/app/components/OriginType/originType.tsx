import React, { useState, useEffect, useRef } from "react";
import JsonViewer from "react-json-view";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import axios from "axios";
import Epub from "epubjs";
import { message, Button, Input } from "antd";
import styles from "./index.module.css";
import { Image } from "antd";
import { Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

// 配置 PDF.js 的 worker 文件
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
interface OriginFileTypeProps {
  fileType: string;
  fileUrl: string;
  fileJson: any;
  onClose: () => void;
}

const OriginType: React.FC<OriginFileTypeProps> = ({
  fileType,
  fileUrl,
  fileJson,
  onClose,
}) => {
  // 状态声明
  const [jsonData, setJsonData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [inputNumber, setInputNumber] = useState<string>("");
  const [epubPages, setEpubPages] = useState({
    numEpubPages: 0,
    currentEpubPage: 0,
  });
  const [numEpubChapters, setNumEpubChapters] = useState(0);
  const [currentEpubChapter, setCurrentEpubChapter] = useState(1);
  const [epubInput, setEpubInput] = useState("");

  const renditionRef = useRef<any>(null);

  // useEffect 钩子
  useEffect(() => {
    if (fileType.includes("json")) {
      // if (fileUrl) {
      //   exchangeData(fileUrl);
      // } else {
      setJsonData(fileJson);
      // }
    }
    if (fileType === "epub") {
      loadEpub();
    }
  }, [fileType, fileUrl, fileJson]);

  // 加载epub文件
  const loadEpub = async () => {
    setLoading(true);
    console.log(fileUrl);
    let book: any = new Epub(fileUrl);

    book.ready.then(() => {
      console.log("book.spine.length", book.spine.length);
      setNumEpubChapters(book.spine.length);
    });

    renditionRef.current = book.renderTo("viewer", {
      width: 600,
      height: 400,
      method: "default",
    });

    renditionRef.current.on("relocated", (location: any) => {
      console.log(location);
      console.log("total=" + location.start.displayed.total);
      console.log("page=" + location.start.displayed.page);
      setCurrentEpubChapter(location.start.index);
      setEpubPages((prev) => ({
        ...prev,
        currentEpubPage: location.start.displayed.page,
        numEpubPages: location.start.displayed.total,
      }));
    });

    renditionRef.current.display(1);
    setLoading(false);
  };

  const prevPage = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };

  const nextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };

  const gotoEpub = () => {
    if (Number(epubInput) > numEpubChapters) {
      message.error("跳转失败，超出最大章节数");
      return;
    }
    renditionRef.current.display(Number(epubInput));
  };

  const exchangeData = async (fileJsonURL: string) => {
    try {
      setLoading(true);
      const response = await axios.get(fileJsonURL);
      if (fileType === "json") {
        setJsonData(response.data);
      } else if (fileType === "jsonl") {
        if (typeof response.data === "string") {
          const jsonLines = response.data.trim().split("\n");
          const jsonObjects = jsonLines.map((line: string) => JSON.parse(line));
          setJsonData({ content: jsonObjects });
        } else {
          setJsonData(response.data);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setJsonData({ error: "Failed to load data" });
      setLoading(false);
    }
  };

  return (
    <div>
      {fileType === "md" && <Paragraph>{{ fileJson }}</Paragraph>}
      {fileType === "png" && (
        <div className={styles.file_type_img}>
          <Image
            style={{ width: "100%", height: "auto" }}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      )}
      {fileType === "mp4" && (
        <div className="file-type-mp4">
          <div className="div-video">
            <i className="el-icon-close close-video" onClick={onClose}></i>
            {/* 这里需要一个合适的React视频播放器组件 */}
            <video
              src={fileUrl}
              style={{ width: "100%", height: "auto" }}
              controls
              controlsList="nodownload"
            ></video>
          </div>
        </div>
      )}
      {fileType === "mp3" && (
        <div className="file-type-mp3">
          <i className="el-icon-close close-audio" onClick={onClose}></i>
          <audio className="audio-class" src={fileUrl} controls />
        </div>
      )}
      {fileType.includes("json") && (
        <div className={styles.file_type_json}>
          <i className="el-icon-close close-json" onClick={onClose}></i>
          <div className="json-viewer">
            <JsonViewer
              src={jsonData}
              collapsed={1}
              displayDataTypes={false}
              displayObjectSize={false}
            />
          </div>
        </div>
      )}
      {fileType === "pdf" && (
        <div className={styles.file_type_pdf}>
          <div className="pdf-top-click">
            <span className="top-span">
              <span className="span-tip">页码:</span>
              {currentPage}/{pageCount}
            </span>
            <Button
              className="btn-pdf"
              type="primary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              上一页
            </Button>
            <Button
              className="btn-pdf"
              type="primary"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
            >
              下一页
            </Button>
          </div>
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          >
            <Page pageNumber={currentPage} />
          </Document>
        </div>
      )}
    </div>
  );
};

export default OriginType;
