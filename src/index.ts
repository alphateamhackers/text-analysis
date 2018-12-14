import { ITextAnalyzer } from "./types";
const h2p = require('html2plaintext');

export const textAnalyzer: ITextAnalyzer = {
  getPlainText: (html: string): string => {
    return h2p(html).replace(/\s\s+/g, ' ');
  },

  getReadTime: (html: string): string => {
    return '';//extractor.lazy(html).text();
  }
};
