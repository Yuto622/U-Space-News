export enum NewsCategory {
  ALL = 'ALL',
  ROCKETS = 'ROCKETS',
  ASTRONOMY = 'ASTRONOMY',
  TECH = 'TECH',
  FUTURE = 'FUTURE'
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: NewsCategory;
  readTime: string;
  impactScore: number;
  sourceUrl?: string; // Link to the real news source
}

export interface FetchNewsResponse {
  articles: NewsArticle[];
}