import { ITextAnalyzer } from "./types";
import { calcReadTime } from "./readTime";
import { getKeyWords } from "./keywords";


const h2p = require('html2plaintext');
const franc = require('franc-min')

const getPlainText = (html: string): string => {
  return h2p(html).replace(/\s\s+/g, ' ');
}

const getReadTime = (html: string): number => {
  const plainText = getPlainText(html);
  return calcReadTime(plainText);
}

const extractKeywords = (html: string, noOfWordsInKeyword: number): any => {
  const plainText = getPlainText(html);
  return getKeyWords(plainText);
}

const analyzeLang = (html: string): string => {
  const plainText = getPlainText(html);
  return franc(plainText);
}

export const textAnalyzer: ITextAnalyzer = {
  getPlainText,
  getReadTime,
  extractKeywords,
  analyzeLang
};
