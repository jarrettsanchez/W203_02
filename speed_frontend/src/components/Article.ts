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
    se_category?: string;
    peer_reviewed?: boolean;
    moderation_flag?: boolean;

    claims?: string;
    evidence?: string;
    evidence_result?: boolean;
    participant?: string;
    research_type?: string;
    analysis_flag?: boolean;

    rejection_reason?: string;
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
    se_category: '',
    peer_reviewed: undefined,
    moderation_flag: false,

    claims: '',
    evidence: '',
    evidence_result: undefined,
    participant: '',
    research_type: '',
    analysis_flag: false,

    rejection_reason: '',
    status: 'Pending',
    updated_date: undefined,
}