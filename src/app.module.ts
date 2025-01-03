import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './module/posts/posts.module'
import envConfig from '../config/env'
import { PostsEntity } from './module/posts/entities/posts.entity'
import { AuthModule } from './module/system/auth/auth.module'
import { AuthEntity } from './module/system/auth/entities/auth.entity'
import { APP_GUARD } from '@nestjs/core'
import { jwtAuthGuard } from './module/system/auth/jwt-auth.grard'
import { RedisModule } from './module/redis/redis.module'
import { UploadModule } from './module/upload/upload.module'
import { LoggerService } from './module/monitor/logger/logger.service'
import { TimerService } from './timer/timer.service'
import { TimerModule } from './timer/timer.module'
import { PetModule } from './module/pet/pet.module'
import { PetEntity } from './module/pet/entities/pet.entity'

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

    // redis
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            closeClient: true,
            readyLog: true,
            errorLog: true,
            config: {
              host: config.get('REDIS_HOST'),
              password: config.get('REDIS_PASSWORD'),
              port: config.get('REDIS_PORT'),
              db: config.get('REDIS_DB'),
              keyPrefix: config.get('REDIS_KEY_PREFIX'),
            },
          }
        },
      },
      true,
    ),

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
