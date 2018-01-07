const cv = require('opencv')

function getImageFromCamera () {
  try {
    var camera = new cv.VideoCapture(0)
    camera.read(function (err, im) {
      if (err) throw err
      console.log(im.size())
      if (im.size()[0] > 0 && im.size()[1] > 0) {
        im.save('./out.jpg')
        camera.release()
      }
    })
  } catch (e) {
    console.log("Couldn't start camera:", e)
    camera.release()
  }
}

getImageFromCamera()

module.exports = {getImageFromCamera}
