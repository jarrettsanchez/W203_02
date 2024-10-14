import { HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
export declare class Article {
    title: string;
    author: string;
    journal_name: string;
    publication_year: string;
    volume: string;
    pages: string;
    doi: string;
    se_relevancy: boolean;
    peer_reviewed: boolean;
    moderation_flag: boolean;
    claims: boolean;
    evidence: string;
    evidence_result: boolean;
    participant: string;
    research_type: string;
    analysis_flag: boolean;
    rejection_reason: string;
    status: string;
    updated_date: Date;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, import("mongoose").Document<unknown, any, Article> & Article & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
}>;
