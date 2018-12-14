import { ITextAnalyzer } from "./types";
import { calcReadTime } from "./readTime";

const h2p = require('html2plaintext');

const getPlainText = (html: string): string => {
  return h2p(html).replace(/\s\s+/g, ' ');
}

const getReadTime = (html: string): number => {
  const plainText = getPlainText(html);
  return calcReadTime(plainText);
}

export const textAnalyzer: ITextAnalyzer = {
  getPlainText,
  getReadTime
};
