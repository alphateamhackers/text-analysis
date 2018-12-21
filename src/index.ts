import { ITextAnalyzer, ITextAnalysis, IKeywordCount } from "./types";
import { calcReadTime } from "./readTime";
import { getKeyWords } from "./keywords";

const h2p = require('html2plaintext'),
  franc = require('franc-min'),
  BadWordsFilter = require('bad-words'),
  cheerio = require('cheerio'),
  pako = require('pako');

const badWordsFilter = new BadWordsFilter();

const getPlainText = (html: string): string => {
  return h2p(html).replace(/\s\s+/g, ' ');
}

const getReadTime = (html: string): number => {
  const plainText = getPlainText(html);
  return calcReadTime(plainText);
}

const extractKeywords = (html: string, noOfWordsInKeyword: number): IKeywordCount[] => {
  const plainText = getPlainText(html);
  return getKeyWords(plainText);
}

const analyzeLang = (html: string): string => {
  const plainText = getPlainText(html);
  return franc(plainText);
}

const vulgarityIndex = (html: string): number => {
  const plainText = getPlainText(html);
  return badWordsFilter.isProfane(plainText) ? 1 : 0; // can be extended to range 0..1 if needed
}

const extractImages = (html: string): string[] => {
  const $ = cheerio.load(html),
    type = {
      selector: 'img',
      attribute: 'src'
    };

  const nodes = $(type.selector);
  return nodes.map(
    (idx: number, el: any) => el.attribs[type.attribute]
  );
}

const textImageRatio = (html: string): number => {
  const plainText: string = getPlainText(html),
    images: string[] = extractImages(html);

  const weHaveImages: boolean = images.length > 0,
    weHaveText: boolean = plainText.length > 0;

  let result: number;
  if (weHaveImages && weHaveText) {
    // if we have both text and images - we calculate the reatio
    result = Math.round((plainText.length / images.length) * 100) / 100;
  } else {
    result = (!weHaveText && !weHaveImages) ? 0 : // neither text nor imgs
      (weHaveImages) ? 0 : 1; // only imgs - 0, only txt - 1
  }
  return result;
}

const getPlainTextCompressed = (html: string): string => {
  const plainText = getPlainText(html);
  return pako.deflate(plainText, { to: 'string' });
}

const analyze = (html: string): ITextAnalysis => {
  let result: ITextAnalysis;

  result.plainText = getPlainText(html);
  result.readTime = calcReadTime(result.plainText);
  result.keywords = getKeyWords(result.plainText);
  result.lang = franc(result.plainText);
  result.vulgarityIndex = badWordsFilter.isProfane(result.plainText) ? 1 : 0;
  result.images = extractImages(html);
  result.textImageRatio = textImageRatio(html);
  result.plainTextCompressed = pako.deflate(result.plainText, { to: 'string' });

  return result;
}

export const textAnalyzer: ITextAnalyzer = {
  getPlainText,
  getPlainTextCompressed,
  getReadTime,
  extractKeywords,
  analyzeLang,
  vulgarityIndex,
  extractImages,
  textImageRatio,
  analyze
};
