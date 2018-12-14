const ansiWordBound = (c: string): boolean => {
  return (
    (' ' == c) ||
    ('\n' == c) ||
    ('\r' == c) ||
    ('\t' == c)
  )
}

export const calcReadTime = (text: string, options?: any): number => {
  let words: number = 0,
    start: number = 0,
    end: number = text.length - 1;

  options = options || {}

  // use default values if necessary
  options.wordsPerMinute = options.wordsPerMinute || 200

  // use provided function if available
  const wordBound = options.wordBound || ansiWordBound

  // fetch bounds
  while (wordBound(text[start])) start++
  while (wordBound(text[end])) end--

  // calculate the number of words
  for (let i = start; i <= end;) {
    for (; i <= end && !wordBound(text[i]); i++);
    words++
    for (; i <= end && wordBound(text[i]); i++);
  }

  // reading time stats
  const minutes: number = words / options.wordsPerMinute
  return Math.ceil(minutes);
}
