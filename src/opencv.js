const cv = require('opencv')

function getImageFromCamera () {
  try {
    var camera = new cv.VideoCapture(0)
    camera.read(function (err, im) {
      if (err) throw err
      console.log(im.size())
      if (im.size()[0] > 0 && im.size()[1] > 0) {
        im.save('./water2.jpg')
        camera.release()
      }
    })
  } catch (e) {
    console.log("Couldn't start camera:", e)
    camera.release()
  }
}

function identifyObjects (img) {
  cv.readImage(img, function (err, im) {
    if (err) {
      console.log(err)
    }
    im.detectObject('./res/banana_classifier.xml', {}, function (err, bananas) {
      if (err) {
        console.log(err)
      }
      for (var i = 0; i < bananas.length; i++) {
        var x = bananas[i]
        console.log(x)
        im.rectangle([x.x, x.y], [x.width, x.height])
      }
      im.save('./out.jpg')
      console.log(bananas.length)
    })
  })
}

getImageFromCamera()

module.exports = {identifyObjects, getImageFromCamera}
