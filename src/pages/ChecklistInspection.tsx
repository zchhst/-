import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  NavBar, Form, Radio, Card, Button, List, 
  Toast, Space, ImageUploader, Input, TextArea, 
  Selector, Stepper, Skeleton
} from 'antd-mobile';
import { RobotOutlined, CheckCircleOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { MOCK_ENTERPRISES, MOCK_CHECKLISTS } from '../mockData';
import { Enterprise, InspectionChecklist } from '../types';
import { Modal } from 'antd-mobile';

const HazardSubForm = ({ fieldPath, form }: { fieldPath: number, form: any }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiText, setAiText] = useState('');

  const handleAI = async () => {
    const items = form.getFieldValue('items') || [];
    const photos = items[fieldPath]?.hazardInfo?.photos;

    if (!photos || photos.length === 0) {
      Toast.show('请先上传图片');
      return;
    }

    setAiLoading(true);
    setShowAiModal(true);
    setAiText('正在审查检查项隐患...');

    const fullText = '识别分析：\n检查项：灭火器压力表\n结论：异常\n原因：压力表指针处于红色区域，表明压力不足，无法在火灾发生时有效喷射灭火剂。\n建议：立即更换或重新充装。';
    
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
          const currentItems = form.getFieldValue('items') || [];
          currentItems[fieldPath].hazardInfo = {
            ...currentItems[fieldPath].hazardInfo,
            description: '灭火器压力表指针处于红色区域，压力不足。',
            location: '走廊消防器材柜'
          };
          form.setFieldsValue({ items: currentItems });
          Toast.show('AI 自动填充完成');
        }, 800);
      }
    }, 40);
  };

  return (
    <div className="mt-2 p-3 bg-red-50 rounded-lg border border-red-100">
      <div className="text-red-500 text-xs font-bold mb-2 flex items-center gap-1">
        <InfoCircleOutlined /> 填写隐患信息
      </div>
      <Form.Item name={[fieldPath, 'hazardInfo', 'photos']} label="现场照片" rules={[{ required: true }]}>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <ImageUploader 
              upload={async f => ({ url: URL.createObjectURL(f) })} 
              maxCount={4}
            >
              <div 
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 4,
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed #ccc'
                }}
              >
                <PlusOutlined style={{ fontSize: 20, color: '#999' }} />
              </div>
            </ImageUploader>
            <div className="text-gray-400 text-xs mt-1">最多上传 4 张照片</div>
          </div>
          <Button 
            size="mini" 
            color="primary" 
            fill="outline" 
            loading={aiLoading} 
            onClick={handleAI}
            style={{ borderRadius: 16, marginBottom: -4 }}
          >
            <RobotOutlined /> AI识别
          </Button>
        </div>
      </Form.Item>
      <Form.Item name={[fieldPath, 'hazardInfo', 'location']} label="隐患位置" rules={[{ required: true }]}>
        <Input placeholder="请点击识别或手动输入" />
      </Form.Item>
      <Form.Item name={[fieldPath, 'hazardInfo', 'description']} label="隐患描述" rules={[{ required: true }]}>
        <TextArea placeholder="请点击识别或手动输入" autoSize />
      </Form.Item>

      <Modal
        visible={showAiModal}
        content={
          <div className="py-2">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <RobotOutlined spin={aiLoading} />
              <span className="font-bold text-sm">AI 实时判定检查项...</span>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg min-h-[100px] whitespace-pre-wrap text-xs leading-relaxed text-gray-700">
              {aiText}
            </div>
          </div>
        }
        closeOnMaskClick={false}
      />
    </div>
  );
};

const ChecklistInspection: React.FC = () => {
  const { enterpriseId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedChecklist, setSelectedChecklist] = useState<InspectionChecklist | null>(null);
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ent = MOCK_ENTERPRISES.find(e => e.id === enterpriseId);
    if (ent) setEnterprise(ent);
    setLoading(false);
  }, [enterpriseId]);

  const handleSelectChecklist = (checklist: InspectionChecklist) => {
    setSelectedChecklist(checklist);
  };

  const onFinish = (values: any) => {
    console.log(values);
    Toast.show({ icon: 'success', content: '检查已提交' });
    navigate('/inspection-records');
  };

  if (loading) return <div className="p-4"><Skeleton animated /></div>;

  if (!selectedChecklist) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen">
        <NavBar onBack={() => navigate(-1)}>选择检查清单</NavBar>
        <div className="p-3">
          <div className="text-gray-500 text-sm mb-2">企业：{enterprise?.name}</div>
          <List header="可用检查清单">
            {MOCK_CHECKLISTS.map(c => (
              <List.Item
                key={c.id}
                onClick={() => handleSelectChecklist(c)}
                description={`${c.riskPoint} | ${c.itemCount} 项`}
              >
                {c.name}
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-10">
      <NavBar onBack={() => setSelectedChecklist(null)}>{selectedChecklist.name}</NavBar>

      <Card className="m-3 border-none shadow-none rounded-xl">
        <div className="text-gray-400 text-xs mb-1">基本信息</div>
        <div className="font-bold text-base mb-1">{enterprise?.name}</div>
        <div className="text-gray-500 text-sm">行业：{enterprise?.industry} | 区域：{enterprise?.city}{enterprise?.district}</div>
      </Card>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ items: selectedChecklist.items.map(() => ({ result: '无异常' })) }}
        footer={<Button block type="submit" color="primary" size="large">提交检查记录</Button>}
      >
        <Form.Header>检查内容</Form.Header>
        {selectedChecklist.items.map((item, index) => (
          <Card key={item.id} className="m-3 border-none shadow-none rounded-xl">
            <div className="font-medium mb-1">{index + 1}. {item.name}</div>
            <div className="text-gray-400 text-xs mb-3">依据：{item.basis}</div>
            
            <Form.Item name={['items', index, 'result']} noStyle>
              <Radio.Group>
                <Space direction="horizontal" style={{ '--gap': '16px' }}>
                  <Radio value="无异常"><span className="text-green-600">无异常</span></Radio>
                  <Radio value="存在异常"><span className="text-red-500">存在异常</span></Radio>
                  <Radio value="不涉及"><span className="text-gray-400">不涉及</span></Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item dependencies={[['items', index, 'result']]} noStyle>
              {({ getFieldValue }) => {
                const result = getFieldValue(['items', index, 'result']);
                return result === '存在异常' ? <HazardSubForm fieldPath={index} form={form} /> : null;
              }}
            </Form.Item>
          </Card>
        ))}
      </Form>
    </div>
  );
};

export default ChecklistInspection;
