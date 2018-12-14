import { ITextAnalyzer } from "./types";
import { calcReadTime } from "./readTime";
import { getKeyWords } from "./keywords";


const h2p = require('html2plaintext');

const getPlainText = (html: string): string => {
  return h2p(html).replace(/\s\s+/g, ' ');
}

const getReadTime = (html: string): number => {
  const plainText = getPlainText(html);
  return calcReadTime(plainText);
}

const extractKeywords = (html: string, noOfWordsInKeyword: number) => {
  const plainText = getPlainText(html);
  return getKeyWords(plainText);
}

export const textAnalyzer: ITextAnalyzer = {
  getPlainText,
  getReadTime,
  extractKeywords
};
