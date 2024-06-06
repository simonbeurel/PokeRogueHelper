const imageUrl = "https://dl.a9t9.com/ocr/solarcell.jpg";
const apiUrl = `https://api.ocr.space/parse/imageurl?apikey=${apiKey}&url=${encodeURIComponent(imageUrl)}`;

//Test an OCR Api (need to provide the api key)
function testApiOcr(){
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Faire quelque chose avec les données retournées
            console.log(data.ParsedResults[0].ParsedText);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite:', error);
        });
}