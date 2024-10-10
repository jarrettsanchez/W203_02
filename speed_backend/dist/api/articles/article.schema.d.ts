import { HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
export declare class Article {
    title: string;
    author: string;
    journal_name: string;
    publication_year: number;
    volume: number;
    pages: number;
    doi: string;
    status: string;
    updated_date: Date;
    moderation_flag: boolean;
    analysis_flag: boolean;
    claims: string;
    evidence: string;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, import("mongoose").Document<unknown, any, Article> & Article & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
}>;
