
export interface IKeywordCount {
  word: string;
  count: number;
}

export interface ITextAnalysis {
  readTime: number;
  plainText: string;
  keywords: IKeywordCount[];
  lang: string;
  vulgarityIndex: number;
  images: string[];
  textImageRatio: number;
  plainTextCompressed: string;
}

export interface ITextAnalyzer {
  getReadTime: (html: string) => number;
  getPlainText: (html: string) => string;
  extractKeywords: (html: string, noOfWordsInKeyword: number) => any;
  analyzeLang: (html: string) => string;
  vulgarityIndex: (html: string) => number;
  extractImages: (html: string) => string[];
  textImageRatio: (html: string) => number;
  getPlainTextCompressed: (html: string) => string;
  analyze: (html: string) => ITextAnalysis;
}
