import { Injectable } from '@nestjs/common';
import { Equipment } from './dto/equipment.interface';

@Injectable()
export class EquipmentService {
  private equipments: Equipment[] = [
    {
      id: 1,
      name: '吸热器',
      parameters: [
        { name: '表面最高温度', value: '' },
        { name: '最低温度', value: '' },
        { name: '平均温度', value: '' },
      ],
    },
    {
      id: 2,
      name: '入口缓冲罐',
      parameters: [
        { name: '液位', value: '' },
        { name: '温度', value: '' },
        { name: '压力', value: '' },
      ],
    },
    {
      id: 3,
      name: '出口缓冲罐',
      parameters: [
        { name: '液位', value: '' },
        { name: '温度', value: '' },
        { name: '压力', value: '' },
      ],
    },
    {
      id: 4,
      name: '空压机',
      parameters: [
        { name: '温度', value: '' },
        { name: '压力', value: '' },
      ],
    },
    {
      id: 5,
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

  getEquipments(): Equipment[] {
    return this.equipments;
  }
}
