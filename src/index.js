const express = require('express');
const bodyParser = require('body-parser');
const notify = require('./notify');
const searchForItems = require('./searchForItems');

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
  const time = 5000;
  var messageToSend = "";
  var links = [];
  setInterval(function() {
    // detect and classify items using opencv and return list
    var detectionList = {};
    var missingItems = {};
    for(key in list) {
      if(detectionList.hasOwnProperty(key) && detectionList[key] < list[key]) { // less items than needed
        // search for items on Amazon
        missingItems[key] = detectionList[key];
        let foundItem = searchForItems.search(key);
        links.push({
          key: foundItem
        });
      }
    }
    if(listToSend.length !== 0) {
      messageToSend = "You have less items than you need: \n";
      for(key in missingItems) {
        messageToSend += `${key}: ${missingItems[key]}\n`;
      }
      messageToSend += "And here is some help from us: \n";
      for(key in links) {
        messageToSend += `${key}: ${links[key]}`;
      }
      notify.send(phone, messageToSend);
    }
  }, time);
})

app.listen(3000, () => console.log('App listening on port 3000'))
