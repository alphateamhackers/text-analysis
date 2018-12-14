const txtAnalyzerModule = require('../dist');

let tstData = {
  "simple test": "<p>simple test</p>",
  "This is a link": "<a href='www.google.com'>This is a link</a>",
  "Click me": "<button>Click me</button>",
  "This is a heading": "<h1 style='color:blue;'>This is a heading</h1>",
  "img test": '<img src="wrongname.gif" alt="Flowers in Chania"><p>img test</p>'
};

describe('text analyzer', function() {
  it('plain text should be extracted correctly', (done) => {
    const txtAnalyzer = txtAnalyzerModule.textAnalyzer;

    for (const key in tstData) {
      const plainText = txtAnalyzer.getPlainText(tstData[key]);
      expect(plainText).toBe(key);
    }

    done();
  });
})