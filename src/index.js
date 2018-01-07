const express = require('express');
const bodyParser = require('body-parser');
const tinyurl = require('tinyurl');
const promisify = require('util').promisify;
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

app.post('/', async function(res, req) {
  const phone = req.req.body.phone;
  const list = req.req.body.list;
  console.log(phone, list);

  var messageToSend = "";
  var links = {};
  // detect and classify items using opencv and return list
  var numPics = 3;
  var picTimeout = 2000;
  var detectedItems = new Set();
  for(let i = 1; i < numPics + 1; i++) {
    let f = function (num) {
      setTimeout(async function() {
        let detectionList = await getImageFromCamera(`./out-${num}.jpg`);
        for (key in detectionList) {
          detectedItems.add(detectionList[key])
        }
        if(num == numPics) {
          console.log(detectedItems)
          var missingItems = {};

          for(key in list) {
            if(!detectedItems.has(list[key])) { // less items than needed
              console.log(list[key])
              // search for items on Amazon
              missingItems[list[key]] = list[key];
              let foundItem = await searchForItems.search(list[key]);
              links[list[key]] = foundItem;
            }
          }

          if(!isEmpty(links)) {
            messageToSend = "You are low on the following items: \n";
            for(key in missingItems) {
              messageToSend += `${key}\n`;
            }
            messageToSend += "And here is some help from us: \n";
            console.log(links)
            for(key in links) {
                for (let i = 0; i < links[key].length; i++){
                  shortened = await shorten(links[key][i]);
                  messageToSend += `${key}: ${shortened}\n`;
                }
            }
            // notify.send(phone, messageToSend);
            console.log(messageToSend);
          }
          else {
            console.log('Fridge is fully stocked')
          }
        }
      }, picTimeout * num)
    }(i)
  }
})

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

async function shorten(url) {
  let p = new Promise((resolve, reject) => {
    tinyurl.shorten(url, function(res) {
      resolve(res)
    })
  })
  let res = await p
  return res
}

app.listen(3000, () => console.log('App listening on port 3000'))
