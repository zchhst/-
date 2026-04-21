export interface Enterprise {
  id: string;
  name: string;
  industry: string;
  district: string;
  city: string;
}

export interface HazardRecord {
  id: string;
  enterpriseId: string;
  enterpriseName: string;
  industry: string;
  district: string;
  photoUrl?: string;
  location: string;
  description: string;
  basis?: string;
  rectificationMeasures?: string;
  level: '一般隐患' | '重大事故隐患';
  code: string;
  deadline: number;
  status: '待整改' | '整改中' | '已整改';
  reporter: string;
  reportTime: string;
}

export interface InspectionItem {
  id: string;
  name: string;
  basis: string;
  result?: '无异常' | '存在异常' | '不涉及';
  hazardInfo?: Partial<HazardRecord>;
}

export interface InspectionChecklist {
  id: string;
  name: string;
  riskPoint: string;
  itemCount: number;
  items: InspectionItem[];
}

export interface InspectionRecord {
  id: string;
  enterpriseId: string;
  enterpriseName: string;
  district: string;
  checklistName: string;
  hazardCount: number;
  inspector: string;
  time: string;
  items: InspectionItem[];
}
