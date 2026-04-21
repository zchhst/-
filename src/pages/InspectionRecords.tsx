import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, List, Tag, Badge, SearchBar, Card, Space, Empty, Modal } from 'antd-mobile';
import { MOCK_INSPECTION_RECORDS } from '../mockData';
import { InspectionRecord } from '../types';

const InspectionRecords: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const filtered = MOCK_INSPECTION_RECORDS.filter(r => 
    r.enterpriseName.includes(searchText) || r.checklistName.includes(searchText)
  );

  const showDetail = (record: InspectionRecord) => {
    Modal.show({
      title: '检查详情',
      content: (
        <div className="text-left py-2">
          <div className="mb-2"><span className="text-gray-400">企业名称：</span>{record.enterpriseName}</div>
          <div className="mb-2"><span className="text-gray-400">检查清单：</span>{record.checklistName}</div>
          <div className="mb-2"><span className="text-gray-400">检查时间：</span>{record.time}</div>
          <div className="mb-2"><span className="text-gray-400">检查人：</span>{record.inspector}</div>
          <div className="mb-2"><span className="text-gray-400">隐患数量：</span>{record.hazardCount}</div>
          <div className="mt-4 border-t pt-2">
            <div className="font-bold mb-2">检查项回顾</div>
            <div className="text-sm text-gray-500">模拟展示：所有项均已核对。</div>
          </div>
        </div>
      ),
      closeOnMaskClick: true,
      actions: [{ key: 'close', text: '关闭', primary: true }]
    });
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <NavBar onBack={() => navigate('/')}>检查记录</NavBar>
      
      <div className="p-3">
        <SearchBar 
          placeholder="搜索企业或清单名称" 
          value={searchText}
          onChange={setSearchText}
        />
      </div>

      <div className="px-3">
        {filtered.length > 0 ? (
          filtered.map(record => (
            <Card 
              key={record.id} 
              className="mb-3 border-none rounded-xl card-shadow"
              onClick={() => showDetail(record)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-base truncate flex-1 pr-2">{record.enterpriseName}</div>
                <Tag color={record.hazardCount > 0 ? 'danger' : 'success'} fill='outline'>
                  {record.hazardCount > 0 ? `发现 ${record.hazardCount} 处隐患` : '未发现隐患'}
                </Tag>
              </div>
              <div className="text-gray-500 text-sm mb-1">清单：{record.checklistName}</div>
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>检查人：{record.inspector}</span>
                <span>{record.time}</span>
              </div>
            </Card>
          ))
        ) : (
          <Empty description="暂无检查记录" />
        )}
      </div>
    </div>
  );
};

export default InspectionRecords;
