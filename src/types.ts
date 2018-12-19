
export interface ITextAnalyzer {
  getReadTime: (html: string) => number;
  getPlainText: (html: string) => string;
  extractKeywords: (html: string, noOfWordsInKeyword: number) => any;
  analyzeLang: (html: string) => string;
  vulgarityIndex: (html: string) => number;
  extractImages: (html: string) => string[];
  textImageRatio: (html: string) => number;
  // analyze: () => TextAnalysis;
}
