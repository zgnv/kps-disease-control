import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
} from "antd";
import styles from "../index.module.css";
import { singleFileResult } from "@/app/types/corpusUpload";
import { useEffect } from "react";
import dayjs from 'dayjs'

interface AddBatchModalProps {
  singleFileResult?: singleFileResult;
  currentBatchNo?: string;
}

const SingleForm: React.FC<AddBatchModalProps> = (props) => {
  const { singleFileResult, currentBatchNo } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const save = async () => {
    const value = await form.validateFields();
    const req = {
      ...value,
      effectDate:dayjs(value.effectDate).format('YYYY-MM-DD'),
      batchId: currentBatchNo,
      fileName:singleFileResult?.name,
      filType:singleFileResult?.type,

    };
    console.log(req, "req");
  };

  useEffect(() => {
    console.log(singleFileResult, "form组件的回显");
    // 获取数据回显
    if (singleFileResult) {
      form.setFieldsValue({
        businessType: "业务类型",
        fungibleFile: "可替代",
        isOpen: true,
        isEfftct: true,
        resultFileType: singleFileResult.resultFileType,
        effectDate: dayjs(singleFileResult.effectDate, 'YYYY-MM-DD'),
        fileInfo: singleFileResult.fileInfo,
      });
    }
  }, [singleFileResult]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className={styles.title}>处理结果</div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: "1" }}
        onValuesChange={() => {}}
        className={styles.form_box}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="文件类型" name="resultFileType">
              <Select
                showSearch
                placeholder="请选择文件类型"
                optionFilterProp="label"
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
          <Col span={12}>
            <Form.Item label="业务类型" name="businessType">
              <Select
                showSearch
                placeholder="请选择业务类型"
                optionFilterProp="label"
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
          <Col span={12}>
            <Form.Item label="生效生成日期" name="effectDate">
              <DatePicker format={'YYYY-MM-DD'} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="可替代文件" name="fungibleFile">
              <Select
                showSearch
                placeholder="请选择可替代文件"
                optionFilterProp="label"
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
          <Col span={12}>
            <Form.Item label="是否公开资料" name="isOpen">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="是都最新有效" name="isEfftct">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="文件介绍" name="fileInfo">
              <TextArea
                rows={4}
                placeholder="请输入文件介绍"
                maxLength={500}
                showCount
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12}>
            <Button type="primary" className={styles.save_btn} onClick={save}>
              保存语料
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SingleForm;
