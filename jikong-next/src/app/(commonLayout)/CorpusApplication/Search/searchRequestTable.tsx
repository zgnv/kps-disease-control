"use client";
import { SearchListRes } from "@/app/types/searRequest";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { PageRes, usePageRes } from "@/app/components/hooks/UsePageRes";
import styles from "./index.module.css";
import OriginType from "@/app/components/OriginType/originType";
import UploadFile from "./uploadFile";
const jsonDemo = {
  library: {
    name: "中央图书馆",
    location: "北京市海淀区",
    books: [
      {
        id: 1,
        title: "三体",
        author: "刘慈欣",
        year: 2008,
        genre: "科幻",
        available: true,
      },
      {
        id: 2,
        title: "百年孤独",
        author: "加西亚·马尔克斯",
        year: 1967,
        genre: "魔幻现实主义",
        available: false,
      },
      {
        id: 3,
        title: "活着",
        author: "余华",
        year: 1993,
        genre: "当代文学",
        available: true,
      },
      {
        id: 4,
        title: "1984",
        author: "乔治·奥威尔",
        year: 1949,
        genre: "反乌托邦小说",
        available: true,
      },
    ],
    totalBooks: 4,
    openingHours: {
      weekdays: "9:00 - 21:00",
      weekends: "10:00 - 18:00",
    },
  },
};
export default function SearchRequestTable() {
  const [form] = Form.useForm();
  //   预览弹窗
  const [viewModal, setViewModal] = useState(false);
  // 下载弹窗
  const [uploadModal, setUploadModal] = useState(false);
  const [tableData, setTableData] = usePageRes<SearchListRes>();
  //   当前修改的入库单号
  const [currentBatchNo, setCurrentBatchNo] = useState<String>();
  //   弹窗类型
  const [modalType, setModalType] = useState<"add" | "view">("add");
  //   分页入参
  const [pageReq, setPageReq] = useState({
    fileType: "",
    businessType: "",
    tag: "",
    page: 1,
    pageSize: 10,
  });
  // 当前选中的原始语料或者是成品语料
  const [currentType, setCurrentType] = useState<"origin" | "product" | "">(
    "origin"
  );
  // 文件类型
  const [fileType, setFileType] = useState("");
  // 文件url
  const [fileUrl, setFileUrl] = useState("");
  // json文件 md
  const [jsonData, setJsonData] = useState(jsonDemo);

  const options: any[] = [
    {
      value: "政策文件",
      label: "政策文件",
      children: [
        {
          value: "传染病防控",
          label: "传染病防控",
          children: [
            {
              value: "传染病防控",
              label: "传染病防控",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];
  const columns: TableProps<SearchListRes>["columns"] = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "文件类型",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "业务类型",
      dataIndex: "businessType",
      key: "businessType",
    },
    {
      title: "标签",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "原始文件大小",
      dataIndex: "originFileSize",
      key: "originFileSize",
    },
    {
      title: "清洗后文件名",
      dataIndex: "refreshFileName",
      key: "refreshFileName",
      width: 160,
    },
    {
      title: "清洗后格式",
      dataIndex: "freshFormat",
      key: "freshFormat",
      width: 140,
    },
    {
      title: "清洗后大小",
      dataIndex: "refeshFileSize",
      key: "refeshFileSize",
      width: 140,
    },
    {
      title: "操作",
      key: "action",
      render: (row, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => {
              view(record);
            }}
          >
            预览
          </Button>
          <Button
            type="link"
            onClick={() => {
              setCurrentBatchNo(record.batchId);
              setUploadModal(true);
            }}
          >
            下载
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    if (uploadModal) return;
    if (currentBatchNo && currentType) {
      // 预览
      currentView(currentType, currentBatchNo);
    }
  }, [currentType, currentBatchNo]);

  //   关闭弹窗
  const closeModal = () => {
    setViewModal(false);
  };

  //   获取表格数据
  const getTableData = async () => {
    // const res  =awa
    const res: PageRes<SearchListRes> = {
      total: 100,
      current: 1,
      pages: 10,
      size: 10,
      records: Array.from({ length: 100 }).map<SearchListRes>((_, i) => ({
        batchId: String(i + 1),
        title: i + "标题1", //标题
        fileName: i + "标题1",
        businessType: "业务",
        fileType: "leix",
        tag: i + "标题1", //标签
        originFileSize: i + "标题1", //原始文件大小
        refreshFileName: i + "标题1", //清洗文件名
        refeshFileSize: i + "标题1", //清洗后大小
        key: i + 1,
      })),
    };
    setTableData(res);
  };

  // 预览
  const view = async (record: SearchListRes) => {
    setModalType("view");
    setViewModal(true);
    // 设置当前选中入库单号
    setCurrentBatchNo(record.batchId);
  };

  // 获取当前预览文件
  const currentView = (type: String, batchId: String) => {
    const req = {
      batchId: batchId,
      type: type,
    };
    // 获取原始语料文件
    // const res  = await
    const res = {
      data: {
        fileType: "json",
        fileUrl: "",
        fileJson: jsonDemo,
      },
    };
    const { fileType, fileUrl, fileJson } = res.data;
    switch (fileType) {
      case "pdf":
      case "mp4":
      case "epub":
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        setViewModal(true);
        setFileType(fileType);
        setFileUrl(fileUrl);
        break;
      case "json":
        setJsonData(fileJson);
        setFileType(fileType);
        setViewModal(true);
        break;
      case "md":
        setJsonData(fileJson);
        setFileType(fileType);
        setViewModal(true);
      default:
        message.warning(`暂不支持${fileType}文件类型预览`);
    }
  };

  //   分页切换
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPageReq({
      ...pageReq,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  // 上传文件 路由跳转
  const upload = () => {
    // console.log("上传文件");
    // router.push("/SystemManage");
  };
  return (
    <>
      <Row className={styles.box_info}>
        <Form
          style={{ marginTop: "16px" }}
          form={form}
          initialValues={{}}
          onValuesChange={(changeValues) => {
            if (changeValues.hasOwnProperty("fileType")) {
              setPageReq({
                ...pageReq,
                fileType: changeValues.fileType,
              });
            } else if (changeValues.hasOwnProperty("businessType")) {
              setPageReq({
                ...pageReq,
                businessType: changeValues.businessType,
              });
            } else if (changeValues.hasOwnProperty("tag")) {
              setPageReq({
                ...pageReq,
                tag: changeValues.tag,
              });
            }
          }}
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item label="文件类型" name="fileType">
                <Cascader
                  options={options}
                  onChange={() => {}}
                  style={{ width: "100%" }}
                  placeholder="请选择文件类型"
                ></Cascader>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="业务类型" name="businessType">
                <Select
                  showSearch
                  placeholder="请选择业务类型"
                  optionFilterProp="label"
                  allowClear
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="标签" name="tag">
                <Input placeholder="请输入标签，用逗号分离" />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Space>
                <Button type="primary" onClick={getTableData}>
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setPageReq({
                      ...pageReq,
                      fileType: "",
                      businessType: "",
                      tag: "",
                    });
                  }}
                >
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Col span={24} className={styles.table_box}>
          <Table
            dataSource={tableData?.records}
            columns={columns}
            pagination={{
              current: pageReq.page,
              pageSize: pageReq.pageSize,
              total: tableData?.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
      {/* 预览 */}
      <Modal
        title=""
        open={viewModal}
        onOk={closeModal}
        footer={null}
        onCancel={closeModal}
        width={"70%"}
        style={{ height: "50%" }}
      >
        <div className={styles.modal_header}>
          <div className={styles.trapezoid}>
            <svg viewBox="0 0 200 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#CEE4FF", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#FFF", stopOpacity: 1 }}
                  />
                </linearGradient>
                <filter
                  id="shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="4" dy="4" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M8,0 H160 A8,8 0 0,1 168,8 L192,92 A8,8 0 0,1 184,100 H8 A8,8 0 0,1 0,92 V8 A8,8 0 0,1 8,0 Z"
                fill="url(#grad)"
              />
            </svg>
            <div
              onClick={() => {
                setCurrentType("origin");
              }}
              className={
                currentType === "origin"
                  ? styles.select_trapezoidContent
                  : styles.trapezoidContent
              }
            >
              原始语料
            </div>
          </div>
          <div className={styles.rectangle}>
            <svg viewBox="0 0 200 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rectGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#fff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#FFF", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="0"
                width="200"
                height="100"
                rx="8"
                ry="8"
                fill="url(#rectGrad)"
              />
            </svg>
            <div
              onClick={() => {
                setCurrentType("product");
              }}
              className={
                currentType === "product"
                  ? styles.select_rectangleContent
                  : styles.rectangleContent
              }
            >
              成品语料
            </div>
          </div>
        </div>
        {/*  fileType="pdf"
          fileUrl="https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf" */}
        {/*     fileJson={jsonDemo} */}
        <OriginType
          fileType={fileType}
          fileUrl={fileUrl}
          fileJson={jsonData}
          onClose={() => {}}
        />
      </Modal>
      {/* 下载弹窗 */}
      <Modal
        title="下载"
        open={uploadModal}
        onOk={() => {
          setCurrentType("");
          setUploadModal(false);
        }}
        footer={null}
        onCancel={() => {
          setUploadModal(false);
        }}
        width={"35%"}
        style={{ height: "50%" }}
      >
        <UploadFile
          currentBatchNo={currentBatchNo}
          onClose={() => {
            setUploadModal(false);
          }}
        />
      </Modal>
    </>
  );
}
