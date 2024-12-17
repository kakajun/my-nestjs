import { Controller, Get } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from './dto/equipment.interface';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  getEquipments(): Equipment[] {
    return this.equipmentService.getEquipments();
  }
}
