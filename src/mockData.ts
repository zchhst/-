import { Enterprise, InspectionChecklist, HazardRecord, InspectionRecord } from './types';

export const MOCK_ENTERPRISES: Enterprise[] = [
  { id: '1', name: '杭州某某科技有限公司', industry: '信息技术', city: '杭州市', district: '西湖区' },
  { id: '2', name: '杭州阿里巴巴西溪园区', industry: '互联网', city: '杭州市', district: '余杭区' },
  { id: '3', name: '杭州娃哈哈集团工厂', industry: '食品饮料', city: '杭州市', district: '上城区' },
  { id: '4', name: '余杭机械制造一厂', industry: '机械加工', city: '杭州市', district: '余杭区' },
  { id: '5', name: '宁波化工有限公司', industry: '化学制造', city: '宁波市', district: '镇海区' },
  { id: '6', name: '宁波港务集团', industry: '交通运输', city: '宁波市', district: '北仑区' },
  { id: '7', name: '温州鞋业制造成', industry: '轻工业', city: '温州市', district: '鹿城区' },
  { id: '8', name: '嘉兴纺织工厂', industry: '纺织业', city: '嘉兴市', district: '南湖区' },
  { id: '9', name: '湖州物流中心', industry: '物流运输', city: '湖州市', district: '吴兴区' },
  { id: '10', name: '杭州大厦购物中心', industry: '服务业', city: '杭州市', district: '拱墅区' },
  { id: '11', name: '杭州汽轮机股份有限公司', industry: '高端制造', city: '杭州市', district: '拱墅区' },
];

export const MOCK_CHECKLISTS: InspectionChecklist[] = [
  {
    id: '005',
    name: '005消防水泵房检查表',
    riskPoint: '消防水泵房',
    itemCount: 5,
    items: [
      { id: '005-1', name: '水泵控制台是否处于自动状态', basis: 'GB50974-2014' },
      { id: '005-2', name: '机房内是否有杂物堆放', basis: '消防管理规定' },
    ]
  },
  {
    id: '043',
    name: '043危化品存储柜（防爆柜）检查表',
    riskPoint: '危化品仓库',
    itemCount: 4,
    items: [
      { id: '043-1', name: '防爆柜接地是否完好', basis: '化学品安全技术规范' },
      { id: '043-2', name: '柜内化学品是否标签齐全', basis: '危险化学品管理条例' },
    ]
  },
  {
    id: '033',
    name: '033工业气瓶（易燃气体）检查表',
    riskPoint: '气瓶库',
    itemCount: 6,
    items: [
      { id: '033-1', name: '气瓶是否有防震圈', basis: '气瓶安全监察规程' },
    ]
  },
  {
    id: '092',
    name: '092厨房（使用燃气）风险点检查表',
    riskPoint: '员工食堂',
    itemCount: 3,
    items: [
      { id: '092-1', name: '可燃气体探测器是否工作正常', basis: '城镇燃气管理条例' },
    ]
  },
  {
    id: '038',
    name: '038液化石油气瓶检查表',
    riskPoint: '餐饮区',
    itemCount: 5,
    items: [
      { id: '038-1', name: '气瓶放置位置是否通风良好', basis: '安全用气协议' },
    ]
  },
  {
    id: '032',
    name: '032工业气瓶（惰性气体）检查表',
    riskPoint: '实验室',
    itemCount: 4,
    items: [
      { id: '032-1', name: '气瓶标识是否清晰', basis: '实验室安全规定' },
    ]
  },
  {
    id: '025',
    name: '025叉车风险点检查表',
    riskPoint: '物料转运区',
    itemCount: 7,
    items: [
      { id: '025-1', name: '叉车驾驶员是否持证上岗', basis: '特种设备安全法' },
    ]
  }
];

export const MOCK_HAZARDS: HazardRecord[] = [
  {
    id: 'H20240421001',
    enterpriseId: '1',
    enterpriseName: '杭州某某科技有限公司',
    industry: '信息技术',
    district: '杭州市/西湖区',
    location: '2楼茶水间',
    description: '电线裸露，存在漏电风险',
    level: '一般隐患',
    code: 'AQ-001',
    deadline: 3,
    status: '待整改',
    reporter: '张三',
    reportTime: '2024-04-20 10:30',
  }
];

export const MOCK_INSPECTION_RECORDS: InspectionRecord[] = [
  {
    id: 'R001',
    enterpriseId: '1',
    enterpriseName: '杭州某某科技有限公司',
    district: '西湖区',
    checklistName: '消防安全周检查',
    hazardCount: 1,
    inspector: '李四',
    time: '2024-04-19 14:00',
    items: []
  }
];
