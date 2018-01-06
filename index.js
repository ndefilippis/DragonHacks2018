const express = require('express')
const parseImage = require('parseImage')

let app = express()

app.get('/', (res, req) => {
  res.send('DragonHacks2018 App goes here.')
})

app.post('/groceries', (res, req) => {
  let list = parseImage.parseImage(req.image)
  console.log(list)
})

app.listen(3000, () => console.log('App listening on port 3000'))
