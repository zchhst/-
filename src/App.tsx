/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Grid, Card, NavBar, TabBar } from 'antd-mobile';
import { 
  ScanOutlined, 
  UnorderedListOutlined, 
  HistoryOutlined, 
  FileSearchOutlined,
  RobotOutlined 
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'motion/react';

// Pages - We'll define them or import them
import AIHazardForm from './pages/AIHazardForm';
import ChecklistInspection from './pages/ChecklistInspection';
import InspectionRecords from './pages/InspectionRecords';
import HazardRecords from './pages/HazardRecords';
import EnterpriseSelector from './pages/EnterpriseSelector';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'AI 识隐患',
      icon: <ScanOutlined style={{ fontSize: 26 }} />,
      color: '#2F54EB', // Geek Blue
      bgColor: 'rgba(47, 84, 235, 0.06)',
      desc: '视觉 AI 智能巡检识别',
      path: '/ai-hazard/enterprise',
    },
    {
      title: '清单检查',
      icon: <UnorderedListOutlined style={{ fontSize: 26 }} />,
      color: '#FAAD14', // Gold
      bgColor: 'rgba(250, 173, 20, 0.06)',
      desc: '标准化周期合规排查',
      path: '/checklist/enterprise',
    },
    {
      title: '检查记录',
      icon: <HistoryOutlined style={{ fontSize: 26 }} />,
      color: '#722ED1', // Purple
      bgColor: 'rgba(114, 46, 209, 0.06)',
      desc: '历史检查全流程闭环',
      path: '/inspection-records',
    },
    {
      title: '隐患记录',
      icon: <FileSearchOutlined style={{ fontSize: 26 }} />,
      color: '#13C2C2', // Cyan
      bgColor: 'rgba(19, 194, 194, 0.06)',
      desc: '隐患整改全生命周期',
      path: '/hazard-records',
    }
  ];

  return (
    <div className="pb-10 min-h-screen bg-[#FAFAFA]">
       <div className="px-6 pt-16 pb-8 bg-white border-b border-gray-50 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">企业安全检查</h1>
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
           <RobotOutlined style={{ fontSize: 20 }} />
        </div>
      </div>
      
      <div className="px-6 py-8 text-center">
        <Grid columns={2} gap={20}>
          {menuItems.map((item, index) => (
            <Grid.Item key={index}>
              <motion.div
                whileTap={{ scale: 0.94 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(item.path)}
                className="h-full"
              >
                <Card 
                  className="border border-gray-100/50 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full flex flex-col items-center justify-center p-6 bg-white active:bg-gray-50 transition-all"
                  headerStyle={{ display: 'none' }}
                  bodyStyle={{ padding: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div 
                    style={{ backgroundColor: item.bgColor, color: item.color }} 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  >
                    {item.icon}
                  </div>
                  <div className="font-bold text-lg text-gray-900">
                    {item.title}
                  </div>
                </Card>
              </motion.div>
            </Grid.Item>
          ))}
        </Grid>

        <div className="mt-12">
           <div className="bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] rounded-[32px] p-7 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.2)] relative overflow-hidden">
              <div className="absolute right-[-10%] bottom-[-10%] opacity-15 transform rotate-[-15deg]">
                <RobotOutlined style={{ fontSize: 160 }} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <RobotOutlined style={{ fontSize: 18, color: 'white' }} />
                  </div>
                  <span className="font-bold text-lg tracking-tight">浙里安 AI 巡检助手</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold leading-none">128</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-70 font-bold mb-1">Items Processed Today</span>
                  </div>
                  
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full w-[85%]"></div>
                  </div>
                  
                  <p className="text-[11px] text-blue-100/80 leading-relaxed font-medium">
                    正在实时分析监控画面与上传资产，现已成功拦截并预警潜在生产安全隐患 12 处。
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">System Active</span>
                  </div>
                  <div className="text-[10px] opacity-60">Last updated: 2 mins ago</div>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-16 text-center pb-12">
        <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Standard</div>
          <div className="w-px h-3 bg-gray-200"></div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Security</div>
          <div className="w-px h-3 bg-gray-200"></div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">AI Drive</div>
        </div>
        <p className="mt-8 text-[9px] text-gray-300 font-bold uppercase tracking-[0.25em]">© Safety Shield OS v1.5 Pro</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f5f5f5]">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-hazard/enterprise" element={<EnterpriseSelector nextPath="/ai-hazard/form" />} />
            <Route path="/ai-hazard/form/:enterpriseId" element={<AIHazardForm />} />
            <Route path="/checklist/enterprise" element={<EnterpriseSelector nextPath="/checklist/list" />} />
            <Route path="/checklist/list/:enterpriseId" element={<ChecklistInspection />} />
            <Route path="/inspection-records" element={<InspectionRecords />} />
            <Route path="/hazard-records" element={<HazardRecords />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
