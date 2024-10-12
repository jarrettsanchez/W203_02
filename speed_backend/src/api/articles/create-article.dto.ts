// DTO file to handle data transfer between frontend and backend
import { Date } from 'mongoose';

export class CreateArticleDto {
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
    analysis_flag: boolean;

    status: string;
    updated_date: Date;
}