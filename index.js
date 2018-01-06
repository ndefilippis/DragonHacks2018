const express = require('express')

let app = express()

app.get('/', (res, req) => {
  req.send('DragonHacks2018 App goes here.')
})

app.listen(3000, () => console.log('App listening on port 3000'))
