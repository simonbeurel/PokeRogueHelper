document.addEventListener('DOMContentLoaded', function() {

    var captureButton = document.getElementById('captureButton');
    captureButton.addEventListener('click', function() {
        chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
            var image = new Image();
            image.onload = function() {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = image.width / 2; // La moitié de la largeur de l'image
                canvas.height = image.height / 2; // La moitié de la hauteur de l'image
                context.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                var croppedDataUrl = canvas.toDataURL('image/png');
                var croppedImage = document.createElement('img');
                croppedImage.src = croppedDataUrl;
                document.body.appendChild(croppedImage);
            };
            image.src = dataUrl;
        });
    });

});
