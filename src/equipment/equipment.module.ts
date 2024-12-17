// src/equipment/equipment.module.ts
import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';

@Module({
  providers: [EquipmentService], // 注册服务
  controllers: [EquipmentController], // 注册控制器
})
export class EquipmentModule {}
