// DTO file to handle data transfer between frontend and backend
export class CreateArticleDto {
    title: string;
    author: string;
    journal_name: string;
    publication_year: number;
    volume: number;
    pages: number;
    doi: string;
    status: string;
}