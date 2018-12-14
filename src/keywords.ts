// https://stackoverflow.com/questions/7085454/extract-keyphrases-from-text-1-4-word-ngrams

const sortAscendingF = (x: any, y: any) => {
  return y.count - x.count;
};

/***
* plainText - text to extract key words
* atLeast - show results with at least .. occurrences
* takeTopN - top N most frequent words
* wordsAmount - nGramms size (e.g. 3 - "word1 word2 word3")
* ignoreCase - case-sensitivity
* regExAllowedChars - pattern to select valid characters, invalid characters are replaced with a whitespace
*/
export const getKeyWords = (
  plainText: string,
  atLeast: number = 2,
  takeTopN: number = 10,
  wordsAmount: number = 5,
  ignoreCase = true,
  regExAllowedChars = /[^a-zA-Z'\-]+/g
) => {

  const numWords = wordsAmount + 1; // show statistics for one to .. words, we start counting at 1 instead of 0

  let textlen = 1, len, s,
    keys: any[] = [null], // "keys[0] = null", a word boundary with length zero is empty
    results = [];

  for (let i = 1; i <= numWords; i++) {
    keys.push({});
  }

  plainText = plainText.replace(regExAllowedChars, " ") // remove all irrelevant characters
    .replace(/^\s+/, "").replace(/\s+$/, "");

  // Create a hash
  if (ignoreCase)
    plainText = plainText.toLowerCase();

  let text = plainText.split(/\s+/);
  for (let i = 0, textlen = text.length; i < textlen; i++) {
    s = text[i];
    keys[1][s] = (keys[1][s] || 0) + 1;

    for (let j = 2; j <= numWords; j++) {
      if (i + j <= textlen) {
        s += " " + text[i + j - 1];
        keys[j][s] = (keys[j][s] || 0) + 1;
      } else break;
    }

  }

  // Prepares results for advanced analysis
  for (let k = 1; k <= numWords; k++) {
    results[k] = [];
    const key = keys[k];

    for (let i in key) {
      if (key[i] >= atLeast) results[k].push({ "word": i, "count": key[i] });
    }
  }

  // Result parsing
  let words: any[] = [];
  for (let k = 1; k < numWords; k++) {
    results[k].sort(sortAscendingF); // sorts results
    words.push(results[k].splice(0, takeTopN)); // taking top N words
  }

  return words;
}
