const txtAnalyzerModule = require('../dist');

let tstData = {
  "simple test": "<p>simple test</p>",
  "This is a link": "<a href='www.google.com'>This is a link</a>",
  "Click me": "<button>Click me</button>",
  "This is a heading": "<h1 style='color:blue;'>This is a heading</h1>",
  "img test": '<img src="wrongname.gif" alt="Flowers in Chania"><p>img test</p>'
};

const txtAnalyzer = txtAnalyzerModule.textAnalyzer;

describe('text analyzer', function() {

  it('plain text should be extracted correctly', (done) => {

    for (const key in tstData) {
      const plainText = txtAnalyzer.getPlainText(tstData[key]);
      expect(plainText).toBe(key);
    }

    done();
  });

  it('reading time should be calculated correctly', (done) => {

    let time;
    time = txtAnalyzer.getReadTime(tstData["simple test"]);
    expect(time).toBe(1);

    let longStr = "";
    for (let i = 1; i < 200; i++) {
      longStr += tstData["simple test"];
    }

    time = txtAnalyzer.getReadTime(longStr);
    expect(time).toBe(2);

    const evenLongerStr = longStr + longStr;

    time = txtAnalyzer.getReadTime(evenLongerStr);
    expect(time).toBe(4);

    done();
  });

  it('n-gramms extracted correctly', (done) => {
    const text = "a b c d, a b c d, a b c d e.A quick brown fox jumps over the lazy old bartender who said 'Hi!' as a response to the visitor who presumably assaulted the maid's brother, because he didn't pay his debts in time. In time in time does really mean in time. Too late is too early? Nonsense! 'Too late is too early' does not make any sense.";

    const keyWords = txtAnalyzer.extractKeywords(text);
    expect(keyWords[0][0].word).toBe('a');
    expect(keyWords[0][0].count).toBe(5);

    expect(keyWords[3][0].word).toBe('a b c d');
    expect(keyWords[3][0].count).toBe(3);

    done();
  });

  it('recognise a language of the text', (done) => {
    const textEn = "A quick brown fox jumps over the lazy old bartender.",
      textDe = "Node.js ist eine serverseitige Plattform in der Softwareentwicklung zum Betrieb von Netzwerkanwendungen.",
      textFr = "Node.js est une plateforme logicielle libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge.",
      textNl = "Node.js is een softwareplatform waarop men applicaties kan ontwikkelen en draaien.";

    let textLang = txtAnalyzer.analyzeLang(textEn);
    expect(textLang).toBe('eng');

    textLang = txtAnalyzer.analyzeLang(textDe);
    expect(textLang).toBe('deu');

    textLang = txtAnalyzer.analyzeLang(textFr);
    expect(textLang).toBe('fra');

    textLang = txtAnalyzer.analyzeLang(textNl);
    expect(textLang).toBe('nld');

    done();
  });


  it('should calculate vulgarityIndex correctly', (done) => {
    const textGood = "A quick brown fox jumps over the lazy old bartender.",
      textBad = "ash0le";

    let vulgarityIndex = txtAnalyzer.vulgarityIndex(textGood);
    expect(vulgarityIndex).toBe(0);

    vulgarityIndex = txtAnalyzer.vulgarityIndex(textBad);
    expect(vulgarityIndex).toBe(1);

    done();
  });

  it('should extract images correctly', (done) => {
    const imgHtml = `<img src='smiley1.gif' alt='Smiley face' height='42' width='42'>
    <img src='smiley2.gif' alt='Smiley face' height='42' width='42'>
    <img src='smiley3.gif' alt='Smiley face' height='42' width='42'>`;

    let images = txtAnalyzer.extractImages(imgHtml);
    expect(images.length).toBe(3);
    expect(images[0]).toBe('smiley1.gif');

    const imgHtmlReverse = `<img src='smiley3.gif' alt='Smiley face' height='42' width='42'>
    <img src='smiley2.gif' alt='Smiley face' height='42' width='42'>
    <img src='smiley1.gif' alt='Smiley face' height='42' width='42'>`;

    images = txtAnalyzer.extractImages(imgHtmlReverse);
    expect(images.length).toBe(3);
    expect(images[0]).toBe('smiley3.gif');

    done();
  });

})