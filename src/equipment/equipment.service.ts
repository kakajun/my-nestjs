import { Injectable } from '@nestjs/common';
import { Equipment, TabsEquipments } from './dto/equipment.interface';

@Injectable()
export class EquipmentService {
  private laserHeatCollectionEquipments: Equipment[] = [
    {
      id: 1,
      deviceCode: 'sdeeefggf',
      name: '吸热器',
      parameters: [
        { name: '表面最高温度', value: '' },
        { name: '最低温度', value: '' },
        { name: '平均温度', value: '' },
      ],
    },
    {
      id: 2,
      deviceCode: 'eettwqwq',
      name: '入口缓冲罐',
      parameters: [
        { name: '液位', value: '' },
        { name: '温度', value: '' },
        { name: '压力', value: '' },
      ],
    },
    {
      id: 3,
      deviceCode: 'sdyyyrfggf',
      name: '出口缓冲罐',
      parameters: [
        { name: '液位', value: '' },
        { name: '温度', value: '' },
        { name: '压力', value: '' },
      ],
    },
    {
      id: 4,
      deviceCode: 'sdfeewggf',
      name: '空压机',
      parameters: [
        { name: '温度', value: '' },
        { name: '压力', value: '' },
      ],
    },
    {
      id: 5,
      deviceCode: 'sdfgqrhfgf',
      name: '冷盐泵',
      parameters: [
        { name: '转速', value: '' },
        { name: '泵体轴温度', value: '' },
        { name: '电机轴温度', value: '' },
        { name: '震动x', value: '' },
        { name: '震动y', value: '' },
        { name: '震动z', value: '' },
      ],
    },
  ];

  private thermalStorageEquipments: Equipment[] = [
    {
      id: 6,
      deviceCode: 'sdfhjfghggf',
      name: '卸盐槽泵',
      parameters: [
        { name: '转速', value: '' },
        { name: '泵体轴温度', value: '' },
        { name: '电机轴温度', value: '' },
        { name: '震动x', value: '' },
        { name: '震动y', value: '' },
        { name: '震动z', value: '' },
      ],
    },
    {
      id: 7,
      deviceCode: 'sdfggetyerf',
      name: '过热器',
      parameters: [
        { name: '熔盐进口温度', value: '' },
        { name: '熔盐出口温度', value: '' },
        { name: '蒸汽进口温度', value: '' },
        { name: '蒸汽出口温度', value: '' },
        { name: '盐侧压力', value: '' },
        { name: '汽侧压力', value: '' },
        { name: '温升速率', value: '' },
      ],
    },
    {
      id: 8,
      deviceCode: 'sdfwe23ggf',
      name: '再热器',
      parameters: [
        { name: '熔盐进口温度', value: '' },
        { name: '熔盐出口温度', value: '' },
        { name: '蒸汽进口温度', value: '' },
        { name: '蒸汽出口温度', value: '' },
        { name: '盐侧压力', value: '' },
        { name: '汽侧压力', value: '' },
        { name: '温升速率', value: '' },
      ],
    },
    {
      id: 9,
      deviceCode: 'wsfsdfggf',
      name: '汽包',
      parameters: [
        { name: '温度', value: '' },
        { name: '压力', value: '' },
        { name: '液位', value: '' },
      ],
    },
    {
      id: 10,
      deviceCode: 'sdfgdfgdfggf',
      name: '蒸发器',
      parameters: [
        { name: '熔盐进口温度', value: '' },
        { name: '熔盐出口温度', value: '' },
        { name: '蒸汽进口温度', value: '' },
        { name: '蒸汽出口温度', value: '' },
        { name: '盐侧压力', value: '' },
        { name: '汽侧压力', value: '' },
        { name: '温升速率', value: '' },
      ],
    },
    {
      id: 11,
      deviceCode: 'sdffghfghggf',
      name: '预热器',
      parameters: [
        { name: '熔盐进口温度', value: '' },
        { name: '熔盐出口温度', value: '' },
        { name: '蒸汽进口温度', value: '' },
        { name: '蒸汽出口温度', value: '' },
        { name: '盐侧压力', value: '' },
        { name: '汽侧压力', value: '' },
        { name: '温升速率', value: '' },
      ],
    },
  ];

  private dqEquipments: Equipment[] = [
    {
      id: 12,
      deviceCode: 'sdfgqeqwgf',
      name: '发电机',
      parameters: [
        { name: '定子电压', value: '' },
        { name: '定子电流', value: '' },
        { name: '有功功率', value: '' },
        { name: '无功功率', value: '' },
        { name: '频率', value: '' },
        { name: '功率因数', value: '' },
      ],
    },
    {
      id: 13,
      deviceCode: 'sderterfggf',
      name: '励磁',
      parameters: [
        { name: '励磁电压', value: '' },
        { name: '励磁电流', value: '' },
        { name: '励磁方式', value: '' },
      ],
    },
    {
      id: 14,
      deviceCode: 'sdrtyfggf',
      name: '主变',
      parameters: [
        { name: '电压', value: '' },
        { name: '电流', value: '' },
        { name: '有功功率', value: '' },
        { name: '无功功率', value: '' },
        { name: '有载档位', value: '' },
        { name: '上层油温', value: '' },
        { name: '绕组温度', value: '' },
      ],
    },
    {
      id: 15,
      deviceCode: 'sdftyuggf',
      name: '高厂变',
      parameters: [
        { name: '电压', value: '' },
        { name: '电流', value: '' },
        { name: '有功功率', value: '' },
        { name: '无功功率', value: '' },
        { name: '有载档位', value: '' },
        { name: '上层油温', value: '' },
        { name: '绕组温度', value: '' },
      ],
    },
    {
      id: 16,
      deviceCode: 'sdyiyufggf',
      name: '启备变',
      parameters: [
        { name: '电压', value: '' },
        { name: '电流', value: '' },
        { name: '有功功率', value: '' },
        { name: '无功功率', value: '' },
        { name: '有载档位', value: '' },
        { name: '上层油温', value: '' },
        { name: '绕组温度', value: '' },
      ],
    },
  ];

  private readonly tabsEquipments: TabsEquipments[] = [
    { name: 'laserHeatCollection', description: '激光集热系统' },
    { name: 'thermalStorage', description: '储热热系统' },
    { name: 'steamTurbine', description: '汽机系统' },
    { name: 'dq', description: '电气系统' },
    { name: 'chemistry', description: '化学系统' },
  ];

  getTabsEquipments(): TabsEquipments[] {
    return this.tabsEquipments;
  }

  getEquipmentByName(name: string): Equipment[] {
    switch (name) {
      case 'laserHeatCollection':
        return this.laserHeatCollectionEquipments;
      case 'thermalStorage':
        return this.thermalStorageEquipments;
      case 'dq':
        return this.dqEquipments;
      default:
        return undefined;
    }
  }
}
