import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostsEntity } from './entities/posts.entity'
import { LoggerService } from '@/module/monitor/logger/logger.service'

export interface PostsRo {
  list: PostsEntity[]
  count: number
}
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    private readonly logger: LoggerService,
  ) {}

  // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post
    if (!title) {
      throw new HttpException('缺少文章标题', 401)
    }
    const doc = await this.postsRepository.findOne({ where: { title } })
    if (doc) {
      throw new HttpException('文章已存在', 401)
    }
    return await this.postsRepository.save(post)
  }

  // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    const qb = this.postsRepository.createQueryBuilder('post')
    qb.orderBy('post.create_time', 'DESC')
    const count = await qb.getCount()
    const { pageNum = 1, pageSize = 10, ...params } = query
    // this.logger.log('Parsed query params:', { pageNum, pageSize, params })

    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))
    const posts = await qb.getMany()
    // this.logger.log('Posts retrieved:', posts)
    return { list: posts, count: count }
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOne({ where: { id } })
  }

  // 更新文章
  async updateById(id, post): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne({ where: { id } })
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401)
    }
    const updatePost = this.postsRepository.merge(existPost, post)
    return this.postsRepository.save(updatePost)
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOne({ where: { id } })
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401)
    }
    return await this.postsRepository.remove(existPost)
  }
}
