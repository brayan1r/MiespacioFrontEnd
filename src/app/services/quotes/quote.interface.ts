export interface Quote {
    _id?: string;
    estimatedBudget: number;
    estimatedTime: '1-3 meses' | '3-6 meses' | '6-12 meses' | 'flexible';
    project_id?: string;
    project_type?: string;
}

export interface QuoteResponse {
    msg: string;
    projectTypes?: Quote | Quote[];
}

export interface QuoteDeleteResponse {
    msg: string;
    projectTypeDeleted?: Quote;
}
