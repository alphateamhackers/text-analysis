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

const vulgarityIndexInternal = (plainText: string): number => {
  return badWordsFilter.isProfane(plainText) ? 1 : 0; // can be extended to range 0..1 if needed
}

const vulgarityIndex = (html: string): number => {
  const plainText = getPlainText(html);
  return vulgarityIndexInternal(plainText);
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

const textImageRatioInternal = (txt: string, images: string[]): number => {
  const weHaveImages: boolean = images.length > 0,
    weHaveText: boolean = txt.length > 0;

  let result: number;
  if (weHaveImages && weHaveText) {
    // if we have both text and images - we calculate the reatio
    result = Math.round((txt.length / images.length) * 100) / 100;
  } else {
    result = (!weHaveText && !weHaveImages) ? 0 : // neither text nor imgs
      (weHaveImages) ? 0 : 1; // only imgs - 0, only txt - 1
  }
  return result;
}

const textImageRatio = (html: string): number => {
  const plainText: string = getPlainText(html),
    images: string[] = extractImages(html);

  return textImageRatioInternal(plainText, images);
}

const getPlainTextCompressedInternal = (plainText: string): string => {
  return pako.deflate(plainText, { to: 'string' });
}

const getPlainTextCompressed = (html: string): string => {
  const plainText = getPlainText(html);
  return getPlainTextCompressedInternal(plainText);
}

const analyze = (html: string): ITextAnalysis => {
  const plainText = getPlainText(html),
    images = extractImages(html);

  const res: ITextAnalysis = {
    plainText: plainText,
    readTime: calcReadTime(plainText),
    keywords: getKeyWords(plainText),
    lang: franc(plainText),
    vulgarityIndex: vulgarityIndexInternal(plainText),
    images: extractImages(html),
    textImageRatio: textImageRatioInternal(plainText, images),
    plainTextCompressed: getPlainTextCompressedInternal(plainText)
  }

  return res;
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
