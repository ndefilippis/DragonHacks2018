const cv = require('opencv')

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

identifyObjects('./res/face-and-banana.jpg')

module.exports = {identifyObjects}
