import { PageRes, usePageRes } from "@/app/components/hooks/UsePageRes";
import { DataType } from "@/app/types/batchType";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Table,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import styles from "../index.module.css";
import dayjs from "dayjs";

interface BatchLeftProps {
  selectFile: (value: any) => void;
  currentBatchNo?: string;
}

const BatchTable: React.FC<BatchLeftProps> = (props) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  // 加载动画
  const [loading, setLoading] = useState(false);
  const columns: TableProps<DataType>["columns"] = [
    // {
    //   title: "文件名",
    //   dataIndex: "name1",
    //   key: "name1",
    //   // 隐藏列但保留 DOM
    //   onCell: () => ({ style: { display: "none" } }), // 隐藏单元格
    //   onHeaderCell: () => ({ style: { display: "none" } }), // 隐藏表头
    //   render: (_, record) => (
    //     <Form.Item
    //       style={{ display: "none" }}
    //       name={["files", record.key, "name"]}
    //       initialValue={record.name}
    //       noStyle
    //     >
    //       <Input style={{ display: "none" }} />
    //     </Form.Item>
    //   ),
    // },
    // {
    //   title: "文件类型",
    //   dataIndex: "type",
    //   key: "type",
    //   // 隐藏列但保留 DOM
    //   onCell: () => ({ style: { display: "none" } }), // 隐藏单元格
    //   onHeaderCell: () => ({ style: { display: "none" } }), // 隐藏表头
    //   render: (_, record) => (
    //     <Form.Item
    //       style={{ display: "none" }}
    //       name={["files", record.key, "type"]}
    //       initialValue={record.type}
    //       noStyle
    //     >
    //       <Input style={{ display: "none" }} />
    //     </Form.Item>
    //   ),
    // },
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "文件类型",
      dataIndex: "resultFileType",
      key: "resultFileType",
      width: 180,
      render: (_, record) => (
        <Form.Item
          name={["files", record.key, "resultFileType"]}
          initialValue={record.resultFileType}
          noStyle
        >
          <Select
            showSearch
            placeholder="请选择文件类型"
            optionFilterProp="label"
            style={{ width: "120px" }}
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
      ),
    },
    {
      title: "业务类型",
      dataIndex: "businessType",
      key: "businessType",
      width: 180,
      render: (_, record) => (
        <Form.Item
          name={["files", record.key, "businessType"]}
          initialValue={record.businessType}
          noStyle
        >
          <Select
            showSearch
            placeholder="请选择文件类型"
            optionFilterProp="label"
            onChange={() => {}}
            style={{ width: "120px" }}
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
      ),
    },
    {
      title: "生效生成日期",
      dataIndex: "effectDate",
      key: "effectDate",
      width: 160,
      render: (_, record) => (
        <Form.Item
          name={["files", record.key, "effectDate"]}
          initialValue={record.effectDate}
          noStyle
        >
          <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
        </Form.Item>
      ),
    },
    {
      title: "可替代文件",
      dataIndex: "fungibleFile",
      key: "fungibleFile",
      width: 160,
      render: (_, record) => (
        <Form.Item
          name={["files", record.key, "fungibleFile"]}
          initialValue={record.fungibleFile}
          noStyle
        >
          <Select
            showSearch
            placeholder="请选择可替代文件"
            optionFilterProp="label"
            onChange={() => {}}
            style={{ width: "120px" }}
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
      ),
    },
    {
      title: "是否公开",
      dataIndex: "isOpen",
      width: 120,
      key: "isOpen",
      render: (_, record) => (
        <Form.Item
          name={["files", record.key, "isOpen"]}
          initialValue={record.isOpen}
          noStyle
        >
          <Switch />
        </Form.Item>
      ),
    },
    {
      title: "是都最新",
      dataIndex: "isEfftct",
      width: 120,
      key: "isEfftct",
      render: (_, record) => (
        <Form.Item
          name={["files", record.key, "isEfftct"]}
          initialValue={record.isEfftct}
          noStyle
        >
          <Switch />
        </Form.Item>
      ),
    },
    {
      title: "文件介绍",
      dataIndex: "fileInfo",
      key: "fileInfo",
      width: 240,
      render: (_, record) => (
        <Form.Item
          name={["files", record.key, "fileInfo"]}
          initialValue={record.fileInfo}
          noStyle
        >
          <TextArea
            rows={4}
            placeholder="请输入文件介绍"
            maxLength={500}
            showCount
          />
        </Form.Item>
      ),
    },
  ];
  const [tableData, setTableData] = usePageRes<DataType>();
  //   分页入参
  const [pageReq, setPageReq] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getTableData();
  }, []);

  //   获取表格数据
  const getTableData = async () => {
    setLoading(true);
    // const res  =awa
    const date = "2024-5-20";
    const res: PageRes<DataType> = {
      total: 100,
      current: 1,
      pages: 10,
      size: 10,

      records: Array.from({ length: 100 }).map<DataType>((_, i) => ({
        batchId: i + 1 + "",
        key: i + 1,
        id: i + 1,
        name: "文件名称", //文件名
        type: "类型", //文件类型
        resultFileType: "String", //结果文件类型
        businessType: "String", //业务类型
        effectDate: dayjs("2020-05-20", "YYYY-MM-DD"),
        fungibleFile: "String", //可替代文件
        isOpen: true, //是否公开资料
        isEfftct: true, //是否最新有效
        fileInfo: "jieshao ", //文件介绍
      })),
    };
    setTableData(res);
    setLoading(false);
  };

  // 批量保存语料
  const save = () => {
    const values = form.getFieldsValue();
    // 通过ref获取当前表单值
    
    console.log(values, "表单值");

    // console.log(tableData?.records, "tableData?.records");
  };

  //   分页切换
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPageReq({ page: pagination.current, pageSize: pagination.pageSize });
  };
  return (
    <div className={`${styles.right_table} w-full h-full flex flex-col`}>
      <div className={styles.title}>处理结果</div>
      <Form form={form}>
        <Table
          loading={loading}
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
          scroll={{ x: "calc(500px + 50%)", y: 47 * 10 }}
          onChange={handleTableChange}
        />
      </Form>
      <Row>
        <Col span={12} offset={12}>
          <Button type="primary" className={styles.save_btn} onClick={save}>
            批量保存语料
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BatchTable;
