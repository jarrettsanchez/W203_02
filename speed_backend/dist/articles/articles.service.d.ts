import { Model } from 'mongoose';
import { Article } from './article.schema';
export declare class ArticlesService {
    private articleModel;
    constructor(articleModel: Model<Article>);
    findAll(): Promise<Article[]>;
}
