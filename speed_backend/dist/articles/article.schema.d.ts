import { Document } from 'mongoose';
export declare class Article extends Document {
    name: string;
    author: string;
    year: number;
    volume: number;
    doi: string;
    status: string;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, Document<unknown, any, Article> & Article & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & Required<{
    _id: unknown;
}>>;
