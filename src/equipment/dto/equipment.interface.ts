export interface Equipment {
  id: number;
  name: string;
  deviceCode: string;
  parameters: {
    name: string;
    value: string;
  }[];
}

export interface TabsEquipments {
  description: string;
  name: string;
}
