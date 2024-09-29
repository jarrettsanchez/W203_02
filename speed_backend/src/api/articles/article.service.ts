  // handle business logic (CRUD operations)
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.schema';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  // route testing
  test(): string {
    return 'Artlice route testing...';
  }

  // return list of all articles
  async findAll():Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  // returns single article
  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  // creates new article
  async create(createArticleDto: CreateArticleDto) {
    return await this.articleModel.create(createArticleDto);
  }

  // updates article
  async update(id:string, createArticleDto: CreateArticleDto) {
    return await this.articleModel.findByIdAndUpdate(id, createArticleDto).exec();
  }

  // deletes article
  async delete(id: string) {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
    return deletedArticle;
  }
}