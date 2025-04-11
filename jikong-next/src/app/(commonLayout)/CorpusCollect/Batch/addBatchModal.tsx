"use client";
import { Button, Form, Input, Space } from "antd";
import {
  DataType,
  addInboundRequest,
  updateInboundRequest,
} from "@/app/types/batchType";
import { useEffect } from "react";
const { TextArea } = Input;

interface AddBatchModalProps {
  closeModal: () => void;
  currentBatchNo?: DataType;
  modalType: "add" | "edit";
}

const AddBatchModal: React.FC<AddBatchModalProps> = (props) => {
  const { currentBatchNo, closeModal, modalType } = props;
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    // 修改数据回显
    if (currentBatchNo) {
      form.setFieldsValue({
        info: currentBatchNo.info,
      });
    }
  }, [currentBatchNo]);

  const onFinish = async (values: any) => {
    const value = await form.validateFields();
    console.log(value, "value");
    if (modalType === "add") {
      const req: addInboundRequest = {
        info: value.info,
      };
      console.log(req,'req1');
    } else {
      if (!currentBatchNo) return;
      const req: updateInboundRequest = {
        info: value.info,
        id: currentBatchNo.id,
      };
    }
    closeModal();
  };

  const close = () => {
    closeModal();
  };

  return (
    <>
      <Form
        layout="vertical"
        name="vertical"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Form.Item label="描述" name="info" rules={[{ required: true }]}>
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
