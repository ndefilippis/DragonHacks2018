const cv = require('opencv')
const promisify = require('util').promisify
const clarifai = require('./clarifaiApi')

async function getImageFromCamera (imageURL) {
  try {
    var camera = new cv.VideoCapture(0)
    let p = new Promise((resolve, reject) => {
      camera.read(function(err, im) {
        if (err) {
          reject(err)
        } else {
          resolve(im)
        }
      })
    })

    let im = await p

    console.log(im.size())
    if (im.size()[0] > 0 && im.size()[1] > 0) {
      await im.save(imageURL)
      let list = await clarifai.getLabels(imageURL)
      camera.release()
      return list
    }
  } catch (e) {
    console.log("Couldn't start camera:", e)
    camera.release()
  }
}

module.exports = {getImageFromCamera}
