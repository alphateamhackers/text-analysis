
export interface ITextAnalyzer {
  getReadTime: (html: string) => number;
  getPlainText: (html: string) => string;
  extractKeywords: (html: string, noOfWordsInKeyword: number) => any;
  // extractImages: () => Images;
  // analyzeLang: () => Lang;
  // analyze: () => TextAnalysis;
}
