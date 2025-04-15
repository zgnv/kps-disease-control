"use client";
import { usePageRes } from "@/app/components/hooks/UsePageRes";
import { queryBatchApi } from "@/app/service/corpusCollect/batch";
import { DataType, InboundListPageRes } from "@/app/types/batchType";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Table, TableProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddBatchModal from "./addBatchModal";
import styles from "./index.module.css";

export default function BatchTable() {
  const columns: TableProps<InboundListPageRes>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "入库单号",
      dataIndex: "batchId",
      key: "batchId",
    },
    {
      title: "描述",
      dataIndex: "uploadDesc",
      key: "uploadDesc",
    },
    {
      title: "文件数量",
      dataIndex: "totalFiles",
      key: "totalFiles",
    },
    {
      title: "创建人",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "totalFiles",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => {
              edit(record);
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            onClick={() => {
              upload(record);
            }}
          >
            上传
          </Button>
        </Space>
      ),
    },
  ];
  const router = useRouter();
  // 加载动画
  const [loading, setLoading] = useState(false);
  //   添加批次号弹窗
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [tableData, setTableData] = usePageRes<InboundListPageRes>();
  //   当前修改的入库单号
  const [currentBatchNo, setCurrentBatchNo] = useState<InboundListPageRes>();
  //   弹窗类型
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  //   分页入参
  const [pageReq, setPageReq] = useState({
    PageNo: 1,
    PageSize: 10,
  });

  useEffect(() => {
    // getTableData();
  }, []);

  useEffect(() => {
    getTableData();
  }, [pageReq]);

  //   关闭弹窗
  const closeModal = () => {
    setIsAddUserModalOpen(false);
  };

  const addBatchNo = () => {
    setIsAddUserModalOpen(true);
    setModalType("add");
  };

  //   获取表格数据
  const getTableData = async () => {
    try {
      setLoading(true);
      const res = await queryBatchApi(pageReq);
      setTableData(res.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //   修改入库单号
  const edit = (record: InboundListPageRes) => {
    setModalType("edit");
    setIsAddUserModalOpen(true);
    setCurrentBatchNo(record);
  };

  //   分页切换
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPageReq({ PageNo: pagination.current, PageSize: pagination.PageSize });
  };

  // 上传文件 路由跳转
  const upload = (value: InboundListPageRes) => {
    router.push(`/CorpusCollect/Upload?batchId=${value.batchId}`);
  };
  return (
    <>
      <Row className={styles.box_info}>
        <Col span={24}>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={addBatchNo}
          >
            添加批次号
          </Button>
        </Col>
        <Col span={24} className={styles.table_box}>
          <Table
            loading={loading}
            dataSource={tableData?.list}
            columns={columns}
            rowKey={(row) => row.batchId}
            pagination={{
              current: pageReq.PageNo,
              pageSize: pageReq.PageSize,
              total: tableData?.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
      {/* 添加入库号弹窗 */}
      <Modal
        title={modalType === "add" ? "添加批次号" : "修改批次号"}
        open={isAddUserModalOpen}
        onOk={closeModal}
        footer={null}
        onCancel={closeModal}
        width={600}
        destroyOnClose={false}
      >
        <AddBatchModal
          closeModal={closeModal}
          refreshList={getTableData}
          currentBatchNo={currentBatchNo}
          modalType={modalType}
        />
      </Modal>
    </>
  );
}
