var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: "AKIAJKHZW54TRB6MXWYA",
  awsSecret: "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",
  awsTag: "dragonhack201-20"
});

function search(item) {
  client.itemSearch({
    keywords: 'banana',
    searchIndex: 'Grocery'
  }, function(err, results, response) {
    if (err) {
      console.log(err);
    } else {
      var list = [];
      results.map(function(item) {
        list.push(item.DetailPageURL[0]);
      });
      return list.slice(0, 3);
    }
  });
}

module.exports = { search };
