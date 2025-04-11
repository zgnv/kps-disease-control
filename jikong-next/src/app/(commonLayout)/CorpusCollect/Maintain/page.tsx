"use client";
import TitleComponent from "@/app/components/ShowComponent/TitleComponent";
import type { TableProps } from "antd";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Switch,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import dayjs from "dayjs";
import { PageRes, usePageRes } from "@/app/components/hooks/UsePageRes";
import { corpusMainRes } from "@/app/types/corpusMaintenance";

interface DataType {
  key: string;
  name: string;
  fileType: string;
  type: String;
  date: String;
  fungibleFile: String;
  isOpen: boolean;
  isEfftct: boolean;
  fileInfo: String;
}

const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i.toString(),
  name: `Edward ${i}`,
  fileType: "文件类型",
  type: "String",
  date: "Date",
  fungibleFile: "String",
  isOpen: false,
  isEfftct: true,
  fileInfo: "String",
}));

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType:
    | "radio"
    | "date"
    | "textArea"
    | "fileTypeSelect"
    | "typeSelect"
    | "fungibleSelect";
  record: DataType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = (() => {
    switch (inputType) {
      case "fileTypeSelect":
        return (
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
        );
      case "typeSelect":
        return (
          <Select
            showSearch
            placeholder="请选择文件类型"
            optionFilterProp="label"
            style={{ width: "120px" }}
            onChange={() => {}}
            options={[
              {
                value: "文件类型",
                label: "文件类型",
              },
            ]}
          />
        );
      case "fungibleSelect":
        return (
          <Select
            showSearch
            placeholder="请选择可替代文件"
            optionFilterProp="label"
            style={{ width: "120px" }}
            onChange={() => {}}
            options={[
              {
                value: "可替代文件",
                label: "可替代文件",
              },
            ]}
          />
        );
      case "date":
        // return <DatePicker style={{ width: "100%" }} />;
        return <div>123</div>;
      case "radio":
        return <Switch />;
      case "textArea":
        return (
          <Input.TextArea
            rows={2}
            placeholder="请输入文件介绍"
            maxLength={500}
            showCount
          />
        );
      default:
        return <Input />;
    }
  })();

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CorpusMaintenance: React.FC = () => {
  const [form] = Form.useForm();
  // 表格数据
  const [tableData, setTableData] = usePageRes<corpusMainRes>();
  const [editingKey, setEditingKey] = useState("");
  //   分页入参
  const [pageReq, setPageReq] = useState({
    page: 1,
    pageSize: 10,
  });

  const columns = [
    {
      title: "文件名",
      dataIndex: "fileName",
      width: "8%",
    },
    {
      title: "文件类型",
      dataIndex: "fileType",
      width: "12%",
      editable: true,
    },
    {
      title: "业务类型",
      dataIndex: "businessType",
      width: "12%",
      editable: true,
    },
    {
      title: "生效生成日期",
      dataIndex: "effectDate",
      width: "12%",
      editable: true,
      // render: (_: any, record: corpusMainRes) => {
      //   return (
      //     <div>{dayjs(record.effectDate).format("YYYY-MM-DD HH:mm:ss")}</div>
      //   );
      // },
    },
    {
      title: "可替代文件",
      dataIndex: "fungibleFile",
      width: "12%",
      editable: true,
    },
    {
      title: "是否公开",
      dataIndex: "isOpen",
      width: "10%",
      editable: true,
      render: (_: any, record: corpusMainRes) => {
        if (record.isOpen) {
          return <span>是</span>;
        } else {
          return <span>否</span>;
        }
      },
    },
    {
      title: "是否最新",
      dataIndex: "isEfftct",
      width: "10%",
      editable: true,
      render: (_: any, record: corpusMainRes) => {
        if (record.isEfftct) {
          return <span>是</span>;
        } else {
          return <span>否</span>;
        }
      },
    },
    {
      title: "文件介绍",
      dataIndex: "fileInfo",
      width: "10%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: "20%",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => {
                save(record.key);
              }}
            >
              保存
            </Button>
            <Button type="link" onClick={cancel}>
              取消
            </Button>
            <Popconfirm
              title="删除"
              description="确定要删除吗?"
              onConfirm={() => {
                delectConfirm(record);
              }}
              onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => {
                edit(record);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="删除"
              description="确定要删除吗?"
              onConfirm={() => {
                delectConfirm(record);
              }}
              onCancel={cancel}
              okText="是"
              cancelText="否"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns: TableProps<corpusMainRes>["columns"] = columns.map(
    (col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          inputType: (() => {
            switch (col.dataIndex) {
              case "fileType":
                return "fileTypeSelect";
              case "type":
                return "typeSelect";
              case "fungibleFile":
                return "fungibleSelect";
              case "date":
                return "date";
              case "isOpen":
                return "radio";
              case "isEfftct":
                return "radio";
              case "fileInfo":
                return "textArea";
              default:
                return "fileTypeSelect";
            }
          })(),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }
  );

  useEffect(() => {
    getTableData();
  }, []);

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  // 获取表格数据
  const getTableData = async () => {
    const req = {
      ...pageReq,
    };
    // const res = await
    const res: PageRes<corpusMainRes> = {
      total: 100,
      current: 1,
      pages: 10,
      size: 10,
      records: Array.from({ length: 100 }).map<corpusMainRes>((_, i) => ({
        effectDate: "2025-5-10 12:00:00",
        fungibleFile: "可替代文件",
        isOpen: true,
        isEfftct: false,
        fileInfo: "介绍",
        batchId: String(i + 1),
        title: i + "标题1", //标题
        fileName: i + "标题1",
        businessType: "业务",
        fileType: "leix",
        key: i + 1,
      })),
    };
    console.log(res, "res");

    setTableData(res);
  };

  const cancel = () => {
    setEditingKey("");
  };

  //   确认删除
  const delectConfirm = async (value: any) => {
    console.log(value, "value");
    // const res  = await
    message.success("删除成功");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      console.log(row, "row");
      const req = {
        ...row,
      };
      // const res  =await
      message.success("保存成功");
      // const newData = [...tableData];
      // const index = newData.findIndex((item) => key === item.key);
      // if (index > -1) {
      //   const item = newData[index];
      //   newData.splice(index, 1, {
      //     ...item,
      //     ...row,
      //   });
      //   console.log(newData, "newDatanewDatanewData");

      //   setTableData(newData);
      //   setEditingKey("");
      // } else {
      //   newData.push(row);
      //   setTableData(newData);
      //   setEditingKey("");
      // }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
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

  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"corpusMaintenance"} />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <div className={styles.form_box}>
          <Form form={form} component={false}>
            <Table<corpusMainRes>
              components={{
                body: { cell: EditableCell },
              }}
              bordered
              dataSource={tableData?.records}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
                current: pageReq.page,
                pageSize: pageReq.pageSize,
                total: tableData?.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条`,
              }}
              onChange={handleTableChange}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CorpusMaintenance;
