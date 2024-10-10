export type Article = {
    _id?: string;
    title?: string;
    author?: string;
    journal_name?: string;
    publication_year?: string;
    volume?: string;
    pages?: string;
    doi?: string;
    status?: string;
    updated_date?: Date;
    moderation_flag?: boolean;
    analysis_flag?: boolean;
    claims?: string;
    evidence?: string;
}

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    author: '',
    journal_name: '',
    publication_year: '',
    volume: '',
    pages: '',
    doi: '',
    status: 'Pending',
    updated_date: undefined,
    moderation_flag: false,
    analysis_flag: false,
    claims: '',
    evidence: '',
}