
export interface ITextAnalyzer {
  getReadTime: (html: string) => number;
  getPlainText: (html: string) => string;
  extractKeywords: (html: string, noOfWordsInKeyword: number) => any;
  analyzeLang: (html: string) => string;
  vulgarityIndex: (html: string) => number;
  // extractImages: () => Images;
  // analyzeLang: () => Lang;
  // analyze: () => TextAnalysis;
}
