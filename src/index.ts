import { ITextAnalyzer } from "./types";
const extractor = require("unfluff");

export const GetTextAnalyzer: ITextAnalyzer = {
  getPlainText: (html: string): string => {
    return extractor.lazy(html).text();
  },
  getReadTime: (html: string): string => {
    return extractor.lazy(html).text();
  }
};

console.log(extractor);
