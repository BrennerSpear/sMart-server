const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = function(to, message) {
  return new Promise(function(resolve, reject) {
    client.messages.create({
      body: message,
      to: to,
      from: process.env.TWILIO_NUMBER
      // mediaUrl: 'http://www.yourserver.com/someimage.png'
    }, function(err, data) {
      if(err !== null) reject(err);
      resolve(data)
    })
  })
}

const updateSeller = function(transaction) {
  var t = transaction.serialize()
  return sendSms(
    t.seller.phone_number, 
    `S-Mart Alert for ${t.seller.username}: Your recently sold product, ${t.product.title}, is ${t.status.split('_').join(' ')}.\nETA:`
  )
}

const updateBuyer = function(transaction) {
  var t = transaction.serialize()
  return sendSms(
    t.buyer.phone_number, 
    `S-Mart Alert for ${t.buyer.username}: Your recently purchased product, ${t.product.title}, is ${t.status.split('_').join(' ')}.\nETA:`
  )
}

module.exports = {
  sendSms: sendSms,
  updateSeller: updateSeller,
  updateBuyer: updateBuyer
}