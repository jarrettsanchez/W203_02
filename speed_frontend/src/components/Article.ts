export type Article = {
    _id?: string;

    title?: string;
    author?: string;
    journal_name?: string;
    publication_year?: string;
    volume?: string;
    pages?: string;
    doi?: string;

    se_relevancy?: boolean;
    peer_reviewed?: boolean;
    moderation_flag?: boolean;

    claims?: boolean;
    evidence?: string;
    evidence_result?: boolean;
    participant?: string;
    research_type?: string;
    analysis_flag?: boolean;

    status?: string;
    updated_date?: Date;
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

    se_relevancy: undefined,
    peer_reviewed: undefined,
    moderation_flag: false,

    claims: undefined,
    evidence: '',
    evidence_result: undefined,
    participant: '',
    research_type: '',
    analysis_flag: false,

    status: 'Pending',
    updated_date: undefined,
}