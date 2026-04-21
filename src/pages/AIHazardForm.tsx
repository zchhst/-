import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  NavBar, Form, Input, TextArea, ImageUploader, 
  Button, Selector, Stepper, Toast, Card, Skeleton, Space, Modal
} from 'antd-mobile';
import { RobotOutlined, PlusOutlined } from '@ant-design/icons';
import { MOCK_ENTERPRISES } from '../mockData';
import { Enterprise } from '../types';

const AIHazardForm: React.FC = () => {
  const { enterpriseId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const ent = MOCK_ENTERPRISES.find(e => e.id === enterpriseId);
      if (ent) setEnterprise(ent);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [enterpriseId]);

  const [showAiModal, setShowAiModal] = useState(false);
  const [aiText, setAiText] = useState('');

  const handleAIIdentify = async () => {
    const files = form.getFieldValue('photos');
    if (!files || files.length === 0) {
      Toast.show({
        content: '请先上传现场照片',
        position: 'top',
      });
      return;
    }

    setAiLoading(true);
    setShowAiModal(true);
    setAiText('正在分析图片资产...');

    const fullText = '识别结果：\n1. 隐患位置：车间 A 区西北角\n2. 隐患详情：发现地面电线未套管，且部分绝缘层破损，暴露在过道正中，极易引发人员触电或受潮起火隐患。\n3. 等级建议：一般隐患';
    
    let currentText = '';
    const interval = setInterval(() => {
      if (currentText.length < fullText.length) {
        currentText = fullText.slice(0, currentText.length + 2);
        setAiText(currentText);
      } else {
        clearInterval(interval);
        setAiLoading(false);
        setTimeout(() => {
          setShowAiModal(false);
          form.setFieldsValue({
            description: '发现地面电线未套管，且部分绝缘层破损，暴露在过道正中，极易引发人员触电或受潮起火隐患。',
            location: '车间 A 区西北角',
            level: '一般隐患'
          });
          Toast.show({ icon: 'success', content: '识别成功，内容已自动填充' });
        }, 1000);
      }
    }, 50);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    Toast.show({
      icon: 'success',
      content: '提交成功，已推送到企业整改',
    });
    setTimeout(() => {
      navigate('/hazard-records');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton.Title animated />
        <Skeleton.Paragraph animated lineCount={10} />
      </div>
    );
  }

  if (!enterprise) return <div>企业不存在</div>;

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-10">
      <NavBar onBack={() => navigate(-1)}>AI 识隐患</NavBar>

      <Card className="m-3 border-none shadow-none rounded-xl">
        <div className="text-gray-400 text-xs mb-1">企业信息</div>
        <div className="font-bold text-base mb-1">{enterprise.name}</div>
        <div className="text-gray-500 text-sm">行业：{enterprise.industry} | 区域：{enterprise.city}{enterprise.district}</div>
      </Card>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          deadline: 7,
          level: '一般隐患',
          code: 'AQ-' + Math.random().toString(36).substr(2, 6).toUpperCase()
        }}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交隐患
          </Button>
        }
      >
        <Form.Header>现场照片</Form.Header>
        <Form.Item
          name="photos"
          rules={[{ required: true, message: '请上传现场照片' }]}
        >
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <ImageUploader 
                upload={async (file) => ({ url: URL.createObjectURL(file) })} 
                maxCount={4}
              >
                <div 
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #ccc'
                  }}
                >
                  <PlusOutlined style={{ fontSize: 24, color: '#999' }} />
                </div>
              </ImageUploader>
              <div className="text-gray-400 text-xs mt-1">最多上传 4 张照片</div>
            </div>
            <Button 
              size="small" 
              color="primary" 
              fill="outline"
              loading={aiLoading}
              onClick={handleAIIdentify}
              style={{ borderRadius: 16, height: 32, marginBottom: -4 }}
            >
              <Space>
                <RobotOutlined />
                <span>AI 识隐患</span>
              </Space>
            </Button>
          </div>
        </Form.Item>

        <Form.Header>基本信息</Form.Header>
        <Form.Item name="location" label="隐患位置" rules={[{ required: true }]}>
          <Input placeholder="请输入隐患具体位置" />
        </Form.Item>
        <Form.Item name="description" label="隐患描述" rules={[{ required: true }]}>
          <TextArea placeholder="请输入隐患详细描述" autoSize={{ minRows: 2, maxRows: 5 }} />
        </Form.Item>
        <Form.Item name="basis" label="隐患依据">
          <Input placeholder="请输入判定依据（选填）" />
        </Form.Item>
        <Form.Item name="measures" label="整改措施与建议">
          <TextArea placeholder="请输入整改措施（选填）" autoSize />
        </Form.Item>

        <Form.Header>整改设置</Form.Header>
        <Form.Item name="level" label="隐患等级" rules={[{ required: true }]}>
          <Selector
            options={[
              { label: '一般隐患', value: '一般隐患' },
              { label: '重大隐患', value: '重大隐患' },
            ]}
          />
        </Form.Item>
        <Form.Item name="code" label="隐患编码">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="deadline" label="整改期限（天）">
          <Stepper min={1} max={30} />
        </Form.Item>
      </Form>

      <Modal
        visible={showAiModal}
        content={
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <RobotOutlined spin={aiLoading} />
              <span className="font-bold">AI 智能分析中...</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg min-h-[120px] whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {aiText}
            </div>
          </div>
        }
        closeOnMaskClick={false}
      />
    </div>
  );
};

export default AIHazardForm;
