var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: "AKIAJKHZW54TRB6MXWYA",
  awsSecret: "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",
  awsTag: "dragonhack201-20"
});

async function search(item) {
  let results = await client.itemSearch({
    keywords: item,
    searchIndex: 'Grocery'
  })
  var list = [];
  results.map(function(item) {
    list.push(item.DetailPageURL[0]);
  });
  return list.slice(0, 3);
}

module.exports = { search };
