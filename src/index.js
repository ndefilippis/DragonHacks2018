const express = require('express');
const bodyParser = require('body-parser');
const notify = require('./notify');
const searchForItems = require('./searchForItems');
const getImageFromCamera = require('./opencv').getImageFromCamera;

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/', (res, req) => {
  const phone = req.req.body.phone;
  const list = req.req.body.list;
  console.log(phone, list);
  /*
  LIST MODEL
    {
      "apple": 3,
      "orange": 5,
      "bottle": 2
    }
  */
  var messageToSend = "";
  var links = {};
  // detect and classify items using opencv and return list
  getImageFromCamera(async function(detectionList) {
    console.log(detectionList)
    var missingItems = {};
    for(key in list) {
      if(!detectionList.includes(list[key])) { // less items than needed
        console.log(list[key])
        // search for items on Amazon
        missingItems[list[key]] = list[key];
        let foundItem = await searchForItems.search(list[key]);
        links[list[key]] = foundItem;
      }
    }
    if(!isEmpty(links)) {
      console.log(links)
      messageToSend = "You have less items than you need: \n";
      for(key in missingItems) {
        messageToSend += `${key}\n`;
      }
      messageToSend += "And here is some help from us: \n";
      for(key in links) {
        messageToSend += `${key}: ${links[key]}\n`;
      }
      // notify.send(phone, messageToSend);
    }
  })
})

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

app.listen(3000, () => console.log('App listening on port 3000'))
