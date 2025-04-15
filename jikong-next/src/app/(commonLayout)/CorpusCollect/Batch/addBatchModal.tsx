"use client";
import { addBatchApi, updateBatchApi } from "@/app/service/corpusCollect/batch";
import {
  addInboundRequest,
  InboundListPageRes,
  updateInboundRequest
} from "@/app/types/batchType";
import { Button, Form, Input, message, Space } from "antd";
import { useEffect } from "react";
const { TextArea } = Input;

interface AddBatchModalProps {
  closeModal: () => void;
  refreshList: () => void;
  currentBatchNo?: InboundListPageRes;
  modalType: "add" | "edit";
}

const AddBatchModal: React.FC<AddBatchModalProps> = (props) => {
  const {
    currentBatchNo,
    closeModal,
    modalType,
    refreshList,
  } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    // 修改数据回显
    if (currentBatchNo) {
      form.setFieldsValue({
        batchDesc: currentBatchNo.uploadDesc,
      });
    }
  }, [currentBatchNo]);

  const onFinish = async () => {
    const value = await form.validateFields();
    if (modalType === "add") {
      const req: addInboundRequest = {
        batchDesc: value.batchDesc,
      };
      const res = await addBatchApi(req);
      if (res.code === 200) {
        messageApi.open({
          type: "success",
          content: `添加成功！`,
        });
        refreshList();
        close();
      }
    } else {
      if (!currentBatchNo) return;
      const req: updateInboundRequest = {
        batchDesc: value.batchDesc,
        batchId: currentBatchNo.batchId,
      };
      const res = await updateBatchApi(req);
      if (res.code === 200) {
        messageApi.open({
          type: "success",
          content: `修改成功！`,
        });
        refreshList();
        close();
      }
    }
    closeModal();
  };

  const close = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        name="vertical"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Form.Item label="描述" name="batchDesc" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="请输入描述" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" onClick={onFinish}>
              提交
            </Button>
            <Button htmlType="button" onClick={close}>
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBatchModal;
