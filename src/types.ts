
export interface ITextAnalyzer {
  getReadTime: (html: string) => string;
  getPlainText: (html: string) => string;
  // extractImages: () => Images;
  // analyzeLang: () => Lang;
  // extractKeywords: (noOfWordsInKeyword) => Keywords;
  // analyze: () => TextAnalysis;
}
