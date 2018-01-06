var twilio = require('twilio');

const accountSid = "AC59f4417938a90345be7e32146f84c692";
const authToken = "77dad2d2f369d42766ee5cdd95b2951e";
const sender = "+13123218099";
const receiver = "+17178369533";

var client = new twilio(accountSid, authToken);

client.messages.create({
    to: receiver,
    from: sender,
    body:'hello isiah!'
}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});
