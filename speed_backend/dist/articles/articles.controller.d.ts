import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(): Promise<import("./article.schema").Article[]>;
}
