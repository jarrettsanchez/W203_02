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
    status: string;
    submitted_date: Date;
    updated_date: Date;
}