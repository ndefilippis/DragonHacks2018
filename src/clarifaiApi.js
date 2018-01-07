const Clarifai = require('clarifai');
const fs = require('fs')

const app = new Clarifai.App({
  apiKey: 'f33b46c018174448b1ce7b3c0126992d'
})

const FOOD_MODEL = 'bd367be194cf45149e75f01d59f77ba7'

function filterList (list, neededConfidence) {
  console.log(list)
  return list.filter(item => item.value > neededConfidence).map(item => item.name)
}

function getLabels (imageURL, callback) {
  // predict the contents of an image by passing in a url
  fs.readFile(imageURL, function(err, original_data) {
    if(err){
      console.log(err)
      return null
    }
    else {
      var base64Data = original_data.toString('base64')
      app.models.predict(FOOD_MODEL, base64Data).then(
          function(response) {
            callback(filterList(response.outputs[0].data.concepts, 0.85))
          },
          function(err) {
    	     console.error(err);
         }
       );
    }
  })
}

module.exports = {getLabels}
