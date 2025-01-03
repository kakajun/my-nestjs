import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter'
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { LoggerService } from './module/monitor/logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 注册swagger
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台学习NestJs接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'NestJs接口文档', // 出现在页面浏览器标签上显示的标题
  })

  // 注册全局管道
  app.useGlobalPipes(new ValidationPipe())

  // 支持静态资源
  app.useStaticAssets('public', { prefix: '/static' })

  // 注册全局 logger 拦截器
  const loggerService = app.get(LoggerService)

  // 自定义的拦截器, 用于在请求到达控制器之前
  app.useGlobalInterceptors(new TransformInterceptor(loggerService))

  // 注册全局错误的过滤器,包括日志记录
  app.useGlobalFilters(new HttpExceptionFilter(loggerService))

  await app.listen(3000)

  // 打印端口
  console.log(`http://localhost:3000/docs`)
}
bootstrap()
