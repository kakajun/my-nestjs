import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import envConfig from '../config/env'
import { PostsEntity } from './posts/entities/posts.entity'
import { AuthModule } from './auth/auth.module'
import { AuthEntity } from './auth/entities/auth.entity'
import { APP_GUARD } from '@nestjs/core'
import { jwtAuthGuard } from './auth/jwt-auth.grard'

import { UploadModule } from './upload/upload.module'
import { LoggerService } from './logger/logger.service'
import { TimerService } from './timer/timer.service'
import { TimerModule } from './timer/timer.module'
import { PetModule } from './pet/pet.module'
import { PetEntity } from './pet/entities/pet.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite', // 修改为 sqlite
        entities: [AuthEntity, PostsEntity, PetEntity],
        database: configService.get('DB_NAME'), // 数据库文件名，SQLite 使用文件路径
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
    PostsModule,
    AuthModule,
    UploadModule,
    TimerModule,
    PetModule,
  ],
  controllers: [AppController],
  // 注册为全局守卫
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: jwtAuthGuard,
    },
    LoggerService,
    TimerService,
  ],
  exports: [LoggerService], // 导出 LoggerService
})
export class AppModule {}
