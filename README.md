# Text processing package

## Intro

It basically accepts any html text, but can also be markdown text and analyses the dimensions:
1. readTime - number of minutes it is required to read this text
2. keywords - phrases of 1, 2, 3 words that repeat themselves in the text.
3. vulgarityIndex - you need to scan for vulgar words in english and calculate an index for a story if it is vulgar or not.
4. nudityIndex - images need to be analysed if they contain adult content
5. images: need to be parsed from the text into a separate array (ordered by occurance in the text!)
6. language -> recognise language of the text. It needs to work great for english, japanese spanish and german.
7. plain - plain version of a text without html tags and images that could be for example sent out in an email
8. textImageRatio
9. compressed version of the plain text.

## Inputs

Any HTML text

## Outputs

```asciidoc
{
 readTime: number,
 keywords: {
   1: string[]
   2: string[]
   3: string[]
 }

compressed: string
  nudityIndex: number (0:1)
  vulgarityIndex: number (0:1)
  images: [{ url: string }],
  language: "en" | "de" etc
  textImageRatio: number
  plain: string
}
```


## Interface

```asciidoc
interface TextAnalyzer {
  getReadTime: () => Text
  getPlainText: () => Text
  extractImages: () => Images
  analyzeLang: () => Lang
  extractKeywords: (noOfWordsInKeyword) => Keywords  
  analyze: () => TextAnalysis // get complete analysis
}
```

## Install
```
npm install
```

## Build proccess
This script will build the component:
```
npm run build
```

## Running
This script will build and run the application.
```
npm run start
```

## Developers
* [Alphateam Hackers GmbH](https://alphateamhackers.com)

* [Adrian Barwicki](https://adrianbarwicki.com)


## Licence
MIT
