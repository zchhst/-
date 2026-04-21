import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, SearchBar, List, Tag, Collapse, Badge, Space } from 'antd-mobile';
import { MOCK_ENTERPRISES } from '../mockData';

interface EnterpriseSelectorProps {
  nextPath: string;
}

const EnterpriseSelector: React.FC<EnterpriseSelectorProps> = ({ nextPath }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const filteredEnterprises = MOCK_ENTERPRISES.filter(e => 
    e.name.includes(searchText)
  );

  // Group by city and then district
  const cityGroups = MOCK_ENTERPRISES.reduce((acc, e) => {
    if (!acc[e.city]) {
      acc[e.city] = { districts: {} as Record<string, { enterpriseList: typeof MOCK_ENTERPRISES, count: number }>, total: 0 };
    }
    acc[e.city].total += 1;
    if (!acc[e.city].districts[e.district]) {
      acc[e.city].districts[e.district] = { enterpriseList: [], count: 0 };
    }
    acc[e.city].districts[e.district].enterpriseList.push(e);
    acc[e.city].districts[e.district].count += 1;
    return acc;
  }, {} as Record<string, { districts: Record<string, { enterpriseList: typeof MOCK_ENTERPRISES, count: number }>, total: 0 }>);

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-10">
      <NavBar onBack={() => navigate('/')}>选择企业</NavBar>
      
      <div className="p-3 sticky top-0 bg-[#f5f5f5] z-10">
        <SearchBar 
          placeholder="请输入企业名称搜索" 
          value={searchText}
          onChange={setSearchText}
        />
      </div>

      {!searchText ? (
        <Collapse defaultActiveKey={['杭州市']}>
          {Object.entries(cityGroups).map(([city, data]) => (
            <Collapse.Panel key={city} title={
              <div className="flex justify-between items-center w-full pr-4">
                <span className="font-bold">{city}</span>
                <Badge content={data.total} color='var(--adm-color-primary)' />
              </div>
            }>
              <Collapse>
                {Object.entries(data.districts).map(([district, districtData]) => (
                  <Collapse.Panel key={district} title={
                    <div className="flex justify-between items-center w-full pr-2">
                       <span className="text-gray-600">{district}</span>
                       <span className="text-gray-400 text-xs">{districtData.count} 家企业</span>
                    </div>
                  }>
                    <List>
                      {districtData.enterpriseList.map(enterprise => (
                        <List.Item
                          key={enterprise.id}
                          onClick={() => navigate(`${nextPath}/${enterprise.id}`)}
                          description={
                            <div className="text-gray-400 text-xs mt-1">所属行业：{enterprise.industry}</div>
                          }
                        >
                          <div className="font-medium text-sm">{enterprise.name}</div>
                        </List.Item>
                      ))}
                    </List>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : (
        <div className="mt-2">
          <List>
            {filteredEnterprises.map(enterprise => (
              <List.Item
                key={enterprise.id}
                onClick={() => navigate(`${nextPath}/${enterprise.id}`)}
                description={
                  <Space direction="vertical" style={{ '--gap': '0px' }}>
                    <div className="text-gray-400 text-xs mt-1">所属行业：{enterprise.industry}</div>
                    <div className="text-gray-400 text-xs">行政区划：{enterprise.city}/{enterprise.district}</div>
                  </Space>
                }
              >
                <div className="font-medium text-base">{enterprise.name}</div>
              </List.Item>
            ))}
          </List>
          {filteredEnterprises.length === 0 && (
            <div className="p-10 text-center text-gray-400">暂无匹配企业</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnterpriseSelector;
