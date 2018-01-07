const Clarifai = require('clarifai');
const promisify = require('util').promisify
const fs = require('fs')

const app = new Clarifai.App({
  apiKey: 'f33b46c018174448b1ce7b3c0126992d'
})

const FOOD_MODEL = 'bd367be194cf45149e75f01d59f77ba7'

function filterList (list, neededConfidence) {
  return list.filter(item => item.value > neededConfidence).map(item => item.name)
}

async function getLabels (imageURL, callback) {
  // predict the contents of an image by passing in a url
  let asyncReadFile = promisify(fs.readFile)
  let original_data = await asyncReadFile(imageURL)
  var base64Data = original_data.toString('base64')
  let response = await app.models.predict(FOOD_MODEL, base64Data)
  return filterList(response.outputs[0].data.concepts, 0.5)
}

module.exports = {getLabels}
