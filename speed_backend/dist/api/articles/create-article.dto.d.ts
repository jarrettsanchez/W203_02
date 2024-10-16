import { Date } from 'mongoose';
export declare class CreateArticleDto {
    title: string;
    author: string;
    journal_name: string;
    publication_year: string;
    volume: string;
    pages: string;
    doi: string;
    se_relevancy: boolean;
    se_category: string;
    peer_reviewed: boolean;
    moderation_flag: boolean;
    claims: string;
    evidence: string;
    evidence_result: boolean;
    participant: string;
    research_type: string;
    analysis_flag: boolean;
    rejection_reason: string;
    status: string;
    updated_date: Date;
}
