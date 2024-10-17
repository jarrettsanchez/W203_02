type Article = {
    id: string;
    title: string;
    claim: string;
    evidence: string;
    status: 'agree' | 'disagree' | 'none';
  };
  
  type Filters = {
    status: string;
    articleNameOrder: 'asc' | 'desc';
    claimType: 'all' | 'written' | 'unwritten';
    evidenceType: 'all' | 'written' | 'no-evidence';
  };
  
  export const filterArticles = (articles: Article[], filters: Filters): Article[] => {
    // Apply filters
    const filteredArticles = articles
      .filter(article => {
        if (filters.status && article.status !== filters.status) return false;
        if (filters.claimType === 'written' && !article.claim) return false;
        if (filters.claimType === 'unwritten' && article.claim) return false;
        if (filters.evidenceType === 'written' && !article.evidence) return false;
        if (filters.evidenceType === 'no-evidence' && article.evidence) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.articleNameOrder === 'asc') return a.title.localeCompare(b.title);
        return b.title.localeCompare(a.title);
      });
  
    return filteredArticles;
  };
  