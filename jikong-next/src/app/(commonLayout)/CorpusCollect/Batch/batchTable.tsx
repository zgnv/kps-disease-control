"use client";
import { DataType } from "@/app/types/batchType";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { PageRes, usePageRes } from "@/app/components/hooks/UsePageRes";
import AddBatchModal from "./addBatchModal";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";

export default function BatchTable() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "描述",
      dataIndex: "info",
      key: "info",
    },
    {
      title: "文件数量",
      dataIndex: "fileNum",
      key: "fileNum",
    },
    {
      title: "创建人",
      dataIndex: "CreateBy",
      key: "fileNum",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "fileNum",
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
  //   添加批次号弹窗
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [tableData, setTableData] = usePageRes<DataType>();
  //   当前修改的入库单号
  const [currentBatchNo, setCurrentBatchNo] = useState<DataType>();
  //   弹窗类型
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  //   分页入参
  const [pageReq, setPageReq] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getTableData();
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
    // const res  =awa
    const res: PageRes<DataType> = {
      total: 100,
      current: 1,
      pages: 10,
      size: 10,
      records: Array.from({ length: 100 }).map<DataType>((_, i) => ({
        batchId: i + 1 + "",
        key: i + 1,
        id: i + 1,
        info: `西湖区湖底公园${i + 1}号`,
        fileNum: i + 1,
      })),
    };
    setTableData(res);
  };

  //   修改入库单号
  const edit = (record: DataType) => {
    setModalType("edit");
    setIsAddUserModalOpen(true);
    setCurrentBatchNo(record);
  };

  //   分页切换
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPageReq({ page: pagination.current, pageSize: pagination.pageSize });
  };

  // 上传文件 路由跳转
  const upload = (value: DataType) => {
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
      {/* 添加入库号弹窗 */}
      <Modal
        title="添加批次号"
        open={isAddUserModalOpen}
        onOk={closeModal}
        footer={null}
        onCancel={closeModal}
        width={600}
      >
        <AddBatchModal
          closeModal={closeModal}
          currentBatchNo={currentBatchNo}
          modalType={modalType}
        />
      </Modal>
    </>
  );
}
