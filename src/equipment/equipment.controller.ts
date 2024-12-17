import { Controller, Get, HttpException, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { EquipmentService } from './equipment.service';
import { Equipment, TabsEquipments } from './dto/equipment.interface';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get('tabs')
  getTabsEquipments(@Res() res: Response): Response<TabsEquipments[]> {
    const data: TabsEquipments[] = this.equipmentService.getTabsEquipments();
    return res.status(200).json(this.formatResponse(200, 'Success', data));
  }

  @Get('by-name')
  getEquipmentByName(
    @Query('name') name: string,
    @Res() res: Response,
  ): Response<Equipment[]> {
    const result: Equipment[] | undefined =
      this.equipmentService.getEquipmentByName(name);
    if (!result) {
      throw new HttpException(`No equipment found with name: ${name}`, 404);
    }
    return res.status(200).json(this.formatResponse(200, 'Success', result));
  }

  private formatResponse<T>(code: number, msg: string, data: T) {
    return { code, msg, data };
  }
}
