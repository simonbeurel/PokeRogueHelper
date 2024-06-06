function retrieve_sorted_resistances(data) {
    let arrayPokemonResistances = {};
    data.resistances.forEach(resistance => {
        arrayPokemonResistances[resistance.name] = resistance.multiplier;
    });
    //sort the resistances
    var keys = Object.keys(arrayPokemonResistances);
    keys.sort(function (a, b) {
        return arrayPokemonResistances[a] - arrayPokemonResistances[b];
    });
    var sortedResistances = {};
    keys.forEach(function (key) {
        sortedResistances[key] = arrayPokemonResistances[key];
    });
    return sortedResistances;
}

document.addEventListener('DOMContentLoaded', function() {

    var captureButton = document.getElementById('captureButton');
    captureButton.addEventListener('click', function() {
        chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
            var image = new Image();
            image.onload = function() {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = image.width / 2; // Half of the image width
                canvas.height = image.height / 2; // Half of the image height
                context.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                var croppedDataUrl = canvas.toDataURL('image/png');
                var croppedImage = document.createElement('img');
                croppedImage.src = croppedDataUrl;
                document.body.appendChild(croppedImage);
            };
            image.src = dataUrl;
        });
    });

    var searchPokemon = document.getElementById('searchPokemon');
    searchPokemon.addEventListener('click', function() {
        var input = document.getElementById('pokemonInput');
        var pokemonName = input.value.toLowerCase(); // Convert to lowercase
        var url = 'https://tyradex.vercel.app/api/v1/pokemon/' + pokemonName;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
                return response.json();
            })
            .then(data => {
                var sortedResistances = retrieve_sorted_resistances(data);
                // Display resistances
                var resistances = document.getElementById('result');
                resistances.innerHTML = '';
                for (var key in sortedResistances) {
                    var resistance = document.createElement('li');
                    resistance.textContent = key + ': ' + sortedResistances[key];
                    resistances.appendChild(resistance);
                }
            })
            .catch(error => {
                alert(error.message); // Display error message
            });
    });

});
