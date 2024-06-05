const Tesseract = require('tesseract.js');

Tesseract.recognize(
    './image2.png',
    'fra'
).then(({ data: { text } }) => {
    console.log(text);
}).catch(error => {
    console.error(error);
});
