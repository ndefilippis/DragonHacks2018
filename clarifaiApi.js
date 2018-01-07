
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f33b46c018174448b1ce7b3c0126992d'
});

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3.jpg').then(
    function(response) {
	console.log(JSON.stringify(response));
    },
    function(err) {
	console.error(err);
    }
);
