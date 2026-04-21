import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  NavBar, SearchBar, Card, Tag, Empty, 
  Space, Steps, Modal, Image
} from 'antd-mobile';
import { MOCK_HAZARDS } from '../mockData';
import { HazardRecord } from '../types';

const { Step } = Steps;

const HazardRecords: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedHazard, setSelectedHazard] = useState<HazardRecord | null>(null);

  const filtered = MOCK_HAZARDS.filter(h => 
    h.enterpriseName.includes(searchText) || h.description.includes(searchText)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待整改': return 'danger';
      case '整改中': return 'warning';
      case '已整改': return 'success';
      default: return 'default';
    }
  };

  const showDetail = (hazard: HazardRecord) => {
    setSelectedHazard(hazard);
  };

  const customDescriptions = (items: { label: string, children: React.ReactNode }[]) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-gray-400 text-xs mb-1">{item.label}</span>
          <div className="text-gray-800 text-sm">{item.children}</div>
        </div>
      ))}
    </div>
  );

  const DetailView = ({ hazard }: { hazard: HazardRecord }) => (
    <div className="bg-[#f5f5f5] min-h-screen absolute inset-0 z-50 overflow-y-auto">
      <NavBar onBack={() => setSelectedHazard(null)}>隐患详情</NavBar>
      
      <div className="p-3">
        <Card className="mb-3 border-none rounded-xl" title={<span className="text-base font-bold">企业基础信息</span>}>
          {customDescriptions([
            { label: '企业名称', children: hazard.enterpriseName },
            { label: '所属行业', children: hazard.industry },
            { label: '行政区划', children: hazard.district },
          ])}
        </Card>

        <Card className="mb-3 border-none rounded-xl" title={<span className="text-base font-bold">隐患信息</span>}>
          {customDescriptions([
            { label: '现场照片', children: <Image src="https://picsum.photos/seed/hazard/300/200" width={120} height={80} style={{ borderRadius: 8 }} /> },
            { label: '隐患位置', children: hazard.location },
            { label: '隐患详情', children: hazard.description },
            { label: '隐患等级', children: <Tag color={hazard.level === '重大事故隐患' ? 'red' : 'blue'}>{hazard.level}</Tag> },
            { label: '隐患编码', children: hazard.code },
            { label: '整改期限', children: `${hazard.deadline} 天` },
          ])}
        </Card>

        <Card className="mb-3 border-none rounded-xl" title="整改状态">
          <Steps direction="vertical" current={hazard.status === '待整改' ? 0 : hazard.status === '整改中' ? 1 : 2}>
            <Step title="隐患提报" description={`${hazard.reporter} 于 ${hazard.reportTime} 提报`} />
            <Step title="整改中" description="企业负责人已签收，正在制定整改方案" />
            <Step title="已完成" description="待验收" />
          </Steps>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <NavBar onBack={() => navigate('/')}>隐患记录</NavBar>
      
      <div className="p-3">
        <SearchBar 
          placeholder="搜索企业或隐患描述" 
          value={searchText}
          onChange={setSearchText}
        />
      </div>

      <div className="px-3">
        {filtered.length > 0 ? (
          filtered.map(h => (
            <Card 
              key={h.id} 
              className="mb-3 border-none rounded-xl card-shadow"
              onClick={() => showDetail(h)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-base truncate flex-1 pr-2">{h.enterpriseName}</div>
                <Tag color={getStatusColor(h.status)}>{h.status}</Tag>
              </div>
              <div className="text-sm text-gray-600 line-clamp-2 mb-2">{h.description}</div>
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>提报人：{h.reporter}</span>
                <span>{h.reportTime}</span>
              </div>
            </Card>
          ))
        ) : (
          <Empty description="暂无隐患记录" />
        )}
      </div>

      {selectedHazard && <DetailView hazard={selectedHazard} />}
    </div>
  );
};

export default HazardRecords;
